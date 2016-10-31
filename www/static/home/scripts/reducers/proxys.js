import * as types from '../constants/ActionTypes';

const initialState = {
    items: [],
    add: [],
    edit: [],
    del: []
};


export default function proxys(state = initialState, action) {
    switch (action.type) {
        case types.RECEIVE_PROXY_LIST:
            return Object.assign({}, state, {
                items: action.entities.data,
            });

        case types.RECEIVE_PROXY_ADD:
            return Object.assign({}, state, {
                add: action.entities.data,
            });

        case types.RECEIVE_PROXY_EDIT:
            return Object.assign({}, state, {
                edit: action.entities.data,
            });

        case types.RECEIVE_PROXY_DEL:
            return Object.assign({}, state, {
                del: action.entities.data,
            });

        case types.RECEIVE_PROXY_STATUS:
            return Object.assign({}, state, {status: action.entities.data});

        default:
            return state;
    }
}
