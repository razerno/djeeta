import React from 'react';

import Playlist from './playlist'

const io = require('socket.io-client')
const socket = io()

class ServerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: '',
      selectedPlaylist: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  fetchPlaylist(id) {
    console.log('Fetching playlist ' + id);
    fetch(`/player/playlist/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          currentId: id,
          selectedPlaylist: data,
        });
      });
    socket.on('queue', () => {
      console.log('sio: Received queue event');
      this.fetchPlaylist(id);
    });
  }

  handleChange(event) {
    socket.emit('playlist', event.target.value);
    this.fetchPlaylist(event.target.value);
  }

  renderPlaylist() {
    if (this.state.currentId != '') {
      return (
        <Playlist id={this.state.selectedPlaylist.id} queue={this.state.selectedPlaylist.queue} />
      );
    } else {
      return (
        'No server selected.'
      );
    }
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Select server:
            <select value={this.state.currentId} onChange={this.handleChange}>
              <option value='' disabled hidden>Select a server</option>
              {this.props.servers.map(server => {
                return (
                  <option key={server} value={server}>{server}</option>
                );
              })}
            </select>
          </label>
        </form>
        {this.renderPlaylist()}
      </div>
    );
  }
}

export default ServerList;