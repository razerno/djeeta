exports.run = (client, message, params) => {
  let guildId = message.member.guild.id;
  client.player.skip(guildId, message.channel);
}

exports.help = {
  name: 'next',
  description: 'Moves on to the next song in the queue.',
  usage: 'next'
}