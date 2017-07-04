import React from 'react';
import { connect } from 'react-redux';
import { moveSong, deleteSong } from '../actions/player';
import { Panel } from 'react-bootstrap';
import Loading from '../components/loading';
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
      this.props.moveSong(this.props.playlist.id, this.props.playlist.queue[oldIndex].id, newIndex);
    }
  }

  onDelete(songId) {
    this.props.deleteSong(this.props.playlist.id, songId);
  }

  renderComponents() {
    if (this.props.playlist) {
      return (
        <Panel style={{position: 'relative'}}>
          <Loading condition={this.props.playlistIsFetching}/>
          <Playlist queue={this.props.playlist.queue} distance={2} onSortEnd={this.onSortEnd} onDelete={this.onDelete} />
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

const mapDispatchToProps = dispatch => {
  return {
    moveSong: (id, songId, newIndex) => dispatch(moveSong(id, songId, newIndex)),
    deleteSong: (id, songId) => dispatch(deleteSong(id, songId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistControl);