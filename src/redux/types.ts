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
  _id: string,
  chatType: number,
}

export interface IMessageData {
  body: string,
  chatId: string,
  senderId: string,
}

export interface IMessage {
  data: IMessageData,
  type: string,
  date: number,
  _id: string,
}