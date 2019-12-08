import { Dispatch } from "redux";
import { IAction } from "../types";
import API from "../../api/api";

const SET_ACTIVE_CHAT_ID = 'SET_ACTIVE_CHAT_ID';
const SET_CHAT_TIMELINE = 'SET_CHAT_TIMELINE';



export const setActiveChatId = (id: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_ACTIVE_CHAT_ID,
    payload: id
  });
};

export const getChatTimeline = (chatId: string) => async (dispatch: Dispatch) => {
  const timeline = await API.getChatTimeline(chatId);

  dispatch({
    type: SET_CHAT_TIMELINE,
    payload: timeline
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

    default:
      return state;
  }
}