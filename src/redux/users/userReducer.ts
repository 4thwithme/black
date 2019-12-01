import API from "../../api/api";
import normalize from "../../utils/normalize";

import { Dispatch } from "redux";
import { IAction } from "../types";

const GET_ALL_USERS = 'GET_ALL_USERS';


export const getAllUsers = () => async (dispatch: Dispatch) => {
  const res = await API.getAllUsers();

  const users = res.data;

  dispatch({
    type: GET_ALL_USERS,
    payload: normalize(users),
  });
};

const initialState = {
  entities: {},
  ids: []
};

export default (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case GET_ALL_USERS: {
      return {
        ...state,
        entities: payload.entities,
        ids: payload.ids,
      }
    }

    default:
      return state;
  }
}