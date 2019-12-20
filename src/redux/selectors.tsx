import { createSelector } from 'reselect';

import { AppState } from "..";

export const getCurrentUserId = (state: AppState) => state.auth.currentUser && state.auth.currentUser._id;

export const getUsersForChat = createSelector(
  (state: AppState, senderId: string) => state.users.entities[senderId],
  (state: AppState, senderId: string) => state.auth.currentUser,
  (state: AppState, senderId: string) => senderId,

  (participant, currentUser, senderId) => {
    if (!participant && currentUser._id !== senderId) {
      return {};
    }

    if (!participant && currentUser._id === senderId) {
      return currentUser;
    }

    if (participant) {
      return participant;
    }
  }
);

