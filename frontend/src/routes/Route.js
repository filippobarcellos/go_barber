import React, { useContext } from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Route = ({ component: Component, isPrivate = false, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <ReactDOMRoute
      {...rest}
      render={(location) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { referrer: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
