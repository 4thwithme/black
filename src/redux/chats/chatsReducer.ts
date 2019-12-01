import { Dispatch } from "redux";
import { IAction } from "../types";
import API from "../../api/api";
import normalize from "../../utils/normalize";

const GET_ALL_CHATS = 'GET_ALL_CHATS';


export const getAllChats = () => async (dispatch: Dispatch) => {
  const res = await API.getAllChats();

  const chats = res.data;

  dispatch({
    type: GET_ALL_CHATS,
    payload: normalize(chats),
  });
};

const initialState = {
  entities: {},
  ids: []
};

export default (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case GET_ALL_CHATS: {
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