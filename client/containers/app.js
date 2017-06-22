import React from 'react';

import Commands from './commands';
import Player from './player';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Djeeta</h1>
        <Commands />
        <Player />
      </div>
    );
  }
}

export default App;