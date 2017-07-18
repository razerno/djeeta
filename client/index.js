import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/src/styles/index.scss';

import App from './containers/app';
import './style.css';

const store = configureStore();

render(
  (
    <Provider store={store}>
      <div>
        <App />
        <ReduxToastr
          timeOut={4000}
          preventDuplicates
          position="top-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut" />
      </div>
    </Provider>
  ),
  document.getElementById('main')
);