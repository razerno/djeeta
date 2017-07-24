import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../client/reducers';
import App from '../client/containers/app';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
const bot = require('./discord/bot');
const authUtil = require('./utils/auth');

export async function handleRender(req, res) {
  const hasAuthToken = req.session.token != undefined;

  let user = {};

  // If user is logged in then fetch their username and avatar
  if (hasAuthToken) {
    try {
      const userObject = await authUtil.fetchUser(req.session);
      user = {
        username: userObject.username,
        discriminator: userObject.discriminator,
        avatar: `https://cdn.discordapp.com/avatars/${userObject.id}/${userObject.avatar}.jpg`,
      }
    } catch(err) {
      console.log('User Fetch Error: ' + err)
    }
  }

  // Populate initial state with auth info
  const auth = { hasAuthToken, user };
  const preloadedState = { auth };

  // Create a new Redux store instance
  const store = createStore(rootReducer, preloadedState);

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Grab the initial state from Redux store
  const finalState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, finalState))
}


function renderFullPage(html, preloadedState) {
  const serializedState = serialize(preloadedState);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Djeeta</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
      </head>
      <body>
        <div id="main"></div>
        <script>window.__PRELOADED_STATE__ = ${serializedState}</script>
        <script src="/dist/bundle.js" type="text/javascript"></script>
      </body>
    </html>
  `
}