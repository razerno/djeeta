import { CALL_API } from 'redux-api-middleware';

export const SERVERS_REQUEST = 'SERVERS_REQUEST';
export const SERVERS_SUCCESS = 'SERVERS_SUCCESS';
export const SERVERS_FAILURE = 'SERVERS_FAILURE';

export const fetchServers = () => {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        endpoint: '/player',
        method: 'GET',
        types: [ SERVERS_REQUEST, SERVERS_SUCCESS, SERVERS_FAILURE ],
      }
    });
  }
}

export const PLAYLIST_REQUEST = 'PLAYLIST_REQUEST';
export const PLAYLIST_SUCCESS = 'PLAYLIST_SUCCESS';
export const PLAYLIST_FAILURE = 'PLAYLIST_FAILURE';

export const fetchPlaylist = id => {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        endpoint: `/player/playlist/${id}`,
        method: 'GET',
        types: [
          PLAYLIST_REQUEST,
          {
            type: PLAYLIST_SUCCESS,
            meta: { id: id },
          },
          PLAYLIST_FAILURE
        ],
      }
    });
  }
}

export const SELECT_SERVER = 'SELECT_SERVER';

export const selectServer = id => {
  return { type: SELECT_SERVER, id };
}

export const ADD_SONG_REQUEST = 'ADD_SONG_REQUEST';
export const ADD_SONG_SUCCESS = 'ADD_SONG_SUCCESS';
export const ADD_SONG_FAILURE = 'ADD_SONG_FAILURE';

export const addSong = (id, url) => {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        endpoint: `/player/playlist/${id}/items`,
        method: 'POST',
        types: [ ADD_SONG_REQUEST, ADD_SONG_SUCCESS, ADD_SONG_FAILURE ],
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({url: url}),
      }
    });
  }
}

export const MOVE_SONG_REQUEST = 'MOVE_SONG_REQUEST';
export const MOVE_SONG_SUCCESS = 'MOVE_SONG_SUCCESS';
export const MOVE_SONG_FAILURE = 'MOVE_SONG_FAILURE';

export const moveSong = (id, songId, newIndex) => {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        endpoint: `/player/playlist/${id}/items/${songId}/move`,
        method: 'POST',
        types: [
          {
            type: MOVE_SONG_REQUEST,
            meta: { songId: songId, newIndex: newIndex },
          },
          MOVE_SONG_SUCCESS,
          MOVE_SONG_FAILURE
        ],
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({newindex: newIndex}),
      }
    });
  }
}

export const DELETE_SONG_REQUEST = 'DELETE_SONG_REQUEST';
export const DELETE_SONG_SUCCESS = 'DELETE_SONG_SUCCESS';
export const DELETE_SONG_FAILURE = 'DELETE_SONG_FAILURE';

export const deleteSong = (id, songId) => {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        endpoint: `/player/playlist/${id}/items/${songId}`,
        method: 'DELETE',
        types: [ DELETE_SONG_REQUEST, DELETE_SONG_SUCCESS, DELETE_SONG_FAILURE ],
      }
    })
  }
}