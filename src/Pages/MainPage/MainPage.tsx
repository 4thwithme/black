import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import usePrev from '../../customHooks/usePrev';
import WebSocket from '../../components/WebSocket/WebSocket';
import MainComponents from './MainComponents';
import { initApp } from '../../redux/auth/authReducer';
import './MainPage.scss';

import { AppState } from '../..';

interface IProps {
  isAuth: boolean,
  initApp: () => void,
};


const MainPage = ({ initApp, isAuth }: IProps) => {
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
  isAuth: state.auth.isAuth,
});

const mapDispatchToProps = {
  initApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)