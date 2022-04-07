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
      <div className='home-page-header'>
        <h2 className='home-page-h2'>[soundsfound]</h2>
        <h3 className='home-page-h3'>a place to find [sounds]</h3>
      </div>
      {sessionUser && song && (
        <ul>
          <li key={song.id}>
            <div className='song-info-container'>
              <h2>{song.title}</h2>
              <div>User: {song.User.username}</div>
              <div hidden={song.playlistId === null ? true : false}>Playlist: {song.playlistId}</div>
            </div>
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
