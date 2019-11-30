import React from 'react';
import { connect } from 'react-redux';

import API from '../../api/api';
import { handleAuthLogout } from '../../redux/auth/authReducer';

import WebSocket from '../../components/WebSocket/WebSocket';


const MainPage = (props) => {
  const logoutHandler = async () => {
    await API.logoutUser();

    props.handleAuthLogout()
  };

  return <>
    <WebSocket />

    <h1>BLACK</h1>

    <button onClick={logoutHandler}>Log Out</button>

    <button onClick={() => API.getAllUsers()}>Get all users</button>
  </>
};

const mapDispatchToProps = {
  handleAuthLogout
};

export default connect(null, mapDispatchToProps)(MainPage)