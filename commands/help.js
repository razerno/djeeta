const Discord = require('discord.js');

exports.run = (client, message, params) => {
  if (params[0]) {
    if (client.commands.has(params[0])) {
      message.channel.send('That command exists!');
    } else {
      message.channel.send("Sorry, that command doesn't exist!");
    }
  } else {
    let embed = new Discord.RichEmbed()
      .setTitle('Djeeta Helpsheet')
      .setColor('#1c0f31')
      .setDescription('A list of all available commands that Djeeta can execute.\n\u200B');

    client.commands.forEach((command) => {
      embed = embed.addField(command.help.name, command.help.description, false);
    });

    message.channel.send({embed});
  }
}

exports.help = {
  name: 'help',
  description: 'Check the list of available commands.'
}