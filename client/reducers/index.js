import { combineReducers } from 'redux';
import { commands, prefix, avatar } from './bot';
import { servers, playlist, playlistIsFetching, selectedServer } from './player';

export default combineReducers({
  commands,
  prefix,
  avatar,
  servers,
  playlist,
  playlistIsFetching,
  selectedServer,
})