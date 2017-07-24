import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import App from './containers/app';
import './style.css';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = configureStore(preloadedState);

render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('main')
);