/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { sendLogInForm, setVallidStatus } from '../../actions/actions';

import './form.scss';

const LogInForm = ({ sendLogInForm, setVallidStatus, isLogged, isLoginValid }) => {
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
          Don't have an account? <a href="./">Sign Up.</a>
        </p>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
    isLoginValid: state.isLoginValid,
  };
};

const mapDispatchToProps = {
  sendLogInForm,
  setVallidStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
