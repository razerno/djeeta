const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const bot = require('./server/discord/bot');

// Include routes
const player_route = require('./server/routes/player');
const bot_route = require('./server/routes/bot');

// Configure express to user body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Expose static site and register api routes
app.use(express.static(path.join(__dirname, 'public')));

app.use('/player', player_route);
app.use('/bot', bot_route);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

const server = app.listen(3000, () => {
  console.log('Djeeta listening on port 3000!')
});

// Set up socket.io
const io = require('./sio').init(server);