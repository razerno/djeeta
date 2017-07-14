exports.run = (client, message, params) => {
  let guildId = message.member.guild.id;
  client.player.leave(guildId, message.channel);
}

exports.help = {
  name: 'leave',
  description: 'Leaves the current voice channel.',
  usage: 'leave'
}