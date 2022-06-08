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
    // if (body.length === 0) errors.push("Comment cannot be empty")

    setErrors(errors);

  }, [body]);

  const handleSubmit = e => {

    e.preventDefault();

    setErrors([]);

    const comment = { userId, songId, body };

    dispatch(commentActions.post(comment));

    setBody('');
  }

  return (
    <div className='post-comment-form-container'>
      <h4 className='post-comment-form-h4'>Post a Comment:</h4>
      <form
        onSubmit={handleSubmit}
        className='post-comment-form'
      >
        <ul className='errors-ul'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <textarea
          onChange={e => setBody(e.target.value)}
          value={body}
        />
        <button
          type="submit"
          className='post-comment-button'
        >
          Post
        </button>
      </form>
    </div>
  )
}

export default PostCommentForm;
