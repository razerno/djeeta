import * as Action from '../actions/player'

export const servers = (state = {}, action) => {
  switch (action.type) {
    case Action.SERVERS_SUCCESS:
      return action.payload.servers;

    default:
      return state;
  }
}

export const playlist = (state = {}, action) => {
  switch (action.type) {
    case Action.PLAYLIST_SUCCESS:
      return Object.assign({}, state, { [action.meta.id]: action.payload });

    default:
      return state;
  }
}

export const selectedServer = (state = 0, action) => {
  switch (action.type) {
    case Action.SELECT_SERVER:
      return action.id;

    default:
      return state;
  }
}