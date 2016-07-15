import * as types from '../constants/ActionTypes';
import { constructDesktopAppListUrl } from '../utils/DesktopUtils.js';

export function fetchApps() {

    return dispatch =>
        fetch(constructDesktopAppListUrl())
            .then(response => response.json())
            .then(json => {
                dispatch(receiveAppList(json));
            })
            .catch(err => {
                throw err;
            });
}


export function receiveAppList(entities) {
    return {
        type: types.RECEIVE_APP_LIST,
        entities,
    };
}