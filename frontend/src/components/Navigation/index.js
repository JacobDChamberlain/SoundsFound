import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import UploadSongFormModal from '../UploadSongFormModal';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <button className='sign-up-button'>
          <NavLink className='sign-up-link' to="/signup">Sign Up</NavLink>
        </button>
      </>
    );
  }

  const demoUser = {
    credential: 'FakeMane1',
    password: 'password'
  };

  return (
    <nav className='nav-bar'>
      <ul className='nav-links'>
        <li>
          {/* <NavLink exact to="/">Home</NavLink> */}
          {!sessionUser && (
            <button className='demo-button' onClick={() => dispatch(sessionActions.login(demoUser))}>Demo</button>
          )}
          {sessionUser && (
            <NavLink exact to="/songs">Songs</NavLink>
          )}
          {isLoaded && sessionLinks}
          {sessionUser && (
            <UploadSongFormModal />
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
