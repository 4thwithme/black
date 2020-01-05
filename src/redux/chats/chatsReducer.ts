import { Dispatch } from "redux";
import { IAction, INewChat } from "../types";
import API from "../../api/api";
import normalize from "../../utils/normalize";
import parseLastInteraction from "../../utils/parseLastInteraction";

import { ADD_NEW_MSG } from "../activeChat/activeChatReducer";
import { GET_ALL_USERS } from "../users/userReducer";

export const GET_ALL_CHATS = "GET_ALL_CHATS";
export const ADD_NEW_CHAT = "ADD_NEW_CHAT";

interface IinitState {
  entities: any;
  ids: string[];
}

export const getAllChats = () => async (dispatch: Dispatch) => {
  const res = await API.getAllChats();

  const chats = res.data;

  dispatch({
    type: GET_ALL_CHATS,
    payload: parseLastInteraction(normalize(chats))
  });
};

export const addNewChat = (data: any) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_NEW_CHAT,
    payload: {
      chat: normalize([data.chat]),
      users: normalize(data.participantsObjects)
    }
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
        ids: payload.ids
      };
    }

    case ADD_NEW_CHAT: {
      const updatedChat = {
        ...payload.chat.entities[payload.chat.ids],
        users: payload.users
      };

      return {
        ...state,
        entities: { ...state.entities, updatedChat },
        ids: [...payload.chat.ids, ...state.ids]
      };
    }

    case ADD_NEW_MSG: {
      const updatedChat = {
        ...payload.chat,
        lastInteraction: JSON.parse(payload.chat.lastInteraction)
      };

      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.chat._id]: updatedChat
        }
      };
    }

    case GET_ALL_USERS: {
      const prevEntites = state.entities;

      state.ids.forEach((chatId) => {
        const users: any = {};

        state.entities[chatId].participants.forEach((userId: string) => {
          users[userId] = payload.entities[userId];
        });

        prevEntites[chatId] = {
          ...prevEntites[chatId],
          users
        };
      });

      return {
        ...state,
        entities: prevEntites
      };
    }

    default:
      return state;
  }
};
