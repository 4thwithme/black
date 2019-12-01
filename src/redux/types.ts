export interface IAction {
  type: string,
  payload?: any,
};

export interface IUserLogin {
  name: string,
  'x-dark-token': string,
};

export interface IUser {
  name: string,
  _id: string,
  isOnline: boolean,
  ava: string,
}

export interface IChat {
  participants: number[],
  ava: string,
  unreadCount: number,
  lastInteraction: string,
  chatName: string,
  chatType: number,
}