'use strict';
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const socket = require('../../sio');

class Player {
  constructor(client, model) {
    this.client = client;
    this.model = model;
  }

  join(guildId, voiceChannel, channel) {
    if (voiceChannel) {
      voiceChannel.join()
        .then(connection => {
          this.model.create(guildId);
          if (channel) channel.send(`Successfully connected to ${connection.channel.name}.`);
        })
        .catch(console.log);
    } else {
      if (channel) channel.status(400).send('You need to join a voice channel first!');
    }
  }

  leave(guildId, channel) {
    if (this.client.voiceConnections.has(guildId)) {
      let connection = this.client.voiceConnections.get(guildId);
      connection.channel.leave();
      this.model.destroy(guildId)
      if (channel) channel.send('Successfully left the channel.');
    } else {
      if (channel) channel.status(400).send("I'm already not in a voice channel!");
    }
  }

  play(guildId, channel) {
    if (this.client.voiceConnections.has(guildId)) {
      let connection = this.client.voiceConnections.get(guildId);

      if (connection.dispatcher) {
        if (connection.dispatcher.paused) {
          connection.dispatcher.resume();
          if (channel) channel.send('Resuming music playback.');
        } else {
          if (channel) channel.status(400).send("I'm already playing!");
        }
      } else {
        const info = this.model.next(guildId);
        this.updateSocket(guildId);

        if (info) {
          const stream = ytdl.downloadFromInfo(info, {filter: 'audioonly'});

          const dispatcher = connection.playStream(stream, streamOptions);
          this.addListener(guildId, connection, dispatcher, channel);
          if (channel) channel.send(`Playing: *${info.title}*`);
        } else {
          if (channel) channel.status(400).send("There's nothing in queue.");
        }
      }
    } else {
      if (channel) channel.status(400).send("I'm not in a voice channel. Use !join to have me join the voice channel you're in.");
    }
  }

  pause(guildId, channel) {
    if (this.client.voiceConnections.has(guildId)) {
      let connection = this.client.voiceConnections.get(guildId);

      if (connection.dispatcher) {
        connection.dispatcher.pause();

        if (channel) channel.send('Paused playing music.');
      } else {
        if (channel) channel.status(400).send("I'm not playing anything right now.");
      }
    } else {
      if (channel) channel.status(400).send("I'm not even in a voice channel!");
    }
  }

  stop(guildId, channel) {
    if (this.client.voiceConnections.has(guildId)) {
      let connection = this.client.voiceConnections.get(guildId);

      if (connection.dispatcher) {
        connection.dispatcher.end('stop');

        this.model.stop(guildId);
        this.updateSocket(guildId);

        if (channel) channel.send('Stopped playing music.');
      } else {
        if (channel) channel.status(400).send("I'm not playing anything right now.");
      }
    } else {
      if (channel) channel.status(400).send("I'm not even in a voice channel!");
    }
  }

  skip(guildId, channel) {
    if (this.client.voiceConnections.has(guildId)) {
      let connection = this.client.voiceConnections.get(guildId);

      if (connection.dispatcher) {
        const info = this.model.next(guildId);
        this.updateSocket(guildId);

        if (info) {
          connection.dispatcher.end('stop');
          const stream = ytdl.downloadFromInfo(info, {filter: 'audioonly'});

          setTimeout(() => {
            const dispatcher = connection.playStream(stream, streamOptions);
            this.addListener(guildId, connection, dispatcher, channel);
            if (channel) channel.send(`Playing: *${info.title}*`);
          }, 500);
        } else {
          if (channel) channel.status(400).send("There's nothing in queue.");
        }
      } else {
        if (channel) channel.status(400).send("I'm not playing anything right now.");
      }
    } else {
      if (channel) channel.status(400).send("I'm not in a voice channel. Use !join to have me join the voice channel you're in.");
    }
  }

  playSong(guildId, link, channel) {
    if (this.client.voiceConnections.has(guildId)) {
      let connection = this.client.voiceConnections.get(guildId);

      const info = ytdl.getInfo(link)
        .then(info => {
          const stream = ytdl.downloadFromInfo(info, {filter: 'audioonly'});
          if (connection.dispatcher) {
            connection.dispatcher.end('stop');
          }

          this.model.play(guildId, info);
          this.updateSocket(guildId);

          setTimeout(() => {
            const dispatcher = connection.playStream(stream, streamOptions);
            this.addListener(guildId, connection, dispatcher, channel);
            if (channel) channel.send(`Playing: *${info.title}*`);
          }, 500);
        })
        .catch(err => {
          console.log(err);
          if (channel) channel.status(400).send("That's not a valid youtube link!");
        });
    } else {
      if (channel) channel.status(400).send("I'm not in a voice channel. Use !join to have me join the voice channel you're in.");
    }
  }

  queueSong(guildId, link, channel) {
    if (this.client.voiceConnections.has(guildId)) {
      let connection = this.client.voiceConnections.get(guildId);

      const info = ytdl.getInfo(link)
        .then(info => {
          this.model.queue(guildId, info);
          this.updateSocket(guildId);

          if (channel) channel.send(`Queued: *${info.title}*`);
        })
        .catch(err => {
          console.log(err);
          if (channel) channel.status(400).send("That's not a valid youtube link!");
        });
    } else {
      if (channel) channel.status(400).send("I'm not in a voice channel. Use !join to have me join the voice channel you're in.");
    }
  }

  moveSong(guildId, songId, position, channel) {
    if (this.client.voiceConnections.has(guildId)) {
      this.model.move(guildId, songId, position);
      this.updateSocket(guildId);

      if (channel) channel.send(`Moved ${songId} to position ${position}`);
    } else {
      if (channel) channel.status(400).send("I'm not in a voice channel. Use !join to have me join the voice channel you're in.");
    }
  }

  deleteSong(guildId, songId, channel) {
    if (this.client.voiceConnections.has(guildId)) {
      this.model.delete(guildId, songId);
      this.updateSocket(guildId);

      if (channel) channel.send(`Deleted ${songId}`);
    } else {
      if (channel) channel.status(400).send("I'm not in a voice channel. Use !join to have me join the voice channel you're in.");
    }
  }

  getNowPlaying(guildId) {
    return this.model.getCurrent(guildId);
  }

  getQueue(guildId) {
    return this.model.getQueue(guildId);
  }

  getGuilds() {
    return this.model.getKeys();
  }

  addListener(guildId, connection, dispatcher, channel) {
    dispatcher.on('end', message => {
      if (message != 'stop') {
        const info = this.model.next(guildId);
        this.updateSocket(guildId);
        if (info) {
          const stream = ytdl.downloadFromInfo(info, {filter: 'audioonly'});
          setTimeout(() => {
            const nextDispatcher = connection.playStream(stream, streamOptions);
            this.addListener(guildId, connection, nextDispatcher, channel);
            if (channel) channel.send(`Playing: *${info.title}*`);
          }, 500);
        }
      }
    });
  }

  updateSocket(guildId) {
    const eName = 'playlist:' + guildId;
    socket.io().to(eName).emit('update');
    console.log('Emitted update event to ' + eName);
  }
}

module.exports = Player;