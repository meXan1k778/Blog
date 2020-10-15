/* eslint-disable react/prop-types */
import React from 'react';
import { useForm } from 'react-hook-form';

import './form.scss';

const Profile = ({data, onSubmit, validChanger, user}) =>{
    const [userError, emailError] = data
    const { register, handleSubmit, errors } = useForm();
    
    return (
        <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div className="content__reg-form">
            <h3>Edit Profile</h3>
    
            <label htmlFor="username">Username</label>
            <input
              defaultValue={user.username}
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={validChanger}
              ref={register({ required: true, minLength: 3, maxLength: 20 })}
            />
            {errors.username && errors.username.type === 'required' && <p>this is required</p>}
            {errors.username && errors.username.type === 'minLength' && <p>minimal length 3 symbols</p>}
            {userError}
    
            <label htmlFor="email">Email</label>
            <input
              defaultValue={user.email}
              type="email"
              onChange={validChanger}
              placeholder="Enter Email"
              name="email"
              ref={register({ required: true })}
            />
            {errors.email && errors.email.type === 'required' && <p>this is required</p>}
            {emailError}
    
            <label htmlFor="password">New password</label>
            <input
              type="password"
              placeholder="New password"
              name="password"
              ref={register({ required: true, minLength: 6, maxLength: 40 })}
            />
            {errors.password && errors.password.type === 'required' && <p>this is required</p>}
            {errors.password && errors.password.type === 'minLength' && <p>minimal length 6 symbols</p>}
    
            <label htmlFor="avatar">Avatar image (url)</label>
            <input type="text" placeholder="Enter url" name="avatar" ref={register} />
    
            <button className="regform-btn" type="submit">
              Save
            </button>
          </div>
        </form>
      );
}

export default Profile