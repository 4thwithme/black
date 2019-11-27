import React, { useState } from 'react';

import './Login.scss';
import API from '../../api/api';
import { setCurrentWindow } from '../../redux/activeWindow/activeWindow';
import { connect } from 'react-redux';
import { handleAuthLogin } from '../../redux/auth/authReducer';

interface ISetState {
  name: string,
  pass: string,
}

const Login: React.FC = (props: any) => {
  const [state, setState] = useState<ISetState>({
    name: '',
    pass: '',
  });

  const setField = (e: React.FormEvent<HTMLInputElement>, key: string) => {
    e.preventDefault();

    const { value }: any = e.target;
    setState({
      ...state,
      [key]: value,
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    API.loginUser(state.name, state.pass)
      .then(({ data }) => {
        props.handleAuthLogin(data);
        props.setCurrentWindow('/');
      })
      .catch(console.error);
  };

  return (
    <main className="login-wrapper">
      <h1 className="login-heading" >authorize</h1>

      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={state.name}
          placeholder="Name ..."
          onChange={(e) => setField(e, 'name')}
          required />

        <input
          autoComplete="new-password"
          type="password"
          value={state.pass}
          placeholder="Password ..."
          onChange={(e) => setField(e, 'pass')}
          required />

        <div className="controls">
          <button type="submit" className="btn btn-primary">Log In</button>
        </div>
      </form>
    </main>
  )
};


const mapDispatchToProps = {
  setCurrentWindow,
  handleAuthLogin,
};

export default connect(null, mapDispatchToProps)(Login);
