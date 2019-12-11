import React from 'react';
import { connect } from 'react-redux';

import setAvatar from '../../utils/setAvatar';
import { getUsersForChat } from '../../redux/selectors';
import  showTimelineDate  from '../../utils/convertDate'

import { IMessage, IUser } from '../../redux/types';
import { AppState } from '../..';

interface IProps {
  message: IMessage,
  user: IUser,
  currentUser: IUser,
};

const Msg = (props: IProps) => {
  
  const setMsgType = () => {
    if (props.message.data.senderId === props.currentUser._id) {
      return 'out';
    }
    return 'inc';
  };



  return (
    <li key={props.message._id} className="chat-timeline-list__item">
      <section 
        data-msg-type={setMsgType()} 
        className="chat-timeline-list__msg-wrap">
        <div className="chat-timeline-list__ava-wrp">
          <img src={setAvatar(props.user)} alt="user avatar" />
        </div>

        <div className="chat-timeline-list__info-block">
          <span className="chat-timeline-list__name">{props.user.name || 'loading...'}</span>
          <span className="chat-timeline-list__time">{showTimelineDate(props.message.date)}</span>
        </div>

        <p className="chat-timeline-list__msg-body">
          {props.message.data.body}
        </p>
      </section>
    </li>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => ({
  user: getUsersForChat(state, ownProps.message.data.senderId),
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps)(Msg);