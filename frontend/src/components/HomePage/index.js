import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player/lazy';
import * as songActions from '../../store/songs';
import './HomePage.css';

function HomePage() {

  const dispatch = useDispatch();

  useState(() => {
    dispatch(songActions.getAllSongs());
  }, [dispatch]);

  const allSongs = useSelector(state => state.songs);
  console.log("allsongs = useSelector(state=>state.songs) -->", allSongs)

  const allSongsArray = Object.values(allSongs);
  console.log("allSongsArray = Object.values(allsongs)", allSongsArray);


  return (
    <ul>
      {allSongsArray.map(song => (
        <li key={song.id}>
          <h2>{song.title}</h2>
          <div>User: {song.userId}</div>
          <div>Playlist: {song.playlistId}</div>
          <div>Url: <a href={song.url}>Link</a></div>
          <ReactPlayer url={song.url} />
        </li>
      ))}
    </ul>

  );
}

export default HomePage;
