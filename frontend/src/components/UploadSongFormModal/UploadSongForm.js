import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as songActions from '../../store/songs';
import './UploadSongForm.css';

function UploadSongForm({ closeModal }) {

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const userId = sessionUser.id;
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (url.length < 1) errors.push("Please enter a url");
    if (!url.includes('http')) errors.push("Please provide a valid url.");
    if (!url.includes('.mp3')) errors.push("Url must lead to mp3 file.");
    if (title.length < 1) errors.push("Please enter a song title.");
    if (title.length > 150) errors.push("Title must be under 150 characters");
    setErrors(errors);
  }, [url, title]);

  const handleUpload = e => {

    e.preventDefault();

    const song = { userId, url, title };

    setErrors([]);
    dispatch(songActions.upload(song));

    closeModal();
  }

  return (
    <div className="upload-song-div">
      <h1 className='upload-h1'>Give us your tunes, brah</h1>
      <ul className='errors-ul'>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <form
      onSubmit={handleUpload}
      className="upload-song-form"
      >
        <label>
          Url: <br />
          <input
            type="text"
            onChange={e => setUrl(e.target.value)}
            value={url}
            required
            className='url-input'
          />
        </label>
        <br />
        <label>
          Title: <br />
          <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            required
            className='title-input'
          />
        </label>
        <button
          hidden={errors.length > 0 ? true : false}
          disabled={errors.length > 0 ? true : false}
          type="submit"
          className="upload-song-button"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadSongForm;
