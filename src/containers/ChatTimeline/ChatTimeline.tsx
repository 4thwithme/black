import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import './ChatTimeline.scss';
import { getChatTimeline } from '../../redux/activeChat/activeChatReducer';
import { IMessage } from '../../redux/types';

import Msg from './Msg';

import { AppState } from '../..';

interface IProps {
  activeChatId: string,
  timeline: IMessage[],
  getChatTimeline: (id: string) => void,
};


const ChatTimeline = (props: IProps) => {
  const [messages, setMessages] = useState <IMessage[]>([]);

  const timelineRef: any = useRef();

  useEffect(() => {
    props.getChatTimeline(props.activeChatId);
  }, []);
  
  useEffect(() => {
    setMessages(props.timeline)
  }, [props.timeline]);
  
  useEffect(() => {
    timelineRef.current.scrollTop = timelineRef.current.scrollHeight;
  }, [messages.length]);

  return (
    <section ref={timelineRef} className="chat-timeline">
      <ul className="chat-timeline-list">
        {messages.length
          ? messages.map(message => {
            return (
              <Msg key={message._id} message={message} />
            );
          })
          : null
        }
      </ul>
    </section>
  );
};
const mapStateToProps = (state: AppState, ownProps: any) => ({
  timeline: state.activeChat.timeline,
});

const mapDispatchToProps = {
  getChatTimeline,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatTimeline);
