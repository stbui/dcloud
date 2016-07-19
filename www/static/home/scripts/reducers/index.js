import { combineReducers } from 'redux';

import applists from '../reducers/applists';
import startmenu from '../reducers/startmenu';
import navigator from '../reducers/navigator';
import authed from '../reducers/authed';
import proxys from '../reducers/proxys';


const rootReducer = combineReducers({
    applists,
    startmenu,
    navigator,
    authed,
    proxys
});

export default rootReducer;
