const player = require('../models/player');

exports.index = (req, res) => {
  const servers = player.listAll();

  res.json({ servers: servers });
}

exports.playlist = (req, res) => {
  const queue = player.list(req.params.id).map(info => { return {title: info.title, url: info.video_url, image: info.iurlhq}})

  res.json({ id: req.params.id, queue: queue });
}