import React from 'react';
import { connect } from 'react-redux';
import { fetchPlaylist, selectServer } from '../actions/player'

const io = require('socket.io-client')
const socket = io()

class ServerSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const id = event.target.value;

    socket.emit('playlist', id);

    this.props.fetchPlaylist(id);
    this.props.selectServer(id);

    socket.off('queue');
    socket.on('queue', () => {
      console.log('sio: Received queue event');
      this.props.fetchPlaylist(id);
    });
  }

  render() {
    return (
      <form>
        <label>
          Select server:
          <select value={this.props.selectedServer} onChange={this.handleChange}>
            <option value='0' disabled hidden></option>
            {this.props.servers.map(server => {
              return (
                <option key={server} value={server}>{server}</option>
              );
            })}
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    servers: state.servers,
    selectedServer: state.selectedServer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPlaylist: id => dispatch(fetchPlaylist(id)),
    selectServer: id => dispatch(selectServer(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerSelect);