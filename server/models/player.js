const Discord = require('discord.js');
const shortid = require('shortid');
require('array.prototype.move');

queue = new Discord.Collection();
current = new Discord.Collection();

exports.create = (id) => {
  if (!queue.has(id)) {
    console.log('Instantiating queue.');
    queue.set(id, []);
  }
}

exports.delete = (id) => {
  if (queue.has(id)) {
    console.log('Removing queue.');
    queue.delete(id);
    current.delete(id);
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
  console.log('Moving to next song');
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

exports.move = (id, songId, newIndex) => {
  if (queue.has(id)) {
    const oldIndex = queue.get(id).findIndex(element => {const {sid, info} = element; return sid == songId})
    if (oldIndex != -1) {
      console.log('Moving song position');
      queue.get(id).move(oldIndex, newIndex);
    }
  }
}

exports.delete = (id, songId) => {
  if (queue.has(id)) {
    const index = queue.get(id).findIndex(element => {const {sid, info} = element; return sid == songId})
    if (index != -1) {
      console.log('Deleting song');
      queue.get(id).splice(index, 1);
    }
  }
}

exports.hasCurrent = (id) => {
  return current.has(id);
}

exports.getCurrent = (id) => {
  return current.get(id);
}

exports.hasQueue = (id) => {
  return queue.has(id);
}

exports.getQueue = (id) => {
  return queue.get(id);
}

exports.getKeys = () => {
  return queue.keyArray();
}