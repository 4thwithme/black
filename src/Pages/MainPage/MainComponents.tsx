import React from 'react';

import ChatList from '../../containers/ChatList/ChatList';
import ChatWindow from '../../containers/ChatWindow/ChatWindow';

interface IPropsMainComponents {
  sendMsg: (activeChatId: string, msg: string, senderId: string) => void,
};


const MainComponents = (props: IPropsMainComponents) => (
  <>
    <ChatList />

    <ChatWindow sendMsg={props.sendMsg} />
  </>
);

export default MainComponents;
