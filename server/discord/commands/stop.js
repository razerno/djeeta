exports.run = (client, message, params) => {
  let guildId = message.member.guild.id;
  client.player.stop(guildId, message.channel);
}

exports.help = {
  name: 'stop',
  description: 'Stops playing music.',
  usage: 'stop'
}