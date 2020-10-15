/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOutData } from '../../actions/userActions';
// import icon from '../../img/avatar.png';

const HeaderLogged = ({ data: { username, image }, logOutData }) => {
  return (
    <div>
      <Link to="/new-article" className="header__button--article">
        Create article
      </Link>
      <Link to="/profile" className="header__button--username">{username}</Link>
      <Link to="/profile">
        <img src={image} alt="no pick" />
      </Link>
      <Link to="/" className="header__button--out" onClick={logOutData}>
        Log Out
      </Link>
    </div>
  );
};

HeaderLogged.defaultProps ={
  data: {},
  username: '',
  image: '',
}

HeaderLogged.propTypes = {
  data: PropTypes.object,
  username: PropTypes.string,
  image: PropTypes.string,
  logOutData: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  logOutData,
};

export default connect(null, mapDispatchToProps)(HeaderLogged);
