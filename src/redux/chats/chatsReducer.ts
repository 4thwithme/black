import { Dispatch } from "redux";
import { IAction, IChat } from "../types";
import API from "../../api/api";
import normalize from "../../utils/normalize";
import parseLastInteraction from "../../utils/parseLastInteraction";

import { ADD_NEW_MSG } from "../activeChat/activeChatReducer";

const GET_ALL_CHATS = 'GET_ALL_CHATS';

interface IinitState {
  entities: any,
  ids: string[]
};


export const getAllChats = () => async (dispatch: Dispatch) => {
  const res = await API.getAllChats();

  const chats = res.data;

  dispatch({
    type: GET_ALL_CHATS,
    payload: parseLastInteraction(normalize(chats)),
  });
};

const initialState = {
  entities: {},
  ids: []
};

export default (state: IinitState = initialState, { type, payload }: IAction) => {
  switch (type) {
    case GET_ALL_CHATS: {
      return {
        ...state,
        entities: payload.entities,
        ids: payload.ids,
      }
    }

    case ADD_NEW_MSG: {
      const updatedChat = {...payload.chat, lastInteraction: JSON.parse(payload.chat.lastInteraction)};
      
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.chat._id]: updatedChat
        }
      }
    }

    default:
      return state;
  }
}