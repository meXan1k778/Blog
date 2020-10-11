/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HeaderUnlogged from './Header-unlogged';
import HeaderLogged from './Header-logged';

import { getDataFromCookie } from '../../actions/actions';

import './header.scss';

const Header = ({ getDataFromCookie, loggedUser: { user, isLogged } }) => {
  useEffect(() => {
    getDataFromCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const element = isLogged ? <HeaderLogged data={user} /> : <HeaderUnlogged />;

  return (
    <header className="header">
      <Link to="/" className="header__title">
        Realworld Blog
      </Link>
      {element}
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: {
      user: state.loggedUser.user,
      isLogged: state.loggedUser.isLogged,
    },
  };
};

Header.defaultProps ={
  loggedUser: {},
  user: {},
  isLogged: false,
}

Header.propTypes = {
  loggedUser: PropTypes.object,
  user: PropTypes.object,
  isLogged: PropTypes.bool,
  getDataFromCookie: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  getDataFromCookie,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
