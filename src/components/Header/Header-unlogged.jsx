import React from 'react';
import { Link } from 'react-router-dom';

const HeaderUnlogged = () => {
  return (
    <div>
      <Link to="/sign-in" className="header__button header__button--in">
        Sign In
      </Link>
      <Link to="/sign-up" className="header__button header__button--out">
        Sign Up
      </Link>
    </div>
  );
};

export default HeaderUnlogged;
