import React, { useState, useEffect, useCallback, useRef, MutableRefObject } from "react";
import { connect } from "react-redux";

import "./ChatList.scss";
import { setActiveChatId } from "../../redux/activeChat/activeChatReducer";
import Header from "../Header/Header";
import { handleAuthLogout } from "../../redux/auth/authReducer";
import Searcher from "../../components/Searcher/Searcher";
import UserItem from "./components/UserItem";
import throttle from "../../utils/throttle";
import API from "../../api/api";
import { USER_SEARCH_LIMIT } from "../../api/const";

import List from "../../components/List/List";
import ChatItem from "./components/ChatItem";

import { AppState } from "../..";
import { IUser, IChat } from "../../redux/types";

interface IProps {
  chatsIds: string[];
  setActiveChatId: (id: string) => void;
  handleAuthLogout: () => void;
}

const ChatList = ({ chatsIds, ...props }: IProps) => {
  const [ids, setIds] = useState<string[]>([]);
  const [searchState, setSearchState] = useState<IUser[] | IChat[]>([]);
  const [query, setQuery] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);

  const asideRef: MutableRefObject<any> = useRef();

  useEffect(() => {
    setIds(chatsIds);
  }, [chatsIds]);

  const memorizedSetActiveChatId = useCallback((id: string) => props.setActiveChatId(id), []);

  const throttledGetParticipantsByQuery = useCallback(
    throttle(
      (query, offset) =>
        API.getParticipantsByQuery(query, 20, offset)
          .then((res) => setSearchState(res.data))
          .catch(console.error),
      400
    ),
    []
  );

  useEffect(() => setPending(false), [searchState.length]);

  useEffect(() => {
    if (query.length > 1) {
      throttledGetParticipantsByQuery(query);
    }
  }, [query, query.length, throttledGetParticipantsByQuery]);

  const handleScroll = () => {
    console.log(
      asideRef.current.scrollHeight,
      asideRef.current.scrollHeight - asideRef.current.scrollTop - asideRef.current.clientHeight
    );
    if (
      asideRef.current.scrollHeight &&
      asideRef.current.scrollHeight - asideRef.current.scrollTop - asideRef.current.clientHeight <
        400 &&
      !pending
    ) {
      const offset = searchState.length;
      setPending(true);

      API.getParticipantsByQuery(query, USER_SEARCH_LIMIT, offset)
        .then((res) => {
          setSearchState([...searchState, ...res.data]);
          console.log("zapros");
        })
        .catch(console.error);
    }
  };

  return (
    <aside onScroll={handleScroll} ref={asideRef} className='aside-chats'>
      <Header handleAuthLogout={props.handleAuthLogout} />

      <Searcher
        query={query}
        setQuery={setQuery}
        setSearchState={setSearchState}
        classNamePrefix='searcher'
      />

      <List
        listItems={query.length ? searchState : ids}
        component={query.length ? UserItem : ChatItem}
        listItemProps={{
          setActiveChatId: memorizedSetActiveChatId
        }}
        className='chat-list'
      />
    </aside>
  );
};

const mapStateToProps = (state: AppState) => ({
  chatsIds: state.chats.ids
});

const mapDispatchToProps = {
  setActiveChatId,
  handleAuthLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
