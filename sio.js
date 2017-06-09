const sio = require('socket.io');
let io = null;

exports.io = () => {
  return io;
}

exports.init = server => {
  io = sio(server);

  io.on('connection', (socket) => {
    console.log('sio: A user connected');

    socket.on('disconnect', () => {
      console.log('sio: A user disconnected');
    });

    socket.on('playlist', (id) => {
      console.log('sio: Registering socket with room ' + id)
      socket.join('playlist:' + id);
    })
  });

  return io;
}