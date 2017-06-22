import * as Action from '../actions/bot'

export const commands = (state = [], action) => {
  switch (action.type) {
    case Action.COMMANDS_SUCCESS:
      return action.payload.commands;

    default:
      return state;
  }
}

export const prefix = (state = '', action) => {
  switch (action.type) {
    case Action.PREFIX_SUCCESS:
      return action.payload.prefix;

    default:
      return state;
  }
}