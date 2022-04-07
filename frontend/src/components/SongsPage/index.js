import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactPlayer from 'react-player/file';
import { Redirect } from 'react-router-dom';
import * as songActions from '../../store/songs';
import './SongsPage.css';

function SongsPage() {

  const dispatch = useDispatch();

  useState(() => {
    dispatch(songActions.getAllSongs());
  }, [dispatch]);

  const allSongs = useSelector(state => state.songs);
  const sessionUser = useSelector(state => state.session.user);

  const allSongsArray = Object.values(allSongs);

  if (!sessionUser) return <Redirect to="/" />;


  return (
    <>
      {sessionUser && (
        <ul>
          {allSongsArray.map(song => (
            <li className='individual-song-li' key={song.id}>
              <ul className='song-info-ul'>
                <li>
                  <h2><NavLink to={`/songs/${song.id}`}>{song.title}</NavLink></h2>
                </li>
                <li>
                  User: {song.User.username}
                </li>
                <li>
                  <div hidden={song.playlistId === null ? true : false}>Playlist: {song.playlistId}</div>
                </li>
              </ul>
              <ReactPlayer height="100px" controls url={song.url} />
            </li>
          ))}
        </ul>
      )}
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

export default SongsPage;