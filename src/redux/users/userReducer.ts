import API from "../../api/api";
import normalize from "../../utils/normalize";

import { Dispatch } from "redux";
import { IAction } from "../types";
import { ADD_NEW_CHAT } from "../chats/chatsReducer";

export const GET_ALL_USERS = 'GET_ALL_USERS';


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
    case ADD_NEW_CHAT: {
      return {
        ...state,
        entities: {...state.entities, ...payload.chat.entities},
        ids: [...payload.chat.ids, ...state.ids],
      }
    }

    default:
      return state;
  }
}