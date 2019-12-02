import { combineReducers } from "redux";
import activeWindow from './activeWindow/activeWindowReducer';
import auth from './auth/authReducer';
import users from './users/userReducer';
import chats from './chats/chatsReducer';
import activeChat from './activeChat/activeChatReducer';

export default combineReducers({
  activeWindow,
  auth,
  users,
  chats,
  activeChat,
});