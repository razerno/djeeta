import React from 'react';

import ServerList from './serverlist'

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      servers: [],
    };
  }

  fetchAllServers() {
    console.log('Fetching all servers');
    fetch('/player')
      .then(res => res.json())
      .then(data => {
        this.setState({servers: data.servers});
      });
  }

  componentDidMount() {
    this.fetchAllServers();
  }

  handleClick() {
    this.fetchAllServers();
  }

  renderServerList() {
    if (this.state.servers.length > 0) {
      return (
        <ServerList servers={this.state.servers} />
      );
    } else {
      return (
        'No servers available.'
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Player</h2>
        <button onClick={() => this.handleClick()}>Update</button>
        <br/>
        {this.renderServerList()}
      </div>
    );
  }
}

export default Player;