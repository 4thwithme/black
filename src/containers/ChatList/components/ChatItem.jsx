import React from 'react';
import { connect } from 'react-redux';

import setAvatar from '../../../utils/setAvatar';
import './ChatItem.scss';

import LazyLoadImage from '../../../components/LazyLoadImage/LazyLoadImage';


const ChatItem = ({ chat, ...props }) => {
  console.log('CHAT ITEM RENDER');

  return (
    <li className="chat-list-item">
      <div className="chat-list-item__ava-wrap">
        <LazyLoadImage src={setAvatar(chat)} />
      </div>

      <div className="chat-list-item__info-block">
        <span className="chat-list-item__chat-name">
          {chat
            ? chat.chatName
            : 'Chat name loading...'
          }
        </span>

        <span className="chat-list-item__last-msg">
          {chat && chat.lastInteraction && chat.lastInteraction.body
            ? chat.lastInteraction.body
            : 'Chat is empty...'
          }
        </span>
      </div>

      <div className="chat-list-item__utils-block">
        <span className="chat-list-item__time">
          {chat && chat.lastInteraction && chat.lastInteraction.date
            ? chat.lastInteraction.date
            : '00:00'
          }
        </span>

        {chat && chat.unreadCount
          ? <span className="chat-list-item__unread">{chat.unreadCount}</span>
          : null
        }
      </div>
    </li>
  )
};

const mapStateToProps = (state, ownProps) => ({
  chat: state.chats.entities[ownProps.item],
});

export default connect(mapStateToProps)(ChatItem);
