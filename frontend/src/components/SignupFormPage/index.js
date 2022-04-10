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

  if (sessionUser) return <Redirect to="/songs" />;

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
    <div className='sign-up-page-container'>
      <br />
      <h1 className='signup-form-h1'>Sign up {'&'} get in here!</h1>
      <form
        onSubmit={handleSubmit}
        className="signup-form"
      >
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Username: <br />
          <input
            type="text"
            onChange={e => setUsername(e.target.value)}
            value={username}
            required
          />
        </label>
        <br />
        <label>
          Email: <br />
          <input
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
        <br />
        <label>
          Password: <br />
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
          />
        </label>
        <br />
        <label>
          Confirm Password: <br />
          <input
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
        </label>
        <br />
        <button
          type="submit"
          className='signup-button'
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormPage;
