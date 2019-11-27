import { Dispatch } from "redux";
import { IAction, IUser } from "../types";

const AUTH_LOGIN = 'AUTH_LOGIN';


export const handleAuthLogin = (currentUser: IUser) => (dispatch: Dispatch) => {
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

const initialState = {
  currentUser: null
};

export default (state = initialState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_LOGIN: {
      return {
        ...state,
        currentUser: payload,
      }
    }
    case AUTH_LOGIN: {
      return {
        ...state,
        currentUser: null
      }
    }

    default:
      return state;
  }
}