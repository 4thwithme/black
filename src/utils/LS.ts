import { IUserLogin } from "../redux/types";

//-------helpers------------------------------
const ls = localStorage;

const stringify = (value: any) => JSON.stringify(value);
const parse = (value: any) => JSON.parse(value);

const currentUserId: string = parse(ls.getItem('currentUserId'));

const getUserStorage = (id?: string) => parse(ls.getItem(`user_${id || currentUserId}`));

//---------for export-------------------------
const authorizeUser = (user: IUserLogin) => {    //register user in LS if doesn't exist or update user info
  const { settings, ...userInfo } = user;

  if (ls.getItem('user_' + userInfo._id)) {
    const currentStorage = getUserStorage(userInfo._id);

    ls.setItem(`currentUserId`, stringify(userInfo._id));
    ls.setItem(`user_${userInfo._id}`, stringify({
      ...currentStorage,
      'user': { ...userInfo },
      'settings': { ...currentStorage.settings, ...settings },
    }));

    return;
  }

  ls.setItem('currentUserId', stringify(userInfo._id));
  ls.setItem(`user_${userInfo._id}`, stringify({ user: userInfo, 'settings': settings }));
};

const setItem = <T>(key: string, value: T) => {                  //set key - value to user_id 
  if (!currentUserId) return;

  const userInfo = getUserStorage();

  ls.setItem(`user_${currentUserId}`, stringify({ ...userInfo, [key]: value }))
};

const deleteItem = (key: string) => {        // delete key-value by key
  const userInfo = getUserStorage();

  delete userInfo[key];

  ls.setItem(`user_${currentUserId}`, stringify(userInfo));
};

const getItem = (key: string) => {                   // get value by key from user_id
  const userInfo = getUserStorage();

  return userInfo
    ? userInfo[key]
    : null;
};

const getAFKTime = (currentTime: number) => {
  const userInfo = getUserStorage();

  const lastInteractionTime = userInfo && userInfo.lastInteractionTime
    ? +userInfo.lastInteractionTime
    : currentTime;

  return (currentTime - lastInteractionTime) / (1000 * 60 * 60);
};


export default {
  authorizeUser,
  setItem,
  getItem,
  deleteItem,
  getAFKTime,
};