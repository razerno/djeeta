require('css-modules-require-hook')({
    generateScopedName: '[name]__[local]___[hash:base64:5]',
    extensions: ['.scss', '.css'],
});
require('babel-register')();

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const app = express();
const path = require('path');
const bot = require('./discord/bot');
const serverRender = require('./server-render');

// Include routes
const playerRoute = require('./routes/player');
const botRoute = require('./routes/bot');
const authRoute = require('./routes/auth');

// Configure express to user body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure express to use cookie-session
app.use(cookieSession({
  name: 'session',
  keys: [ 'as428dfs8340' ],
  maxAge: 60 * 24 * 60 * 60 * 1000 // 60 days
}));

// Expose static site and register api routes
app.use(express.static(path.join(__dirname, '../public')));

app.use('/player', playerRoute);
app.use('/bot', botRoute);
app.use('/auth', authRoute);

app.use(serverRender.handleRender);

const server = app.listen(3000, () => {
  console.log('Djeeta listening on port 3000!')
});

// Set up socket.io
const io = require('./sio').init(server);