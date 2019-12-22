import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './clientConfig/api-config';
import usePrev from './customHooks/usePrev';
import { setCurrentWindow } from './redux/activeWindow/activeWindowReducer';

import Login from './Pages/Login/Login';
import { AppState } from '.';
import MainPage from './Pages/MainPage/MainPage';


interface IApp {
  activeWindow: string,
  setCurrentWindow: (activeWindow: string) => void,
  isAuth: boolean,
};

const App = (props: IApp) => {
  // const { activeWindow } = props;

  // const prevActiveWindow = usePrev(activeWindow);

  // useEffect(() => {
  //   if (activeWindow && prevActiveWindow !== activeWindow) {
  //     window.location.href = activeWindow;
  //     return;
  //   }
  // }, [prevActiveWindow, activeWindow]);

  useEffect(()=> {
    if (props.isAuth) {
      window.location.href = '/';
    }
  }, [props.isAuth]);


  return (
    <div className="App">
      <Router>

        <Switch>
          <Route path="/login" component={Login} />

          <Route exact path="/" component={MainPage} />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  activeWindow: state.activeWindow.path,
  isAuth: state.auth.isAuth,
});
const mapDispatchToProps = {
  setCurrentWindow,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
