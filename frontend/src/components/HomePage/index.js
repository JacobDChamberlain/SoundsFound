import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player/youtube';
import EditSongFormModal from '../EditSongFormModal';
import * as songActions from '../../store/songs';
import './HomePage.css';

function HomePage() {

  const dispatch = useDispatch();

  useState(() => {
    dispatch(songActions.getAllSongs());
  }, [dispatch]);

  const allSongs = useSelector(state => state.songs);
  const sessionUser = useSelector(state => state.session.user);

  const allSongsArray = Object.values(allSongs);

  // TODO - display username of the one who posted the song instead of id by song.userId

  return (
    <>
      <ul>
        {allSongsArray.map(song => (
          <li key={song.id}>
            <h2>{song.title}</h2>
            <div>User: {song.userId}</div>
            <div hidden={song.playlistId === null ? true : false}>Playlist: {song.playlistId}</div>
            <ReactPlayer controls width="300px" height="300px" url={song.url} />
            {sessionUser && (
              <div hidden={song.userId !== sessionUser.id ? true : false}>
              <EditSongFormModal song={song} />
              <button onClick={() => dispatch(songActions.remove(song))}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;
