const player = require('../models/player.js');
const ytdl = require('ytdl-core');

exports.run = (client, message, params) => {
  let guildId = message.member.guild.id;
  if (client.voiceConnections.has(guildId)) {
    let connection = client.voiceConnections.get(guildId);
    const info = ytdl.getInfo(params[0])
      .then(info => {
        player.queue(guildId, info);
        message.channel.send(`Queued: *${info.title}*`);
      })
      .catch(err => {
        console.log(err);
        message.channel.send("That's not a valid youtube link!");
      });
  } else {
    message.channel.send("I'm not in a voice channel. Use !join to have me join the voice channel you're in.");
  }
}

exports.help = {
  name: 'queue',
  description: 'Add a youtube link to the music queue.',
  usage: 'queue [youtube url]'
}