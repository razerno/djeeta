import React from 'react';
import { connect } from 'react-redux';
import { fetchServers } from '../actions/player';
import { Button } from 'react-bootstrap';
import ServerSelect from './serverselect';
import PlaylistControl from './playlistcontrol';

class Player extends React.Component {
  componentDidMount() {
    this.props.fetchServers();
  }

  handleClick() {
    this.props.fetchServers();
  }

  renderComponents() {
    if (!this.props.hasAuthToken) {
      return (
        <center>You must be logged in to control the music player.</center>
      )
    } else if (this.props.servers.list.length > 0) {
      return (
        <div>
          <center><ServerSelect /></center>
          <br/>
          <PlaylistControl />
        </div>
      );
    } else {
      return (
        <center><ServerSelect /></center>
      );
    }
  }

  render() {
    return (
      <div style={{ minHeight: '150px' }}>
        {this.renderComponents()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    servers: state.servers,
    hasAuthToken: state.auth.hasAuthToken,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchServers: () => dispatch(fetchServers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);