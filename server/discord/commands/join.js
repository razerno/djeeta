exports.run = (client, message, params) => {
  let guildId = message.member.guild.id;
  client.player.join(guildId, message.member.voiceChannel, message.channel);
}

exports.help = {
  name: 'join',
  description: 'Joins the voice channel you are currently in.',
  usage: 'join'
}