import * as Action from '../actions/player';
import { arrayMove } from 'react-sortable-hoc';

export const servers = (state = {
  isFetching: false,
  list: [],
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
        list: action.payload.servers,
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

export const playlist = (state = {
  isFetching: false,
  isMoving: false,
  beforeMove: {},
  current: {},
}, action) => {
  switch (action.type) {
    case Action.PLAYLIST_REQUEST:
    case Action.ADD_SONG_REQUEST:
    case Action.DELETE_SONG_REQUEST:
      return {
        ...state,
        isFetching: true,
      }

    case Action.MOVE_SONG_REQUEST:
      const oldIndex = state.current.queue.findIndex(element => {return element.id == action.meta.songId});
      return {
        ...state,
        isMoving: true,
        beforeMove: state.current,
        current: { id: state.current.id, queue: arrayMove(state.current.queue, oldIndex, action.meta.newIndex) }
      }

    case Action.SERVERS_SUCCESS:
      if (action.payload.servers.find(server => {return server.id == state.current.id})) {
        return state;
      } else {
        return {
          ...state,
          isFetching: false,
          isMoving: false,
          beforeMove: {},
          current: {},
        };
      }

    case Action.PLAYLIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isMoving: false,
        beforeMove: {},
        current: action.payload,
      }

    case Action.PLAYLIST_FAILURE:
    case Action.ADD_SONG_FAILURE:
    case Action.DELETE_SONG_FAILURE:
      return {
        ...state,
        isFetching: false,
      }

    case Action.MOVE_SONG_FAILURE:
      if (state.isMoving) {
        return {
          ...state,
          isMoving: false,
          beforeMove: {},
          current: state.beforeMove,
        }
      } else {
        return state;
      }

    default:
      return state;
  }
}

export const selectedServer = (state = 0, action) => {
  switch (action.type) {
    case Action.SELECT_SERVER:
      return action.id;

    case Action.SERVERS_SUCCESS:
      if (action.payload.servers.find(server => {return server.id == state})) {
        return state;
      } else {
        return 0;
      }

    default:
      return state;
  }
}