exports.run = (client, message, params) => {
  message.channel.send('pong!');
};

exports.help = {
  name: 'ping',
  description: 'A simple ping/pong call and response command.'
};