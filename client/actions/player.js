import { CALL_API } from 'redux-api-middleware'

export const SERVERS_REQUEST = 'SERVERS_REQUEST';
export const SERVERS_SUCCESS = 'SERVERS_SUCCESS';
export const SERVERS_FAILURE = 'SERVERS_FAILURE';

export const fetchServers = () => {
  return dispatch => {
    dispatch({
      [CALL_API]: {
        endpoint: '/player',
        method: 'GET',
        types: [ SERVERS_REQUEST, SERVERS_SUCCESS, SERVERS_FAILURE ],
      }
    })
  }
}

export const PLAYLIST_REQUEST = 'PLAYLIST_REQUEST';
export const PLAYLIST_SUCCESS = 'PLAYLIST_SUCCESS';
export const PLAYLIST_FAILURE = 'PLAYLIST_FAILURE';

export const fetchPlaylist = id => {
  return dispatch => {
    dispatch({
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
        ]
      }
    })
  }
}

export const SELECT_SERVER = 'SELECT_SERVER';

export const selectServer = id => {
  return { type: SELECT_SERVER, id };
}