import { combineReducers } from 'redux';
import { commands, prefix } from './bot';

export default combineReducers({
  commands,
  prefix
})