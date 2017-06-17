exports.run = (client, message, params) => {
  let guildId = message.member.guild.id;
  client.player.queueSong(guildId, params[0], message.channel);
}

exports.help = {
  name: 'queue',
  description: 'Adds a youtube link to the music queue.',
  usage: 'queue [youtube url]'
}