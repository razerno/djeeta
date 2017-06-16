const player = require('../../models/player.js');
const ytdl = require('ytdl-core');
const play = require('./play.js');

exports.run = (client, message, params) => {
  let guildId = message.member.guild.id;
  if (client.voiceConnections.has(guildId)) {
    let connection = client.voiceConnections.get(guildId);
    if (connection.dispatcher) {
      const info = player.next(guildId);
      if (info) {
        connection.dispatcher.end('stop');
        const stream = ytdl.downloadFromInfo(info, {filter: 'audioonly'});
        player.play(guildId, info);
        const dispatcher = connection.playStream(stream, player.streamOptions);
        message.channel.send(`Playing: *${info.title}*`);
        play.addListener(message.channel, guildId, connection, dispatcher);
      } else {
        message.channel.send("There's nothing in queue.");
      }
    } else {
      message.channel.send("I'm not playing anything right now.");
    }
  } else {
    message.channel.send("I'm not in a voice channel. Use !join to have me join the voice channel you're in.");
  }
}

exports.help = {
  name: 'next',
  description: 'Moves on to the next song in the queue.',
  usage: 'next'
}