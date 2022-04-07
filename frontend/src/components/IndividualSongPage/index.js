import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/file';
import EditSongFormModal from '../EditSongFormModal';
import * as songActions from '../../store/songs';

function IndividualSongPage() {

  const dispatch = useDispatch();

  const {songId} = useParams();

  useState(() => {
    dispatch(songActions.getOneSong(songId));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  const songs = useSelector(state => state.songs);

  console.log(songs);

  const song = songs[songId];

  console.log(song);

  return (
    <>
      {sessionUser && song && (
        <ul className='song-info-container'>
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
            {sessionUser && (
              <div hidden={song.userId !== sessionUser.id ? true : false}>
              <EditSongFormModal song={song} />
              <button onClick={() => dispatch(songActions.remove(song))}>Delete</button>
              </div>
            )}
          </li>
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

export default IndividualSongPage;
