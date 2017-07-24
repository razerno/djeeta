import { CALL_API } from 'redux-api-middleware';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const logOut = () => {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        endpoint: '/auth/token/revoke',
        method: 'GET',
        types: [ LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE ],
        credentials: 'same-origin',
      }
    });
  }
}