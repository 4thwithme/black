import React from 'react';

import './Header.scss';
import API from '../../api/api';

interface IProps {
  handleAuthLogout: () => void,
}

const Header = (props: IProps) => {

  const logoutHandler = async () => {
    await API.logoutUser();

    props.handleAuthLogout();
  };

  return (
    <header className="header">
      <div>
        <h1>BLACK</h1>

        <button onClick={logoutHandler}>Log Out</button>

        <button onClick={() => API.getAllUsers()}>Get all users</button>
      </div>
    </header>
  );
};

export default Header;
