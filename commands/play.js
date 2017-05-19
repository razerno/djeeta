const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };

exports.run = (client, message, params) => {
  client.voiceConnections.map(connection => {
    const info = ytdl.getInfo(params[0])
      .then(info => {
        const stream = ytdl.downloadFromInfo(info, {filter: 'audioonly'});
        if (connection.dispatcher) {
          connection.dispatcher.end();
        }
        const dispatcher = connection.playStream(stream, streamOptions);
        message.channel.send(`Playing: *${info.title}*`);
      })
      .catch(() => {
        message.channel.send("That's not a valid youtube link!");
      });
  });
};

exports.help = {
  name: 'play',
  description: 'Plays music from a youtube link.',
  usage: 'play [youtube url]'
};