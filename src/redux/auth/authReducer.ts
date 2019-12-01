import { Dispatch } from "redux";
import { IAction, IUserLogin } from "../types";
import { getAllUsers } from "../users/userReducer";
import { getAllChats } from "../chats/chatsReducer";

export const AUTH_LOGIN = 'AUTH_LOGIN';


export const handleAuthLogin = (currentUser: IUserLogin) => (dispatch: Dispatch) => {
  if (currentUser) {
    sessionStorage.setItem('x-dark-token', currentUser["x-dark-token"]);
  }

  dispatch({
    type: AUTH_LOGIN,
    payload: currentUser
  });
};

export const handleAuthLogout = () => (dispatch: Dispatch) => {
  sessionStorage.removeItem('x-dark-token');
  window.location.href = '/login';

  dispatch({ type: AUTH_LOGIN });
};

export const initApp = () => (dispatch: any) => {
  console.log('INIT APP STARTED');

  dispatch(getAllUsers());
  dispatch(getAllChats());
};

const initialState = {
  currentUser: null
};

export default (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case AUTH_LOGIN: {
      return {
        ...state,
        currentUser: payload,
      }
    }

    default:
      return state;
  }
}