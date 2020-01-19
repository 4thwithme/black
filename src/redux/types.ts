export interface IAction {
  type: string;
  payload?: any;
}

export interface IUserLogin {
  name: string;
  "x-dark-token": string;
  settings?: any;
  _id: string;
}

export interface IUser {
  name: string;
  _id: string;
  isOnline: boolean;
  ava: string;
}

export interface IChat {
  participants: number[];
  ava: string;
  unreadCount: number;
  lastInteraction: string;
  chatName: string;
  _id: string;
  chatType: number;
}

export interface IMessageData {
  body: string;
  chatId: string;
  senderId: string;
}

export interface IMessage {
  data: IMessageData;
  type: string;
  date: number;
  _id: string;
}

export interface INewMsg {
  msg: IMessage;
  chat: IChat;
}

export interface INewChat {
  chat: IChat;
  participantsObjects: IUser[];
}

export interface IDataItem<T> {
  [key: string]: T; // id
}

export interface IEntities<T> {
  [key: string]: IDataItem<T>;
}

export interface INormalizeResult<T> {
  entities: IEntities<T>;
  ids: T[];
}
