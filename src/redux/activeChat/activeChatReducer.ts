import { Dispatch } from "redux";

import API from "../../api/api";

import { IAction, INewMsg } from "../types";

import { TIMELINE_MSG_LIMIT } from "../../api/const";
export const SET_ACTIVE_CHAT_ID = 'SET_ACTIVE_CHAT_ID';
export const SET_CHAT_TIMELINE = 'SET_CHAT_TIMELINE';
export const ADD_NEW_MSG = 'ADD_NEW_MSG';
export const UPDATE_CHAT_TIMELINE = 'UPDATE_CHAT_TIMELINE';


export const setActiveChatId = (id: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_ACTIVE_CHAT_ID,
    payload: id
  });

  localStorage.setItem('activeChatId', id);
};

export const getChatTimeline = (chatId: string) => async (dispatch: Dispatch) => {
  const timeline = await API.getChatTimeline(chatId, TIMELINE_MSG_LIMIT, 0);

  dispatch({
    type: SET_CHAT_TIMELINE,
    payload: timeline.data,
  });
};

export const updateChatTimeline = (chatId: string, limit: number, offset: number) => async (dispatch: Dispatch) => {
  const timeline = await API.getChatTimeline(chatId, limit, offset);

  dispatch({
    type: UPDATE_CHAT_TIMELINE,
    payload: timeline.data,
  });
};

export const addNewMsgToActiveChat = (data: INewMsg) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_NEW_MSG,
    payload: data,
  })
};

const initialState = {
  activeChatId: null,
  msgForSend: null,
  timeline: [],
};

export default (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case SET_ACTIVE_CHAT_ID: {
      return {
        ...state,
        activeChatId: payload,
      }
    }

    case SET_CHAT_TIMELINE: {
      return {
        ...state,
        timeline: payload,
      }
    }
    case UPDATE_CHAT_TIMELINE: {
      return {
        ...state,
        timeline: [...payload, ...state.timeline],
      }
    }

    case ADD_NEW_MSG: {
      return {
        ...state,
        timeline: [...state.timeline, payload.msg]
      }
    }

    default:
      return state;
  }
}
