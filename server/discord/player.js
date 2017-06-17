'use strict';
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };
const socket = require('../../sio');

class Player {
  constructor(client, model) {
    this.client = client;
    this.model = model;
  }

  create(guildId) {
    this.model.create(guildId);
  }

  play(guildId, channel) {
    if (this.client.voiceConnections.has(guildId)) {
      let connection = this.client.voiceConnections.get(guildId);
      if (connection.dispatcher) {
        if (connection.dispatcher.paused) {
          connection.dispatcher.resume();
          if (channel) channel.send('Resuming music playback.');
        } else {
          if (channel) channel.send("I'm already playing!");
        }
      } else {
        const info = this.model.next(guildId);
        if (info) {
          const stream = ytdl.downloadFromInfo(info, {filter: 'audioonly'});
          this.model.play(guildId, info);
          const dispatcher = connection.playStream(stream, streamOptions);
          this.addListener(guildId, connection, dispatcher, channel);
          if (channel) channel.send(`Playing: *${info.title}*`);
        } else {
          if (channel) channel.send("There's nothing in queue.");
        }
      }
    } else {
      if (channel) channel.send("I'm not in a voice channel. Use !join to have me join the voice channel you're in.");
    }
  }

  pause(guildId, channel) {
    if (this.client.voiceConnections.has(guildId)) {
      let connection = this.client.voiceConnections.get(guildId);
      if (connection.dispatcher) {
        connection.dispatcher.pause();
        if (channel) channel.send('Paused playing music.');
      } else {
        if (channel) channel.send("I'm not playing anything right now.");
      }
    } else {
      if (channel) channel.send("I'm not even in a voice channel!");
    }
  }

  stop(guildId, channel) {
    if (this.client.voiceConnections.has(guildId)) {
      let connection = this.client.voiceConnections.get(guildId);
      if (connection.dispatcher) {
        connection.dispatcher.end('stop');
        this.model.stop(guildId);
        if (channel) channel.send('Stopped playing music.');
      } else {
        if (channel) channel.send("I'm not playing anything right now.");
      }
    } else {
      if (channel) channel.send("I'm not even in a voice channel!");
    }
  }

  skip(guildId, channel) {
    if (this.client.voiceConnections.has(guildId)) {
      let connection = this.client.voiceConnections.get(guildId);
      if (connection.dispatcher) {
        const info = this.model.next(guildId);
        if (info) {
          connection.dispatcher.end('stop');
          const stream = ytdl.downloadFromInfo(info, {filter: 'audioonly'});
          this.model.play(guildId, info);
          const dispatcher = connection.playStream(stream, streamOptions);
          this.addListener(guildId, connection, dispatcher, channel);
          if (channel) channel.send(`Playing: *${info.title}*`);
        } else {
          if (channel) channel.send("There's nothing in queue.");
        }
      } else {
        if (channel) channel.send("I'm not playing anything right now.");
      }
    } else {
      if (channel) channel.send("I'm not in a voice channel. Use !join to have me join the voice channel you're in.");
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
          const dispatcher = connection.playStream(stream, streamOptions);
          this.addListener(guildId, connection, dispatcher, channel);
          if (channel) channel.send(`Playing: *${info.title}*`);
        })
        .catch(err => {
          console.log(err);
          if (channel) channel.send("That's not a valid youtube link!");
        });
    } else {
      if (channel) channel.send("I'm not in a voice channel. Use !join to have me join the voice channel you're in.");
    }
  }

  queueSong(guildId, link, channel) {
    if (this.client.voiceConnections.has(guildId)) {
      let connection = this.client.voiceConnections.get(guildId);
      const info = ytdl.getInfo(link)
        .then(info => {
          this.model.queue(guildId, info);
          console.log('emitting queue event');
          const eName = 'playlist:' + guildId;
          socket.io().to(eName).emit('queue');
          console.log('sent queue event to room: ' + eName);
          if (channel) channel.send(`Queued: *${info.title}*`);
        })
        .catch(err => {
          console.log(err);
          if (channel) channel.send("That's not a valid youtube link!");
        });
    } else {
      if (channel) channel.send("I'm not in a voice channel. Use !join to have me join the voice channel you're in.");
    }
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
        if (info) {
          const stream = ytdl.downloadFromInfo(info, {filter: 'audioonly'});
          const nextDispatcher = connection.playStream(stream, streamOptions);
          this.addListener(guildId, connection, nextDispatcher, channel);
          if (channel) channel.send(`Playing: *${info.title}*`);
        }
      }
    });
  }
}

module.exports = Player;