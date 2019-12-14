import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import './ChatTimeline.scss';
import { 
  getChatTimeline, 
  updateChatTimeline 
} from '../../redux/activeChat/activeChatReducer';
import { TIMELINE_MSG_LIMIT } from '../../api/const';

import Msg from './Msg';

import { IMessage } from '../../redux/types';
import { AppState } from '../..';
import usePrev from '../../customHooks/usePrev';

interface IProps {
  activeChatId: string,
  timeline: IMessage[],
  getChatTimeline: (id: string) => void,
  updateChatTimeline: (id: string, limit: number, offset: number) => void,
};

const ChatTimeline = (props: IProps) => {
  const [messages, setMessages] = useState <IMessage[]>([]);
  const [pending, setPending] = useState<boolean>(false);

  const timelineRef: any = useRef();

  const prevMsgCount = usePrev(messages.length);

  useEffect(() => {
    props.getChatTimeline(props.activeChatId);
  }, []);
  
  useEffect(() => {
    setMessages(props.timeline)
  }, [props.timeline]);
  
  useEffect(() => {
    if (prevMsgCount === 0 || (messages.length - prevMsgCount) === 1) {
      timelineRef.current.scrollTop = timelineRef.current.scrollHeight;
    }
    setPending(false);
  }, [messages.length]);

  const handleScroll = () => {
    console.log(timelineRef.current.scrollTop)
    if (timelineRef.current.scrollHeight && timelineRef.current.scrollTop < 400 && !pending) {
      setPending(true);
      props.updateChatTimeline(props.activeChatId, TIMELINE_MSG_LIMIT, messages.length);
    }
  };

  return (
    <section onScroll={handleScroll} ref={timelineRef} className="chat-timeline">
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
  updateChatTimeline,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatTimeline);
