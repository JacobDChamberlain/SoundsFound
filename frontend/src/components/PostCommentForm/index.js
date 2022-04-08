import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as commentActions from '../../store/comments';
import './PostComment.css';

function PostCommentForm({ song }) {

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const userId = sessionUser.id;
  const songId = song.id;

  const [body, setBody] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (body.length > 200) errors.push("Comment must be under 200 characters");
    setErrors(errors);
  }, [body]);

  const handleSubmit = e => {

    e.preventDefault();

    setErrors([]);

    const comment = { userId, songId, body };

    dispatch(commentActions.post(comment));
  }

  return (
    <>
      <h4>Post a Comment:</h4>
      <form
        onSubmit={handleSubmit}
        className='post-comment-form'
      >
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Comment: {' '}
          <textarea
            onChange={e => setBody(e.target.value)}
            value={body}
          />
        </label>
        <button
          type="submit"
          className='post-comment-button'
        >
          Post
        </button>
      </form>
    </>
  )
}

export default PostCommentForm;
