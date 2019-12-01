import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { handleAuthLogout, initApp } from '../../redux/auth/authReducer';
import './MainPage.scss';

import WebSocket from '../../components/WebSocket/WebSocket';
import ChatList from '../../containers/ChatList/ChatList';
import { AppState } from '../..';
import ChatWindow from '../../containers/ChatWindow/ChatWindow';


const MainPage = ({ initApp, ...props }: any) => {
  useEffect(() => {
    initApp();
  }, [initApp]);


  return (
    <main className="main">
      <WebSocket />

      <ChatList handleAuthLogout={props.handleAuthLogout} />

      <ChatWindow />
    </main>
  );
};

const mapStateToProps = (state: AppState) => ({
  users: state.users,
});

const mapDispatchToProps = {
  handleAuthLogout,
  initApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)