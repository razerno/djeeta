const rp = require('request-promise');
const Discord = require('discord.js');

exports.run = (client, message, params) => {
  let options = {
    uri: 'https://safebooru.donmai.us/posts.json',
    qs: {
      limit: 1,
      random: true,
      tags: `${params.join(' ')}`
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }

  rp(options)
    .then(response => {
      console.log(response);
      if (response.length) {
        let file = 'https://safebooru.donmai.us' + response[0].file_url;
        let embed = new Discord.RichEmbed()
          .setColor('#1c0f31')
          .setImage(file)
          .setFooter('https://safebooru.donmai.us/posts/' + response[0].id);

        if (response[0].tag_count_artist > 0) {
          embed.addField('Artist:', `\`${response[0].tag_string_artist}\``);
        }
        if (response[0].tag_count_artist > 0) {
          embed.addField('Characters:', `\`${response[0].tag_string_character}\``);
        }
        if (response[0].tag_count_copyright > 0) {
          embed.addField('Copyright:', `\`${response[0].tag_string_copyright}\``);
        }

        message.channel.send({embed});
      }
      else {
        message.channel.send(`Sorry, there are no results for that!`);
      }
    })
    .catch(err => {
      console.log(err);
      message.channel.send(err.response.body.message);
    });
}

exports.help = {
  name: 'booru',
  description: 'Search for an image on Safebooru',
  usage: 'booru [tag]'
}