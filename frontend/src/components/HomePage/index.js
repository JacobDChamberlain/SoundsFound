import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as songActions from '../../store/songs';
import './HomePage.css';

function HomePage() {

  const dispatch = useDispatch();

  useState(() => {
    dispatch(songActions.getAllSongs());
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  // Redirect to songs page if logged in:
  if (sessionUser) return <Redirect to="/songs" />;

  return (
    <>
      <div className='home-page-header'>
        <h2 className='home-page-h2'>[soundsfound]</h2>
        <h3 className='home-page-h3'>a place to find [sounds]</h3>
      </div>
      <div className='home-page-footer'>
        <ul className='tech-used'>
          <li>
            React
          </li>
          <li>
            Redux
          </li>
          <li>
            Express
          </li>
          <li>
            Sequelize
          </li>
        </ul>
      </div>
    </>
  );
}

export default HomePage;
