import React from 'react';
import Auth from './auth';
import Header from './header';
import Content from './content';
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/src/styles/index.scss';

const App = props => {
  return (
    <div>
      <Auth />
      <Header />
      <Content />
      <ReduxToastr
        timeOut={4000}
        preventDuplicates
        position="top-center"
        transitionIn="fadeIn"
        transitionOut="fadeOut" />
    </div>
  )
}

export default App;