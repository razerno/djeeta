const Discord = require('discord.js');
const shortid = require('shortid');

queue = new Discord.Collection();
current = new Discord.Collection();

exports.create = (id) => {
  if (!queue.has(id)) {
    console.log('Instantiating queue.');
    queue.set(id, []);
  }
}

exports.play = (id, info) => {
  console.log(`Playing: *${info.title}*`);
  current.set(id, info);
}

exports.queue = (id, info) => {
  console.log(`Queuing: *${info.title}*`);
  const sid = shortid.generate();
  if (queue.has(id)) {
    console.log('Queue exists so adding song to list');
    queue.get(id).push({sid, info});
  } else {
    console.log('Queue does not exist so creating queue');
    queue.set(id, [{sid, info}]);
  }
}

exports.next = (id) => {
  console.log('Moving to next song')
  if (queue.has(id) && queue.get(id).length > 0) {
    console.log('Queue exists and is not empty');
    const {sid, info} = queue.get(id).shift();
    current.set(id, {sid, info});
    return info;
  } else {
    console.log('Nothing in queue.');
  }
}

exports.stop = (id) => {
  current.delete(id);
}

exports.has = (id) => {
  return queue.has(id);
}

exports.getQueue = (id) => {
  return queue.get(id);
}

exports.getKeys = () => {
  return queue.keyArray();
}