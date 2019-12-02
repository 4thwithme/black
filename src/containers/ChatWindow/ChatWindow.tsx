import React from 'react';

import './ChatWindow.scss';
import ChatInput from '../ChatInput/ChatInput';
import ChatTimeline from '../ChatTimeline/ChatTimeline';


interface IProps {
  // activeChat: string,
  sendMsg: (activeChatId: string, msg: string, senderId: string) => void
}

const ChatWindow = (props: IProps) => {

  return (
    <section className="chat-window">
      <ChatTimeline />

      <ChatInput sendMsg={props.sendMsg} />
    </section>
  );
};

export default ChatWindow;
