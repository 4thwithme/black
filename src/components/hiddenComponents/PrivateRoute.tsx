import React, { ReactType } from "react";
import { Route, Redirect } from "react-router-dom";

interface IPrivateRoute {
  component: ReactType;
  isAuth: boolean;
  exact: boolean;
  path: string;
}

const PrivateRoute = ({ isAuth, component: Component, ...rest }: IPrivateRoute) => {
  console.log(isAuth);

  return (
    <Route
      {...rest}
      render={(props) => (isAuth ? <Component {...rest} {...props} /> : <Redirect to='/login' />)}
    />
  );
};

export default PrivateRoute;
