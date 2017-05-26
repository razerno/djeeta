const player = require('../models/player.js');
const ytdl = require('ytdl-core');

exports.run = (client, message, params) => {
  let guildId = message.member.guild.id;
  if (client.voiceConnections.has(guildId)) {
    let connection = client.voiceConnections.get(guildId);
    const info = ytdl.getInfo(params[0])
      .then(info => {
        const stream = ytdl.downloadFromInfo(info, {filter: 'audioonly'});
        if (connection.dispatcher) {
          connection.dispatcher.end('stop');
        }
        player.play(guildId, info);
        let dispatcher = connection.playStream(stream, player.streamOptions);
        message.channel.send(`Playing: *${info.title}*`);
        addListener(message.channel, guildId, connection, dispatcher);
      })
      .catch(err => {
        console.log(err);
        message.channel.send("That's not a valid youtube link!");
      });
  } else {
    message.channel.send("I'm not in a voice channel. Use !join to have me join the voice channel you're in.");
  }
}

function addListener(channel, guildId, connection, dispatcher) {
  dispatcher.on('end', message => {
    if (message != 'stop') {
      const info = player.next(guildId);
      if (info) {
        const stream = ytdl.downloadFromInfo(info, {filter: 'audioonly'});
        const nextDispatcher = connection.playStream(stream, player.streamOptions);
        channel.send(`Playing: *${info.title}*`);
        addListener(channel, guildId, connection, nextDispatcher);
      }
    }
  });
}

exports.help = {
  name: 'play',
  description: 'Plays music from a youtube link.',
  usage: 'play [youtube url]'
}