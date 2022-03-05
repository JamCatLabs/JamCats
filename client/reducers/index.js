import { combineReducers } from 'redux';

import jamSessionsReducer from './jamSessionsReducer';

const reducers = combineReducers({
  jamSessions: jamSessionsReducer
});

export default reducers;