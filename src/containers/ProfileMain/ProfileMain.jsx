/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */
import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { editProfile, setVallidStatus } from '../../actions/userActions';
import Profile from '../../components/Profile/Profile'

// eslint-disable-next-line react/prop-types
const ProfileMain = ({ editProfile, setVallidStatus, loggedUser: {user}, status: { fetchSucces }, errorStats: { error } }) => {
  

  const onSubmit = (data) => {
    editProfile(data);
  };

  const validChanger = () => {
    return error.username || error.email ? setVallidStatus() : null;
  };

  const userError = error.username ? <p>{` Username ${error.username}`}</p> : null;
  const emailError = error.email ? <p>{`Email ${error.email}`}</p> : null;

  if (fetchSucces) {
    return <Redirect to="/" />;
  }

  return <Profile
   user={user}
   data={[userError, emailError]}
   onSubmit={onSubmit}
   validChanger={validChanger}
   />
};

ProfileMain.defaultProps = {
  status: {},
  fetchSucces: false,
  errorStats: {},
  error: {},
}

ProfileMain.propTypes = {
  editProfile: PropTypes.func.isRequired,
  setVallidStatus: PropTypes.func.isRequired,
  status: PropTypes.object,
  fetchSucces: PropTypes.bool,
  errorStats: PropTypes.object,
  error: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    status: {
      fetchSucces: state.status.fetchSucces,
    },
    errorStats: {
      error: state.errorStats.error,
    },
    loggedUser: {
      user: state.loggedUser.user
    }
  };
};

const mapDispatchToProps = {
  editProfile,
  setVallidStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMain);
