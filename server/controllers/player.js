const bot = require('../discord/bot');
const auth = require('../utils/auth');

exports.index = async (req, res) => {
  let servers = [];
  if (req.session.token != undefined) {
    const userObject = await auth.fetchUser(req.session);

    bot.client.player.getGuilds().forEach(guildId => {
      const guild = bot.client.guilds.get(guildId);
      if (guild.members.get(userObject.id)) {
        servers.push({ id: guildId, name: guild.name });
      }
    });
  }

  res.json({ servers: servers });
}

exports.getPlaylist = async (req, res) => {
  const guildId = req.params.id;

  const userAuthorized = await auth.isUserAuthorized(req.session, guildId);
  if (!userAuthorized) {
    return res.status(403).json({ message: '403: Forbidden' });
  }

  let nowPlaying;
  const npInfo = bot.client.player.getNowPlaying(guildId);
  if (npInfo) {
    nowPlaying = {title: npInfo.title, url: npInfo.video_url, image: npInfo.iurlhq, length: npInfo.length_seconds};
  }
  const queue = bot.client.player.getQueue(guildId).map(infomap => {
    const {sid, info} = infomap;
    return {id: sid, title: info.title, url: info.video_url, image: info.iurlhq, length: info.length_seconds};
  });

  res.json({ id: req.params.id, nowPlaying: nowPlaying, queue: queue });
}

exports.getNowPlaying = async (req, res) => {
  const guildId = req.params.id;

  const userAuthorized = await auth.isUserAuthorized(req.session, guildId);
  if (!userAuthorized) {
    return res.status(403).json({ message: '403: Forbidden' });
  }

  let nowPlaying;
  const npInfo = bot.client.player.getNowPlaying(guildId);
  if (npInfo) {
    const {sid, info} = npInfo;
    nowPlaying = {id: sid, title: info.title, url: info.video_url, image: info.iurlhq, length: info.length_seconds};
  }

  res.json({ nowPlaying: nowPlaying });
}

exports.getQueue = async (req, res) => {
  const guildId = req.params.id;

  const userAuthorized = await auth.isUserAuthorized(req.session, guildId);
  if (!userAuthorized) {
    return res.status(403).json({ message: '403: Forbidden' });
  }

  const queue = bot.client.player.getQueue(guildId).map(infomap => {
    const {sid, info} = infomap;
    return {id: sid, title: info.title, url: info.video_url, image: info.iurlhq, length: info.length_seconds};
  });

  res.json({ queue: queue });
}

exports.addSong = async (req, res) => {
  const guildId = req.params.id;
  const url = req.body.url;

  const userAuthorized = await auth.isUserAuthorized(req.session, guildId);
  if (!userAuthorized) {
    return res.status(403).json({ message: '403: Forbidden' });
  }

  bot.client.player.queueSong(guildId, url, res);
}

exports.moveSong = async (req, res) => {
  const guildId = req.params.id;
  const songId = req.params.songid;
  const newIndex = req.body.newindex;

  const userAuthorized = await auth.isUserAuthorized(req.session, guildId);
  if (!userAuthorized) {
    return res.status(403).json({ message: '403: Forbidden' });
  }

  bot.client.player.moveSong(guildId, songId, newIndex, res);
}

exports.deleteSong = async (req, res) => {
  const guildId = req.params.id;
  const songId = req.params.songid;

  const userAuthorized = await auth.isUserAuthorized(req.session, guildId);
  if (!userAuthorized) {
    return res.status(403).json({ message: '403: Forbidden' });
  }

  bot.client.player.deleteSong(guildId, songId, res);
}