export interface IAction {
  type: string,
  payload?: any,
};

export interface IUser {
  name: string,
  'x-dark-token': string,
};