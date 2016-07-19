import * as types from '../constants/ActionTypes';
import Cookies from 'js-cookie';


const COOKIE_PATH = 'accessToken';

export function loginUser() {
    //Cookies.remove(COOKIE_PATH)
    let accessToken = Cookies.get(COOKIE_PATH);

    return {
        type: types.RECEIVE_ACCESS_TOKEN,
        accessToken
    };
}