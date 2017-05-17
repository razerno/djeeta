exports.run = (client, message, params) => {
  if (message.member.voiceChannel) {
    message.member.voiceChannel.join()
      .then(connection => {
        message.reply(`Successfully connected to ${connection.channel.name}.`);
      })
      .catch(console.log);
  } else {
    message.reply('You need to join a voice channel first!');
  }
};

exports.help = {
  name: 'join',
  description: 'Join a voice channel.'
};