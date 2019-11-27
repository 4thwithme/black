import { Dispatch } from "redux";
import { IAction } from "../types";

const SET_CURRENT_WINDOW = 'SET_CURRENT_WINDOW';


export const setCurrentWindow = (path: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_CURRENT_WINDOW,
    payload: path
  });
};

const initialState = {
  path: '/login',
};

export default (state = initialState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_WINDOW:
      return {
        ...state,
        path: payload,
      }

    default:
      return state;
  }
}