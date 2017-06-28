const bot = require('../discord/bot');

exports.index = (req, res) => {
  const servers = bot.client.player.getGuilds();

  res.json({ servers: servers });
}

exports.getPlaylist = (req, res) => {
  const queue = bot.client.player.getQueue(req.params.id).map(infomap => {
    const {sid, info} = infomap;
    return {id: sid, title: info.title, url: info.video_url, image: info.iurlhq};
  });

  res.json({ id: req.params.id, queue: queue });
}

exports.getQueue = (req, res) => {
  const queue = bot.client.player.getQueue(req.params.id).map(infomap => {
    const {sid, info} = infomap;
    return {id: sid, title: info.title, url: info.video_url, image: info.iurlhq};
  });

  res.json({ queue: queue });
}

exports.addSong = (req, res) => {
  const guildId = req.params.id;
  const url = req.body.url;

  bot.client.player.queueSong(guildId, url, res);
}

exports.moveSong = (req, res) => {
  const guildId = req.params.id;
  const songId = req.params.songid;
  const newIndex = req.body.newindex;

  bot.client.player.moveSong(guildId, songId, newIndex, res);
}

exports.deleteSong = (req, res) => {
  const guildId = req.params.id;
  const songId = req.params.songid;

  bot.client.player.deleteSong(guildId, songId, res);
}