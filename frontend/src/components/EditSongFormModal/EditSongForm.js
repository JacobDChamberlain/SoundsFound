import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as songActions from '../../store/songs';
import './EditSongForm.css';

function EditSongForm({ song, closeModal }) {

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const userId = sessionUser.id;
  const url = song.url;
  const id = song.id;
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (title.length > 150) errors.push("Title must be under 150 characters");
    setErrors(errors);
  }, [title]);

  const handleEdit = e => {

    e.preventDefault();

    const song = { id, userId, url, title };

    setErrors([]);
    dispatch(songActions.edit(song));

    closeModal(false);
  }

  return (
    <div className='edit-song-div'>
      <h1>Need to change the title of {song.title}?</h1>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <form
      onSubmit={handleEdit}
      className="edit-song-form"
      >
        <label>
          Title: <br /><br />
          <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <br />
        <br />
        <button
          type="submit"
          className="edit-song-button"
        >
          Confirm Changes
        </button>
      </form>
    </div>
  );
}

export default EditSongForm;
