import * as types from '../constants/ActionTypes';

const initialState = {
  items: []
};


export default function applists(state = initialState, action) {

  switch (action.type) {
    case types.RECEIVE_APP_LIST:
      return Object.assign({}, state, {
        items: action.entities.data,
      });

    default:
      return state;
  }
}
