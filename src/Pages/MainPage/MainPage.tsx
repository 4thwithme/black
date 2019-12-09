import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import WebSocket from '../../components/WebSocket/WebSocket';
import MainComponents from './MainComponents';
import { initApp } from '../../redux/auth/authReducer';
import './MainPage.scss';

import { AppState } from '../..';


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