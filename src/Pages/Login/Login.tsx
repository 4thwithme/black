import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./Login.scss";
import { setCurrentWindow } from "../../redux/activeWindow/activeWindowReducer";
import { handleAuthLogin } from "../../redux/auth/authReducer";

interface ISetState {
  name: string;
  pass: string;
}

interface ILogin {
  setCurrentWindow: (path: string) => void;
  handleAuthLogin: (name: string, pass: string) => void;
}

const Login = (props: ILogin) => {
  const [state, setState] = useState<ISetState>({
    name: "",
    pass: ""
  });

  const setField = (e: React.FormEvent<HTMLInputElement>, key: string) => {
    e.preventDefault();

    const { value }: any = e.target;
    setState({
      ...state,
      [key]: value
    });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.handleAuthLogin(state.name, state.pass);
  };

  return (
    <main className='login-wrapper'>
      {/* <h1 className="login-heading">sign in</h1> */}

      <form onSubmit={onSubmitHandler}>
        <input
          type='text'
          value={state.name}
          placeholder='Name ...'
          onChange={(e) => setField(e, "name")}
          required
        />

        <input
          autoComplete='new-password'
          type='password'
          value={state.pass}
          placeholder='Password ...'
          onChange={(e) => setField(e, "pass")}
          required
        />

        <div className='controls'>
          <button type='submit' className='btn btn-primary btn-primary--wide'>
            Log In
          </button>
        </div>
      </form>
    </main>
  );
};

const mapDispatchToProps = {
  setCurrentWindow,
  handleAuthLogin
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
