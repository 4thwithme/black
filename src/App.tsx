import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./clientConfig/api-config";

import Login from "./Pages/Login/Login";
import MainPage from "./Pages/MainPage/MainPage";
import SignUp from "./Pages/SignUp/SignUp";

import { AppState } from ".";
import PrivateRoute from "./components/hiddenComponents/PrivateRoute";

interface IApp {
  activeWindow: string;
  isAuth: boolean;
}

const App = (props: IApp) => {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />

          <Route path='/sign-up' component={SignUp} />

          <PrivateRoute isAuth={props.isAuth} exact path='/' component={MainPage} />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  activeWindow: state.activeWindow.path,
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(App);
