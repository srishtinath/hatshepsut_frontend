import { combineReducers } from 'redux';
// import { foodReducer } from './rooms';
import { userReducer } from './user'
import { cluelistReducer } from './cluelist'

export default combineReducers({
  cluelistInformation: cluelistReducer,
  userInformation: userReducer
});
