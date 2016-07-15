import * as types from '../constants/ActionTypes';

export function changeStartMenu(startmenu) {
    return {
        type: types.CHANGE_STARTMENU,
        startmenu
    };
}