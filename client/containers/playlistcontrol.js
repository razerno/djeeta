import React from 'react';
import { connect } from 'react-redux';
import Playlist from './playlist'
import AddLink from './addlink'

class PlaylistControl extends React.Component {
  renderComponents() {
    if (this.props.playlist) {
      return (
        <div>
          <Playlist id={this.props.playlist.id} queue={this.props.playlist.queue} />
          <AddLink id= {this.props.playlist.id} />
        </div>
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
  }
}

export default connect(mapStateToProps)(PlaylistControl);