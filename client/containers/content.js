import React from 'react';
import { Grid } from 'react-bootstrap';
import Commands from './commands';
import Player from './player';

const Content = props => {
  return (
    <Grid>
      <h2>Commands</h2>
      <Commands />
      <h2>Player</h2>
      <Player />
    </Grid>
  )
}

export default Content;