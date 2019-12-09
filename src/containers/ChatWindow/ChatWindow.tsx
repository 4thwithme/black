import React from 'react';
import { connect } from 'react-redux';

import './ChatWindow.scss';
import ChatInput from '../ChatInput/ChatInput';
import ChatTimeline from '../ChatTimeline/ChatTimeline';

import { AppState } from '../..';


interface IProps {
  sendMsg: (activeChatId: string, msg: string, senderId: string) => void,
  activeChatId: string,
};

const ChatWindow = (props: IProps) => {
  if (!props.activeChatId) return null;

  return (
    <section className="chat-window">
      <ChatTimeline activeChatId={props.activeChatId} />

      <ChatInput sendMsg={props.sendMsg} />
    </section>
  );
};

const mapStateToProps= (state: AppState) => ({
  activeChatId: state.activeChat.activeChatId,
});

export default connect(mapStateToProps)(ChatWindow);
