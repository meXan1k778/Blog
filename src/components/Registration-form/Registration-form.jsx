/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React from 'react';

import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { sendRegForm } from '../../actions/actions';

import './form.scss';

const RegistrationForm = ({ sendRegForm, Status: { userRegistered }, ErrorStats: { error } }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    sendRegForm(data);
  };

  let password;
  const text = (value) => {
    password = value;
  };

  const validation = (value) => {
    if (value === password) return true;
    return false;
  };

  const userError = error.username ? <p>{` Username ${error.username}`}</p> : null;
  const emailError = error.email ? <p>{`Email ${error.email}`}</p> : null;

  if (userRegistered) {
    return <Redirect to="/" />;
  }

  return (
    <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="content__reg-form">
        <h3>Create new account</h3>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          ref={register({ required: true, minLength: 3, maxLength: 20 })}
        />
        {errors.username && errors.username.type === 'required' && <p>this is required</p>}
        {errors.username && errors.username.type === 'minLength' && <p>minimal length 3 symbols</p>}
        {userError}

        <label htmlFor="username">Email</label>
        <input type="email" placeholder="Enter Email" name="email" ref={register({ required: true })} />
        {emailError}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          ref={register({ required: true, minLength: 6, maxLength: 40, validate: text })}
        />
        {errors.password && errors.password.type === 'required' && <p>this is required</p>}
        {errors.password && errors.password.type === 'minLength' && <p>minimal length 6 symbols</p>}
        <label htmlFor="repeat" className="line">
          Repeat password
        </label>

        <input
          type="password"
          placeholder="Repeat password"
          name="repeat"
          ref={register({ required: true, validate: validation })}
        />
        {errors.repeat && errors.repeat.type === 'validate' && <p>passwords do not match</p>}

        <input type="checkbox" name="repeatpsw" ref={register({ required: true })} />
        <label htmlFor="password">I agree to the processing of my personal information</label>
        <button className="regform-btn" type="submit">
          Create
        </button>
        <p className="form-text">
          Already have an account? <a href="./">Sign In.</a>
        </p>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    Status: {
      userRegistered: state.Status.userRegistered,
    },
    ErrorStats: {
      error: state.ErrorStats.error,
    },
  };
};

const mapDispatchToProps = {
  sendRegForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
