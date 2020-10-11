/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */

import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { sendLogInForm, setVallidStatus } from '../../actions/actions';

import './form.scss';

const LogInForm = ({ sendLogInForm, setVallidStatus, ErrorStats: { isLoginValid }, loggedUser: { isLogged } }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    sendLogInForm(data);
  };

  const validChanger = () => {
    return isLoginValid ? setVallidStatus() : null;
  };

  if (isLogged) {
    return <Redirect to="/" />;
  }

  const serverError = isLoginValid ? <p>Email or Password is invalid</p> : null;

  return (
    <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="content__reg-form">
        <h3>Sign In</h3>

        <label htmlFor="username">Email</label>
        <input type="email" placeholder="Enter Email" name="email" ref={register({ required: true })} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={validChanger}
          ref={register({ required: true, minLength: 6, maxLength: 40 })}
        />
        {errors.password && errors.password.type === 'required' && <p>this is required</p>}
        {errors.password && errors.password.type === 'minLength' && <p>minimal length 6 symbols</p>}
        {serverError}

        <button className="regform-btn" type="submit">
          Login
        </button>
        <p className="form-text">
          Dont have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </div>
    </form>
  );
};

LogInForm.defaultProps = {
  ErrorStats: {},
  isLoginValid: false,
  loggedUser: {},
  isLogged: false,
}

LogInForm.propTypes = {
  sendLogInForm: PropTypes.func.isRequired,
  setVallidStatus: PropTypes.func.isRequired,
  ErrorStats: PropTypes.object,
  isLoginValid: PropTypes.bool,
  loggedUser: PropTypes.object,
  isLogged: PropTypes.bool,
}

const mapStateToProps = (state) => {
  return {
    ErrorStats: {
      isLoginValid: state.ErrorStats.isLoginValid,
    },
    loggedUser: {
      isLogged: state.loggedUser.isLogged,
    },
  };
};

const mapDispatchToProps = {
  sendLogInForm,
  setVallidStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
