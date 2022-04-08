import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/file';
import EditSongFormModal from '../EditSongFormModal';
import PostCommentForm from '../PostCommentForm';
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

  if (!sessionUser) return <Redirect to="/" />;
  if (!song) return <Redirect to="/songs" />

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
            </ul>
            <ReactPlayer height="100px" controls url={song.url} />
            {sessionUser && (
              <div hidden={song.userId !== sessionUser.id ? true : false}>
              <EditSongFormModal song={song} />
              <button className='delete-song-button' onClick={() => dispatch(songActions.remove(song))}>Delete</button>
              </div>
            )}
          </li>
        </ul>
      )}
      {song && (<PostCommentForm song={song} />)}
      {comments && (
        <ul className='comments-ul'>
          {commentsArr.map(comment => (
            <li key={`${comment.id}`}>
              <div>User: {comment.User?.username}</div>
              <div>{comment.body}</div>
              {sessionUser && (
                <div hidden={comment.userId !== sessionUser.id ? true : false}>
                <button className='delete-comment-button' onClick={() => dispatch(commentActions.deleteComment(comment))}>Delete</button>
                </div>
              )}
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
