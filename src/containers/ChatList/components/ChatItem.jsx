import React from 'react';
import { connect } from 'react-redux';

import showTimelineDate from '../../../utils/convertDate'
import setAvatar from '../../../utils/setAvatar';
import './ChatItem.scss';
import LazyLoadImage from '../../../components/LazyLoadImage/LazyLoadImage';


const ChatItem = ({ chat, setActiveChatId, currentUserId, ...props }) => {
  console.log('CHAT ITEM RENDER', { chat, setActiveChatId, ...props });

  const renderLastMsg = (lastMsg) => {
    if (currentUserId === lastMsg.senderId) {
      return 'You: ' + lastMsg.body;
    }
    else {
      return lastMsg.body
    }
  };

  const setChatName = () => {
    switch (chat.chatType) {
      case 1: {
        const secondUserId = chat.participants.find(id => id !== currentUserId); 
        return chat.users && chat.users[secondUserId].name;
      }
      default:
        return chat.chatName;
    }
  };

  return (
    <li
      onClick={() => setActiveChatId(props.item)}
      className="chat-list-item">
      <div className="chat-list-item__ava-wrap">
        <LazyLoadImage src={setAvatar(chat)} />
      </div>

      <div className="chat-list-item__info-block">
        <span className="chat-list-item__chat-name">
          {chat
            ? setChatName()
            : 'Chat name loading...'
          }
        </span>

        <span className="chat-list-item__last-msg">
          {chat && chat.lastInteraction && chat.lastInteraction.data
            ? renderLastMsg(chat.lastInteraction.data)
            : 'Chat is empty...'
          }
        </span>
      </div>

      <div className="chat-list-item__utils-block">
        <span className="chat-list-item__time">
          {chat && chat.lastInteraction && chat.lastInteraction.date
            ? showTimelineDate(chat.lastInteraction.date)
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
  currentUserId: state.auth.currentUser._id,
});

export default connect(mapStateToProps)(ChatItem);
