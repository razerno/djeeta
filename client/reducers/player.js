import * as Action from '../actions/player'

export const servers = (state = {
  isFetching: false,
  ids: [],
}, action) => {
  switch (action.type) {
    case Action.SERVERS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case Action.SERVERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: action.payload.servers,
      };

    case Action.SERVERS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };

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

export const playlistIsFetching = (state = false, action) => {
  switch (action.type) {
    case Action.PLAYLIST_REQUEST:
    case Action.ADD_SONG_REQUEST:
    case Action.MOVE_SONG_REQUEST:
    case Action.DELETE_SONG_REQUEST:
      return true;

    case Action.PLAYLIST_SUCCESS:
      return false;

    case Action.PLAYLIST_FAILURE:
    case Action.ADD_SONG_FAILURE:
    case Action.MOVE_SONG_FAILURE:
    case Action.DELETE_SONG_REQUEST:
      return false;

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