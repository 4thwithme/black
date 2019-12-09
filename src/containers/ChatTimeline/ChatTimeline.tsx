import React, { useEffect, useState, useRef, MutableRefObject } from 'react';
import { connect } from 'react-redux';

import './ChatTimeline.scss';
import { getChatTimeline } from '../../redux/activeChat/activeChatReducer';
import { IMessage } from '../../redux/types';
import LazyLoadImage from '../../components/LazyLoadImage/LazyLoadImage';
import setAvatar from '../../utils/setAvatar';

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
  }, [messages.length])

  return (
    <section ref={timelineRef} className="chat-timeline">
      <ul className="chat-timeline-list">
        {messages.length
          ? messages.map(message => {
            return (
              <li key={message._id} className="chat-timeline-list__item">
                <section className="chat-timeline-list__msg-wrap">
                  <div className="chat-timeline-list__ava-wrp">
                    {/* <LazyLoadImage src={setAvatar()} /> */}
                    <img src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1349,w_2400,x_0,y_125/f_auto,q_auto,w_1100/v1572281013/shape/mentalfloss/gettyimages-667379888.jpg" alt=""/>
                  </div>

                  <div className="chat-timeline-list__info-block">
                    <span className="chat-timeline-list__name">Pisuniara ebanaya</span>
                    <span className="chat-timeline-list__time">{new Date(message.date).getHours()+':'+ new Date(message.date).getMinutes()}</span>
                  </div>

                  <p className="chat-timeline-list__msg-body">
                    {message.data.body}
                  </p>
                </section>
              </li>
            );
          })
          : null
        }
      </ul>
    </section>
  );
};
const mapStateToProps = (state: AppState) => ({
  timeline: state.activeChat.timeline,
});

const mapDispatchToProps = {
  getChatTimeline,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatTimeline);
