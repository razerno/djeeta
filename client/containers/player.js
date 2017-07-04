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
    if (this.props.servers.isFetching) {
      return (
        'Loading...'
      );
    } else if (this.props.servers.ids.length > 0) {
      return (
        <div>
          <ServerSelect />
          <PlaylistControl />
        </div>
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
        <Button bsStyle="primary" onClick={() => this.handleClick()}>Update</Button>
        <br/>
        {this.renderComponents()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    servers: state.servers,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchServers: () => dispatch(fetchServers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);