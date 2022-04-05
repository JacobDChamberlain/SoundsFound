import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as songActions from '../../store/songs';
import './UploadSongForm.css';

function UploadSongForm() {

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const [userId, setUserId] = useState(1);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  // const [errors, setErrors] = useState([]);

  const handleUpload = e => {

    e.preventDefault();

    setUserId(sessionUser.id);

    // dispatch(songActions.upload({ userId, url, title }));

    // TODO - redirect to home page
  }

  return (
    <>
      <h1>Give us your tunes, brah</h1>
      <form
      onSubmit={handleUpload}
      className="upload-song-form"
      >
        <label>
          Url: {' '}
          <input
            type="text"
            onChange={e => setUrl(e.target.value)}
            value={url}
            required
          />
        </label>
        <label>
          Title: {' '}
          <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <button
          type="submit"
          className="upload-song-button"
        >
          Upload
        </button>
      </form>
    </>
  );
}

export default UploadSongForm;
