export const COMMANDS_REQUEST = 'COMMANDS_REQUEST'
export const COMMANDS_SUCCESS = 'COMMANDS_SUCCESS'
export const COMMANDS_FAILURE = 'COMMANDS_FAILURE'

const commandsRequest = () => {
  return {
    type: COMMANDS_REQUEST
  };
}

const commandsSuccess = (commands) => {
  return {
    type: COMMANDS_SUCCESS,
    commands
  }
}

const commandsFailure = () => {
  return {
    type: COMMANDS_FAILURE
  }
}

export const fetchCommands = () => {
  return (dispatch) => {
    dispatch(commandsRequest());

    fetch('/bot/commands')
      .then(res => res.json())
      .then(json => {
        dispatch(commandsSuccess(json.commands));
      })
      .catch(() => {
        dispatch(commandsFailure());
      });
  }
}
