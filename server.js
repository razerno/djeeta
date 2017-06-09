const express = require('express');
const app = express();
const path = require('path');

// Include routes
const player = require('./server/routes/player');
const bot = require('./server/routes/bot');

// Expose static site and register api routes
app.use(express.static(path.join(__dirname, 'public')));

app.use('/player', player);
app.use('/bot', bot);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

const server = app.listen(3000, () => {
  console.log('Djeeta listening on port 3000!')
});

// Set up socket.io
const io = require('./sio').init(server);