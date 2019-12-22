export default (obj: any) => {
  switch (obj.chatType) {
    case 1:
      return "./media/bookmark.png";
    default:
      break;
  }
  return obj.ava || "https://images2.minutemediacdn.com/image/upload/c_crop,h_1349,w_2400,x_0,y_125/f_auto,q_auto,w_1100/v1572281013/shape/mentalfloss/gettyimages-667379888.jpg";
}
