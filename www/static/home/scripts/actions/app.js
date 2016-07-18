import * as types from '../constants/ActionTypes';
import Cookies from 'js-cookie';

import { constructDesktopAppListUrl } from '../utils/DesktopUtils.js';


const COOKIE_PATH = 'accessToken';
export function fetchApps() {
    const accessToken = Cookies.get(COOKIE_PATH);

    // 登陆
    if (accessToken) {
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

    return dispatch=>receiveAppList({});
}


export function receiveAppList(entities) {
    return {
        type: types.RECEIVE_APP_LIST,
        entities,
    };
}