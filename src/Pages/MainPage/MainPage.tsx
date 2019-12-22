import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import usePrev from '../../customHooks/usePrev';
import WebSocket from '../../components/WebSocket/WebSocket';
import MainComponents from './MainComponents';
import { initApp } from '../../redux/auth/authReducer';
import './MainPage.scss';

import { AppState } from '../..';
import { IUser } from '../../redux/types';

interface IProps {
  users: IUser[],
  isAuth: boolean,
  activeChatId: string,
  initApp: () => void,
};


const MainPage = ({ initApp, isAuth }: any) => {
  const prevAuthStatus = usePrev(isAuth);

  useEffect(() => {
    initApp();
  }, [initApp]);

  useEffect(() => {
    if (prevAuthStatus === false && isAuth) {
      window.location.href = '/login';
    }
  }, [isAuth]);

  return (
    <main className="main">
      <WebSocket component={MainComponents} />
    </main>
  );
};

const mapStateToProps = (state: AppState) => ({
  users: state.users,
  activeChatId: state.activeChat.activeChatId,
  isAuth: state.auth.isAuth,
});

const mapDispatchToProps = {
  initApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)