import * as Action from '../actions/auth'
import { combineReducers } from 'redux';

const hasAuthToken = (state = false, action) => {
  switch (action.type) {
    case Action.LOG_OUT_SUCCESS:
      return false;

    default:
      return state;
  }
}

const user = (state = {}, action) => {
  switch (action.type) {
    case Action.LOG_OUT_SUCCESS:
      return {};

    default:
      return state;
  }
}

export const auth = combineReducers({
  hasAuthToken,
  user,
})