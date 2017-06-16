const player = require('../models/player');
const ytdl = require('ytdl-core');
const socket = require('../../sio');

exports.index = (req, res) => {
  const servers = player.listAll();

  res.json({ servers: servers });
}

exports.playlist = (req, res) => {
  const queue = player.list(req.params.id).map(infomap => {const {sid, info} = infomap; return {id: sid, title: info.title, url: info.video_url, image: info.iurlhq}})

  res.json({ id: req.params.id, queue: queue });
}

exports.addSong = (req, res) => {
  const guildId = req.body.id;
  const url = req.body.url;

  if (player.has(guildId)) {
    const info = ytdl.getInfo(url)
      .then(info => {
        player.queue(guildId, info);
        console.log('emitting queue event');
        const eName = 'playlist:' + guildId;
        socket.io().to(eName).emit('queue');
        console.log('sent queue event to room: ' + eName);
        res.send('Successfully queued.');
      })
      .catch(err => {
        console.log(err);
        res.status(404).send('Not a valid youtube link.');
      });
  } else {
    res.status(404).send('Not a valid server.');
  }
}