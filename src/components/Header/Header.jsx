import React from 'react';

import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">Realworld Blog</h1>
      <div>
        <button type="button" className="header__button header__button--in">
          Sign In
        </button>
        <button type="button" className="header__button header__button--out">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
