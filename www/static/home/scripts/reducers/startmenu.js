import * as types from '../constants/ActionTypes';


export default function startmenu(state = null, action) {
  switch (action.type) {
    case types.CHANGE_STARTMENU:
      return action.startmenu;
    default:
      return state;
  }
}
