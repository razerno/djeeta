const bot = require('../discord/bot');

exports.commands = (req, res) => {
  const commands = bot.client.commands.map(command => command.help);

  res.json({ commands: commands });
}

exports.prefix = (req, res) => {
  const prefix = bot.config.prefix;

  res.json({ prefix: prefix });
}

exports.avatar = (req, res) => {
  const avatarUrl = bot.client.user.avatarURL;

  res.json({ url: avatarUrl });
}