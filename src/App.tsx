import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./clientConfig/api-config";
import { setCurrentWindow } from "./redux/activeWindow/activeWindowReducer";

import Login from "./Pages/Login/Login";
import MainPage from "./Pages/MainPage/MainPage";
import SignIn from "./Pages/SignIn/SignIn";

import { AppState } from ".";

interface IApp {
  activeWindow: string;
  setCurrentWindow: (activeWindow: string) => void;
  isAuth: boolean;
}

const App = (props: IApp) => {
  useEffect(() => {
    if (props.isAuth) {
      window.location.href = "/";
    }
  }, [props.isAuth]);

  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />

          <Route path='/sign-in' component={SignIn} />

          <Route exact path='/' component={MainPage} />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  activeWindow: state.activeWindow.path,
  isAuth: state.auth.isAuth
});
const mapDispatchToProps = {
  setCurrentWindow
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
