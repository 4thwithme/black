import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { initApp } from '../../redux/auth/authReducer';
import './MainPage.scss';

import WebSocket from '../../components/WebSocket/WebSocket';
import ChatList from '../../containers/ChatList/ChatList';
import { AppState } from '../..';
import ChatWindow from '../../containers/ChatWindow/ChatWindow';


interface IPropsMainComponents {
  sendMsg: (activeChatId: string, msg: string, senderId: string) => void,
  activeChatId: string,
}

const MainComponents = (props: IPropsMainComponents) => (
  <>
    <ChatList />

    {props.activeChatId &&
      <ChatWindow activeChatId={props.activeChatId} sendMsg={props.sendMsg} />
    }
  </>
);


const MainPage = ({ initApp, ...props }: any) => {
  useEffect(() => {
    initApp();
  }, [initApp]);


  return (
    <main className="main">
      <WebSocket component={MainComponents} />
    </main>
  );
};

const mapStateToProps = (state: AppState) => ({
  users: state.users,
  activeChatId: state.activeChat.activeChatId,
});

const mapDispatchToProps = {
  initApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)