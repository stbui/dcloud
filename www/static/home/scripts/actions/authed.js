import * as types from '../constants/ActionTypes';
import Cookies from 'js-cookie';


const COOKIE_PATH = 'accessToken';

export function loginUser() {
    Cookies.set(COOKIE_PATH, 1);
    //Cookies.remove(COOKIE_PATH)

    return {
        type: types.RECEIVE_ACCESS_TOKEN
    };
}