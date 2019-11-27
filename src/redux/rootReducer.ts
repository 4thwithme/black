import { combineReducers } from "redux";
import activeWindow from './activeWindow/activeWindow';
import auth from './auth/authReducer';

export default combineReducers({
  activeWindow,
  auth,
});