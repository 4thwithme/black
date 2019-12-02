import { AppState } from "..";

export const getCurrentUserId = (state: AppState) => state.auth.currentUser && state.auth.currentUser._id;