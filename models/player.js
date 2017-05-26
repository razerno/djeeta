const Discord = require('discord.js');

queue = new Discord.Collection();
current = new Discord.Collection();

exports.streamOptions = { seek: 0, volume: 1 };

exports.play = (id, info) => {
  console.log(`Playing: *${info.title}*`);
  current.set(id, info);
}

exports.queue = (id, info) => {
  console.log(`Queuing: *${info.title}*`);
  if (queue.has(id)) {
    console.log('Queue exists so adding song to list');
    queue.get(id).push(info);
  } else {
    console.log('Queue does not exist so creating queue');
    queue.set(id, [info]);
  }
}

exports.next = (id) => {
  console.log('Moving to next song')
  if (queue.has(id) && queue.get(id).length > 0) {
    console.log('Queue exists and is not empty');
    const info = queue.get(id).shift();
    current.set(id, info);
    return info;
  } else {
    console.log('Nothing in queue.');
  }
}

exports.stop = (id) => {
  current.delete(id);
}

exports.list = (id) => {
  return queue.get(id);
}