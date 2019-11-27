import React from 'react';
import { connect } from 'react-redux';

import API from '../../api/api';
import { handleAuthLogout } from '../../redux/auth/authReducer';


const MainPage = (props) => {
  const logoutHandler = async () => {
    await API.logoutUser();

    props.handleAuthLogout()
  };

  return <>
    <h1>BLACK</h1>

    <button onClick={logoutHandler}>Log Out</button>

    <button onClick={() => API.getAllUsers()}>Get all users</button>
  </>
};

const mapDispatchToProps = {
  handleAuthLogout
};

export default connect(null, mapDispatchToProps)(MainPage)