import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BsMusicNote } from 'react-icons/bs';
import * as songActions from '../../store/songs';
import './Footer.css';

function Footer() {

  return (
    <>
      <div className='footer-container'>
        <ul className='tech-used'>
          <li>
            <a href="https://reactjs.org/">React</a>
          </li>
          <li>
            <a href="https://redux.js.org/">Redux</a>
          </li>
          <li>
            <a href="https://expressjs.com/">Express</a>
          </li>
          <li>
            <a href="https://sequelize.org/">Sequelize</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Footer;
