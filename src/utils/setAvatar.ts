import { IChat, IUser } from "../redux/types";

export const setChatAva = (obj: IChat) => {
  console.log(obj)
  if (obj.ava) return obj.ava;
  
  switch (obj.chatType) {
    case 0:
      return "./media/bookmark.png";
    default:
      return "./media/default.png"
  }
};

export const setUserAva = (obj: IUser) => {
  if (obj.ava) return obj.ava;
  
  return "./media/default.png";
}

export default (obj: any) => {
  if (obj.chatType !== undefined) return setChatAva(obj);

  return setUserAva(obj);
};
