const Discord = require('discord.js');
const client = new Discord.Client();

// Add status command to TextChannel to become in line with HTTP Responses
Discord.TextChannel.prototype.status = function (code) {return this;};
const Player = require('./player');

const config = require('./config');
const fs = require('fs');


client.on('ready', () => {
  console.log('I am ready!');
});

client.player = new Player(client, require('../models/player'));
client.commands = new Discord.Collection();

fs.readdir('./server/discord/commands/', (err, files) => {
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

  if (message.content.startsWith(config.prefix)) {
    let cmdName = message.content.split(' ')[0].slice(config.prefix.length);
    let params = message.content.split(' ').slice(1);
    if (client.commands.has(cmdName)) {
      let command = client.commands.get(cmdName);
      command.run(client, message, params);
    }
  }

  if (message.content == config.prefix + 'myid') {
    message.channel.send(message.author.username + "'s ID is: " + message.author.id);
  }

});

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