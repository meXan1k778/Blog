import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderUnlogged from './Header-unlogged';
import HeaderLogged from './Header-logged';
import { getDataFromCookie } from '../../actions/actions';

import './header.scss';

const Header = ({ loggedUser, isLogged, getDataFromCookie }) => {
  useEffect(() => {
    getDataFromCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const element = isLogged ? <HeaderLogged data={loggedUser} /> : <HeaderUnlogged />;

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
    loggedUser: state.loggedUser,
    isLogged: state.isLogged,
  };
};

const mapDispatchToProps = {
  getDataFromCookie,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
