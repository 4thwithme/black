import React from 'react';

import './ChatWindow.scss';
import ChatInput from '../ChatInput/ChatInput';
import ChatTimeline from '../ChatTimeline/ChatTimeline';


const ChatWindow = () => {

  return (
    <section className="chat-window">
      <ChatTimeline />

      <ChatInput />
    </section>
  );
};

export default ChatWindow;
