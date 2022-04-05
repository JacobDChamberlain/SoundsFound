import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player/lazy';
import UploadSongFormModal from '../UploadSongFormModal';
import * as songActions from '../../store/songs';
import './HomePage.css';

function HomePage() {

  const dispatch = useDispatch();

  useState(() => {
    dispatch(songActions.getAllSongs());
  }, [dispatch]);

  const allSongs = useSelector(state => state.songs);

  const allSongsArray = Object.values(allSongs);

  return (
    <>
    <div className="upload-song-modal">
      <UploadSongFormModal />
    </div>
      <ul>
        {allSongsArray.map(song => (
          <li key={song.id}>
            <h2>{song.title}</h2>
            <div>User: {song.userId}</div>
            <div hidden={song.playlistId === null ? true : false}>Playlist: {song.playlistId}</div>
            <ReactPlayer url={song.url} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;
