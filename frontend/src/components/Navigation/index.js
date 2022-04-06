import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import UploadSongFormModal from '../UploadSongFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {

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
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav className='nav-bar'>
      <ul className='nav-links'>
        <li>
          <NavLink exact to="/">Home</NavLink>
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
