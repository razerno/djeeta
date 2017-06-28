import React from 'react';
import { Jumbotron, Grid } from 'react-bootstrap';

const Header = props => {
  return (
    <Jumbotron>
      <Grid>
        <h1>Djeeta</h1>
        A Discord bot written using Node.js and the Discord.js library, with a React + Redux front end.
      </Grid>
    </Jumbotron>
  )
}

export default Header;