const Discord = require('discord.js');
const client = new Discord.Client();

// Add status command to TextChannel to become in line with HTTP Responses
Discord.TextChannel.prototype.status = function (code) {return this;};
const Player = require('./player');

const config = require('./config');
const fs = require('fs');
const path = require('path');


client.on('ready', () => {
  console.log('I am ready!');
});

client.player = new Player(client, require('../models/player'));
client.commands = new Discord.Collection();

fs.readdir(path.join(__dirname, 'commands/'), (err, files) => {
  if (err) console.error(err);
  console.log(`Loading ${files.length} commands.`);
  files.forEach(f => {
    let command = require(`./commands/${f}`);
    console.log(`Loading command ${command.help.name}.`);
    client.commands.set(command.help.name, command);
  });
});

client.on('message', (message) => {
  if (!message.content.startsWith(config.prefix)) return;
  if (message.author.bot) return;

  // Commands to be restricted to botchannel
  if (config.channel && message.channel.name != config.channel) return;

  if (message.content.startsWith(config.prefix) && message.channel instanceof Discord.TextChannel) {
    let cmdName = message.content.split(' ')[0].slice(config.prefix.length);
    let params = message.content.split(' ').slice(1);
    if (client.commands.has(cmdName)) {
      let command = client.commands.get(cmdName);
      command.run(client, message, params);
    }
  }

  // Private eval command for bot owner only
  if (message.content.startsWith(config.prefix + "eval")) {
    if(message.author.id !== config.owner_id) return;
    const args = message.content.split(" ").slice(1);
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }

});

// Clean function to remove mentions using a zero length character
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on('error', (err) => {
  console.log('Client error event: ' + err);
})

client.login(config.token);

function gracefulQuit() {
  console.log( "\nGracefully shutting down." );
  client.destroy();
  process.exit();
}

process.on('SIGINT', () => gracefulQuit());
process.on('SIGTERM', () => gracefulQuit());

exports.client = client;
exports.config = config;