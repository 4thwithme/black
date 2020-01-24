import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faBars } from "@fortawesome/free-solid-svg-icons";

import "./Header.scss";
import API from "../../api/api";

interface IProps {
  handleAuthLogout: () => void;
}

const Header = (props: IProps) => {
  const logoutHandler = async () => {
    await API.logoutUser();

    if (!!window.confirm("ar u sure?")) {
      props.handleAuthLogout();
    }
  };

  return (
    <header className='header'>
      <div className='header__wrap'>
        <button className='header__settings' onClick={() => console.log("settings here")}>
          <FontAwesomeIcon icon={faBars} size='2x' />
        </button>

        <h1 className='header__head'>BLACK</h1>

        <button className='header__logout' onClick={logoutHandler}>
          <FontAwesomeIcon icon={faPowerOff} size='2x' />
        </button>
      </div>
    </header>
  );
};

export default Header;
