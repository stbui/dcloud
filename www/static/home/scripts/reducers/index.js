import { combineReducers } from 'redux';

import applists from '../reducers/applists';
import startmenu from '../reducers/startmenu';


const rootReducer = combineReducers({
  applists,
  startmenu
});

export default rootReducer;
