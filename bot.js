const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.js');
const fs = require('fs');

client.on('ready', () => {
  console.log('I am ready!');
});

client.commands = new Discord.Collection();

fs.readdir('./server/commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`Loading ${files.length} commands.`);
  files.forEach(f => {
    let command = require(`./server/commands/${f}`);
    console.log(`Loading command ${command.help.name}.`);
    client.commands.set(command.help.name, command);
  });
});

client.on('message', (message) => {
  if (!message.content.startsWith(config.prefix)) return;
  if (message.author.bot) return;

  // Commands to be restricted to botchannel
  if (message.channel.name != 'botchannel') return;

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

client.login(config.token);

function gracefulQuit() {
  console.log( "\nGracefully shutting down." );
  client.destroy();
  process.exit( );
}

process.on('SIGINT', () => gracefulQuit());
process.on('SIGTERM', () => gracefulQuit());