import * as types from '../constants/ActionTypes';
import Cookies from 'js-cookie';

import { constructDesktopAppListUrl,constructProxyListUrl } from '../utils/DesktopUtils.js';


const COOKIE_PATH = 'accessToken';
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


export function fetchProxys() {
    return dispatch =>
        fetch(constructProxyListUrl(), {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json => {
                dispatch(receiveProxysList(json));
            })
            .catch(err => {
                throw err;
            });
}

export function receiveProxysList(entities) {
    return {
        type: types.RECEIVE_PROXY_LIST,
        entities,
    };
}


export function fetchProxysAdd(data) {

    return dispatch =>
        fetch(constructProxyListUrl() + '/add', {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            credentials: 'include',
            body: data
        })
            .then(response => response.json())
            .then(json => {
                dispatch(receiveProxysAdd(json));
            })
            .catch(err => {
                throw err;
            });


}

export function receiveProxysAdd(entities) {
    return {
        type: types.RECEIVE_PROXY_ADD,
        entities,
    };
}


export function fetchProxysDel(id) {

    return dispatch =>
        fetch(constructProxyListUrl() + '/del?id=' + id, {
            credentials: 'include',
        })
            .then(response => response.json())
            .then(json => {
                dispatch(receiveProxysDel(json));
            })
            .catch(err => {
                throw err;
            });


}

export function receiveProxysDel(entities) {
    return {
        type: types.RECEIVE_PROXY_DEL,
        entities,
    };
}