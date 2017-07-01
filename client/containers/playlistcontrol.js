import React from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import Loading from '../components/loading';
import Playlist from './playlist';
import AddLink from './addlink';

class PlaylistControl extends React.Component {
  renderComponents() {
    if (this.props.playlist) {
      return (
        <Panel style={{position: 'relative'}}>
          <Loading condition={this.props.playlistIsFetching}/>
          <Playlist id={this.props.playlist.id} queue={this.props.playlist.queue} />
          <AddLink id= {this.props.playlist.id} />
        </Panel>
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
        {this.renderComponents()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlist[state.selectedServer],
    playlistIsFetching: state.playlistIsFetching,
  }
}

export default connect(mapStateToProps)(PlaylistControl);