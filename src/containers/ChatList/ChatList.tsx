import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import './ChatList.scss';
import { setActiveChatId } from '../../redux/activeChat/activeChatReducer';

import List from '../../components/List/List';
import ChatItem from './components/ChatItem';
import Header from '../Header/Header';
import { handleAuthLogout } from '../../redux/auth/authReducer';
import Searcher from '../../components/Searcher/Searcher';
import UserItem from './components/UserItem';

import { AppState } from '../..';
import { IUser, IChat } from '../../redux/types';

interface IProps {
  chatsIds: string[],
  setActiveChatId: (id: string) => void,
  handleAuthLogout: () => void,
}

const ChatList = ({ chatsIds, ...props }: IProps) => {
  const [ids, setIds] = useState<string[]>([]);
  const [searchState, setSearchState] = useState<IUser[] | IChat[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setIds(chatsIds);
  }, [chatsIds]);

  const memorizedSetActiveChatId = useCallback((id: string) => props.setActiveChatId(id), []);

  return (
    <aside className="aside-chats">
      <Header handleAuthLogout={props.handleAuthLogout} />

      <Searcher 
        query={query}
        setQuery={setQuery}
        setSearchState={setSearchState} 
        classNamePrefix="searcher"/>


        <List
          listItems={query.length ? searchState : ids}
          component={query.length ? UserItem : ChatItem}
          listItemProps={{
            setActiveChatId: memorizedSetActiveChatId,
          }}
          className="chat-list" />
      
    </aside>
  );
};

const mapStateToProps = (state: AppState) => ({
  chatsIds: state.chats.ids,
});

const mapDispatchToProps = {
  setActiveChatId,
  handleAuthLogout,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
