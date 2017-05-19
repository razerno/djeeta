const Discord = require('discord.js');
const config = require('../config.json');

exports.run = (client, message, params) => {
  if (params[0]) {
    if (client.commands.has(params[0])) {
      command = client.commands.get(params[0]);
      let embed = new Discord.RichEmbed()
        .setTitle(config.prefix + command.help.usage)
        .setColor('#1c0f31')
        .setDescription(command.help.description);
      message.channel.send({embed});
    } else {
      message.channel.send("Sorry, that command doesn't exist!");
    }
  } else {
    let embed = new Discord.RichEmbed()
      .setTitle('Djeeta Helpsheet')
      .setColor('#1c0f31')
      .setDescription('A list of all available commands that Djeeta can execute.\n\u200B');

    client.commands.forEach((command) => {
      embed = embed.addField(config.prefix + command.help.usage, command.help.description, false);
    });

    message.channel.send({embed});
  }
}

exports.help = {
  name: 'help',
  description: 'Displays the list of available commands.',
  usage: 'help'
}