import { Dispatch } from "redux";
import { IAction, IUserLogin } from "../types";
import { getAllUsers } from "../users/userReducer";
import { getAllChats } from "../chats/chatsReducer";

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const CURRENT_USER_UPDATE = 'CURRENT_USER_UPDATE';

export const handleAuthLogin = (currentUser: IUserLogin) => (dispatch: Dispatch) => {
  if (currentUser) {
    const { ["x-dark-token"]: token } = currentUser;

    delete currentUser["x-dark-token"];

    sessionStorage.setItem('x-dark-token', token);
    localStorage.setItem('user', JSON.stringify(currentUser));
  }
};

export const currentUserUpdate = () => (dispatch: Dispatch) => {
  const user = localStorage.getItem('user');
  const parsedUser = user && JSON.parse(user);

  dispatch({ type: CURRENT_USER_UPDATE, payload: parsedUser });
};

export const handleAuthLogout = () => (dispatch: Dispatch) => {
  sessionStorage.removeItem('x-dark-token');
  window.location.href = '/login';

  dispatch({ type: AUTH_LOGIN });
};

export const initApp = () => (dispatch: any) => {
  console.log('INIT APP STARTED');

  dispatch(getAllUsers());
  dispatch(currentUserUpdate());
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