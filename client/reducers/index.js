import { combineReducers } from 'redux';
import { commands, prefix, avatar } from './bot';
import { servers, playlist, selectedServer } from './player';
import { auth } from './auth';
import { reducer as toastr } from 'react-redux-toastr'

export default combineReducers({
  commands,
  prefix,
  avatar,
  servers,
  playlist,
  selectedServer,
  auth,
  toastr,
})