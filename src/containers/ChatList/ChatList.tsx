import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../..';
import './ChatList.scss';

import List from '../../components/List/List';
import ChatItem from './components/ChatItem';
import Header from '../Header/Header';


const ChatList = ({ chatsIds, ...props }: any) => {
  const [ids, setIds] = useState([])

  useEffect(() => {
    setIds(chatsIds);
  }, [chatsIds])

  return (
    <aside className="aside-chats">
      <Header handleAuthLogout={props.handleAuthLogout} />

      <List
        listItems={ids}
        component={ChatItem}
        className="chat-list" />
    </aside>
  );
};

const mapStateToProps = (state: AppState) => ({
  chatsIds: state.chats.ids,
})

export default connect(mapStateToProps)(ChatList);
