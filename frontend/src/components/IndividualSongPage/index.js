import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/file';
import EditSongFormModal from '../EditSongFormModal';
import Footer from '../Footer';
import * as songActions from '../../store/songs';
import * as commentActions from '../../store/comments';

function IndividualSongPage() {

  const dispatch = useDispatch();

  const {songId} = useParams();

  useState(() => {
    dispatch(songActions.getOneSong(songId));
    dispatch(commentActions.getComments(songId));
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  const songs = useSelector(state => state.songs);
  const song = songs[songId];

  const comments = useSelector(state => state.comments);
  const commentsArr = Object.values(comments);
  // const filteredComments = commentsArr.filter(comment => comment.songId === songId);

  if (!sessionUser) return <Redirect to="/" />;

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
      {comments && (
        <ul className='comments-ul'>
          {commentsArr.map(comment => (
            <li key={comment.id}>
              <div>User: {comment.User.username}</div>
              <div>{comment.body}</div>
              <br />
            </li>
          ))}
        </ul>
      )}
      <Footer />
    </>
  );
}

export default IndividualSongPage;
