import { combineReducers } from 'redux';

import applists from '../reducers/applists';
import startmenu from '../reducers/startmenu';
import navigator from '../reducers/navigator';


const rootReducer = combineReducers({
  applists,
  startmenu,
  navigator
});

export default rootReducer;
