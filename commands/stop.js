const player = require('../models/player.js');

exports.run = (client, message, params) => {
  let guildId = message.member.guild.id;
  if (client.voiceConnections.has(guildId)) {
    let connection = client.voiceConnections.get(guildId);
    if (connection.dispatcher) {
      connection.dispatcher.end('stop');
      player.stop(guildId);
      message.channel.send('Stopped playing music.');
    }
  } else {
    message.channel.send("I'm not even in a voice channel!");
  }
}

exports.help = {
  name: 'stop',
  description: 'Stops playing music.',
  usage: 'stop'
}