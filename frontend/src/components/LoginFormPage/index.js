import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './LoginForm.css';

import * as sessionActions from '../../store/session';

function LoginFormPage() {

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <>
    <h1>Log the fuck in lets make some noise</h1>
      <form
        onSubmit={handleSubmit}
        className="login-form"
      >
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Username or Email...<br />Whatever you got is cool: {' '}
          <input
            type="text"
            value={credential}
            onChange={e => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password: {' '}
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className='login-button'
        >
          Log In
        </button>
      </form>
    </>

  );
}

export default LoginFormPage;
