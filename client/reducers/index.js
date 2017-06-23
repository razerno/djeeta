import { combineReducers } from 'redux';
import { commands, prefix } from './bot';
import { servers, playlist, selectedServer } from './player';

export default combineReducers({
  commands,
  prefix,
  servers,
  playlist,
  selectedServer,
})