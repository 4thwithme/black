import LS from "../../utils/LS";
import API from "../../api/api";
import { getAllUsers } from "../users/userReducer";
import { getAllChats } from "../chats/chatsReducer";
import { setActiveChatId } from "../activeChat/activeChatReducer";

import { Dispatch } from "redux";
import { IAction } from "../types";

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const CURRENT_USER_UPDATE = 'CURRENT_USER_UPDATE';
export const SET_IS_AUTH = 'SET_IS_AUTH';

export const handleAuthLogin = (name: string, pass: string) => async (dispatch: Dispatch) => {
  const res = await API.loginUser(name, pass);
  const currentUser = res.data;

  if (currentUser) {
    const { "x-dark-token": token } = currentUser;

    sessionStorage.setItem('x-dark-token', token);

    delete currentUser["x-dark-token"];

    LS.authorizeUser(currentUser);

    dispatch({ type: SET_IS_AUTH, payload: true });
  }
};

export const currentUserUpdate = () => (dispatch: Dispatch) => {
  const user = LS.getItem('user');

  dispatch({ type: CURRENT_USER_UPDATE, payload: user });
};

export const handleAuthLogout = () => (dispatch: Dispatch) => {
  sessionStorage.removeItem('x-dark-token');
  window.location.href = '/login';
  LS.deleteItem('user');

  dispatch({ type: AUTH_LOGIN });
};

export const initApp = () => (dispatch: any) => {
  console.log('INIT APP STARTED');
  const activeChatId = LS.getItem('activeChatId');

  dispatch(currentUserUpdate());

  dispatch(getAllChats());
  dispatch(getAllUsers());

  if (activeChatId) {
    dispatch(setActiveChatId(activeChatId));
  }
};

const initialState = {
  currentUser: null,
  isAuth: false,
};

export default (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case AUTH_LOGIN: {
      return {
        ...state,
        currentUser: payload,
      }
    }
    case SET_IS_AUTH: {
      return {
        ...state,
        isAuth: payload,
      }
    }
    case CURRENT_USER_UPDATE: {
      return {
        ...state,
        currentUser: payload,
      }
    }

    default:
      return state;
  }
}