exports.run = (client, message, params) => {
  client.voiceConnections.map(connection => {
    if (connection.dispatcher) {
      connection.dispatcher.end();
      message.channel.send('Stopped playing music.');
    }
  });
};

exports.help = {
  name: 'stop',
  description: 'Stops playing music.',
  usage: 'stop'
};