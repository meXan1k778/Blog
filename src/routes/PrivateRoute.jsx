import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ loggedUser: { isLogged }, component: Component, ...rest }) => {
  return <Route {...rest} component={(props) => (isLogged ? <Component {...props} /> : <Redirect to="/" />)} />;
};

const mapStateToProps = (state) => {
  return {
    loggedUser: {
      isLogged: state.loggedUser.isLogged,
    },
  };
};

export default connect(mapStateToProps)(PrivateRoute);
