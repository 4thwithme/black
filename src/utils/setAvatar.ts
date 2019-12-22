export default (obj: any) => {
  if (obj.ava) return obj.ava;
  
  switch (obj.chatType) {
    case 0:
      return "./media/bookmark.png";
    default:
      return "./media/default.png"
  }
}
