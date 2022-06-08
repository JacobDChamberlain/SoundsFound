import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

function LoginForm() {

  const dispatch = useDispatch();

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

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
    <div className='login-form-modal-container'>
      <h1 className='login-form-h1'>Log in, lets make some noise!</h1>
      <form
        onSubmit={handleSubmit}
        className="login-form"
      >
        <ul className='errors-ul'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Username (or Email):<br />
          <input
            type="text"
            value={credential}
            onChange={e => setCredential(e.target.value)}
            className='username-or-email-input'
          />
        </label>
        <br />
        <label>
          Password: <br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='password-input'
          />
        </label>
        <br />
        <button
          type="submit"
          className='login-button'
        >
          Log In
        </button>
        <br />
      </form>
    </div>

  );
}

export default LoginForm;
