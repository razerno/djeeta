const player = require('../../models/player.js');

exports.run = (client, message, params) => {
  let guildId = message.member.guild.id;
  if (client.voiceConnections.has(guildId)) {
    let connection = client.voiceConnections.get(guildId);
    if (connection.dispatcher) {
      connection.dispatcher.pause();
      message.channel.send('Paused playing music.');
    } else {
      message.channel.send("I'm not playing anything right now.")
    }
  } else {
    message.channel.send("I'm not even in a voice channel!");
  }
}

exports.help = {
  name: 'pause',
  description: 'Pauses playing music.',
  usage: 'pause'
}