exports.run = (client, message, params) => {
  let guildId = message.member.guild.id;
  client.player.pause(guildId, message.channel);
}

exports.help = {
  name: 'pause',
  description: 'Pauses playing music.',
  usage: 'pause'
}