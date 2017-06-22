import * as Action from '../actions/bot'

export const commands = (state = [], action) => {
  switch (action.type) {
    case Action.COMMANDS_SUCCESS:
      return action.commands;

    default:
      return state;
  }
}