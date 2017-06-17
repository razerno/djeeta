import React from 'react';

import Playlist from './playlist'
import AddLink from './addlink'

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
    socket.off('queue');
    socket.on('queue', () => {
      console.log('sio: Received queue event');
      this.fetchPlaylist(id);
    });
  }

  handleChange(event) {
    socket.emit('playlist', event.target.value);
    this.fetchPlaylist(event.target.value);
  }

  renderComponents() {
    if (this.state.currentId != '') {
      return (
        <div>
        {this.renderPlaylist()}
        {this.renderAddLink()}
        </div>
      );
    } else {
      return (
        'No server selected.'
      );
    }
  }

  renderPlaylist() {
    return (
      <Playlist id={this.state.selectedPlaylist.id} queue={this.state.selectedPlaylist.queue} />
    )
  }

  renderAddLink() {
    return (
      <AddLink id={this.state.selectedPlaylist.id} />
    )
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
        {this.renderComponents()}
      </div>
    );
  }
}

export default ServerList;