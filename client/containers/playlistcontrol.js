import React from 'react';
import { connect } from 'react-redux';
import { moveSong, deleteSong, MOVE_SONG_FAILURE, DELETE_SONG_FAILURE } from '../actions/player';
import { Panel } from 'react-bootstrap';
import Loading from '../components/loading';
import NowPlaying from './nowplaying';
import Playlist from './playlist';
import AddLink from './addlink';

class PlaylistControl extends React.Component {
  constructor() {
    super();
    this.onSortEnd = this.onSortEnd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onSortEnd({oldIndex, newIndex}) {
    if (oldIndex != newIndex) {
      this.props.moveSong(this.props.playlist.id, this.props.playlist.queue[oldIndex].id, newIndex)
      .then(actionResponse => {
        switch (actionResponse.type) {
          case MOVE_SONG_FAILURE:
            if (actionResponse.payload.status == 403) {
              toastr.error("You are not authorized to access that playlist. Please refresh the server list.");
            } else {
              toastr.error("Failed to move song. Please try again.");
            }
            break;
        }
      });
    }
  }

  onDelete(songId) {
    this.props.deleteSong(this.props.playlist.id, songId)
    .then(actionResponse => {
      switch (actionResponse.type) {
        case DELETE_SONG_FAILURE:
          if (actionResponse.payload.status == 403) {
            toastr.error("You are not authorized to access that playlist. Please refresh the server list.");
          } else {
            toastr.error("Failed to delete song. Please try again.");
          }
          break;
      }
    });
  }

  shouldCancelStart(e) {
    if (e.target.tagName.toLowerCase() === 'svg') {
      return true;
    }
  }

  renderComponents() {
    if (this.props.playlist.id) {
      return (
        <Panel style={{position: 'relative'}}>
          <Loading condition={this.props.playlistIsFetching}/>
          {this.props.playlist.nowPlaying && <NowPlaying info={this.props.playlist.nowPlaying} />}
          <Playlist queue={this.props.playlist.queue} pressDelay={50} onSortEnd={this.onSortEnd} shouldCancelStart={this.shouldCancelStart} onDelete={this.onDelete} />
          <AddLink id= {this.props.playlist.id} />
        </Panel>
      );
    } else {
      return (
        <Panel style={{position: 'relative'}}>
          No server selected.
        </Panel>
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
    playlist: state.playlist.current,
    playlistIsFetching: state.playlist.isFetching,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    moveSong: (id, songId, newIndex) => dispatch(moveSong(id, songId, newIndex)),
    deleteSong: (id, songId) => dispatch(deleteSong(id, songId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistControl);