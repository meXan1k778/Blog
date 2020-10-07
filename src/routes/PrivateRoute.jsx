import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isLogged, component: Component, ...rest }) => {
  return <Route {...rest} component={(props) => (isLogged ? <Component {...props} /> : <Redirect to="/" />)} />;
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
