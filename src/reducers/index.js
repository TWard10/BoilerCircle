import { combineReducers } from 'redux';
import sessionReducer from './sessions';
import userReducer from './user';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
});

export default rootReducer;
