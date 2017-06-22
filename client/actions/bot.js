import { CALL_API } from 'redux-api-middleware';

export const COMMANDS_REQUEST = 'COMMANDS_REQUEST';
export const COMMANDS_SUCCESS = 'COMMANDS_SUCCESS';
export const COMMANDS_FAILURE = 'COMMANDS_FAILURE';

export const fetchCommands = () => {
  return (dispatch) => {
    dispatch({
      [CALL_API]: {
        endpoint: '/bot/commands',
        method: 'GET',
        types: [ COMMANDS_REQUEST, COMMANDS_SUCCESS, COMMANDS_FAILURE ],
      }
    });
  }
}

export const PREFIX_REQUEST = 'PREFIX_REQUEST';
export const PREFIX_SUCCESS = 'PREFIX_SUCCESS';
export const PREFIX_FAILURE = 'PREFIX_FAILURE';

export const fetchPrefix = () => {
  return dispatch => {
    dispatch({
      [CALL_API]: {
        endpoint: '/bot/prefix',
        method: 'GET',
        types: [ PREFIX_REQUEST, PREFIX_SUCCESS, PREFIX_FAILURE ],
      }
    })
  }
}