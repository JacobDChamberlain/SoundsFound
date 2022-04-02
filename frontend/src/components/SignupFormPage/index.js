import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormPage() {

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = e => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ username, email, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors(["Passwords don't match"]);
  }

  return (
    <>
      <h1>Sign up {'&'} get in here!</h1>
      <form
        onSubmit={handleSubmit}
        className="signup-form"
      >
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Username: {' '}
          <input
            type="text"
            onChange={e => setUsername(e.target.value)}
            value={username}
            required
          />
        </label>
        <label>
          Email: {' '}
          <input
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
        <label>
          Password: {' '}
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
          />
        </label>
        <label>
          Confirm Password: {' '}
          <input
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
        </label>
        <button
          type="submit"
          className='signup-button'
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormPage;
