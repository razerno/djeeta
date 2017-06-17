exports.run = (client, message, params) => {
  let guildId = message.member.guild.id;
  if (params.length > 0) {
    client.player.playSong(guildId, params[0], message.channel);
  } else {
    client.player.play(guildId, message.channel);
  }
}

exports.help = {
  name: 'play',
  description: 'Plays music from a youtube link.',
  usage: 'play [youtube url]'
}