import { Dispatch } from "redux";
import { IAction } from "../types";

const SET_MSG_FOR_SEND = 'SET_MSG_FOR_SEND';
const SET_ACTIVE_CHAT_ID = 'SET_ACTIVE_CHAT_ID';



export const setActiveChatId = (id: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_ACTIVE_CHAT_ID,
    payload: id
  });
};

const initialState = {
  activeChatId: null,
  msgForSend: null,
};

export default (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case SET_ACTIVE_CHAT_ID: {
      return {
        ...state,
        activeChatId: payload,
      }
    }

    default:
      return state;
  }
}