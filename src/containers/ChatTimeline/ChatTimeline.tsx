import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './ChatTimeline.scss';
import { getChatTimeline } from '../../redux/activeChat/activeChatReducer';

import { AppState } from '../..';

interface IProps {
  activeChatId: string,
  timeline: any[],
}; 

const ChatTimeline = (props: IProps) => {
  useEffect(() => {
    getChatTimeline(props.activeChatId);
  }, []);

  return (
    <section className="chat-timeline">
      Chat is empty....
    </section>
  );
};
const mapStateToProps = (state: AppState) => ({
  timeline: state.activeChat.timeline,
});

export default connect(mapStateToProps)(ChatTimeline);
