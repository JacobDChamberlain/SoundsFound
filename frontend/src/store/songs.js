import { csrfFetch } from './csrf';

const LOAD_ALL_SONGS = 'soundsfound/songs/LOAD_ALL_SONGS';
const LOAD_ONE_SONG = 'soundsfound/songs/LOAD_ONE_SONG';
const UPLOAD_SONG = 'soundsfound/songs/UPLOAD_SONG';
const EDIT_SONG = 'soundsfound/songs/EDIT_SONG';
const DELETE_SONG = 'soundsfound/songs/DELETE_SONG';

// action creator to load all the songs:
const loadAll = songs => ({
  type: LOAD_ALL_SONGS,
  songs
});

// may not need
// action creator to load one song:
const loadOne = song => ({
  type: LOAD_ONE_SONG,
  song
});

// action creator to upload a song:
const uploadSong = song => ({
  type: UPLOAD_SONG,
  song
});

// action creator to edit a song:
const editSong = song => ({
  type: EDIT_SONG,
  song
});

// action creator to delete a song:
const deleteSong = song => ({
  type: DELETE_SONG,
  song
});


// thunk action creator to fetch all songs from backend api:
export const getAllSongs = () => async dispatch => {

  const res = await fetch('/api/songs');

  const songs = await res.json();

  dispatch(loadAll(songs));
}

// may not need?
// thunk action creator to fetch one song from backend api:
export const getOneSong = (songId) => async dispatch => {

  const res = await fetch(`/api/songs/${songId}`);

  const song = await res.json();

  dispatch(loadOne(song));
}


// thunk action creator to fetch POST a song to backend api:
export const upload = (song) => async dispatch => {

  const res = await csrfFetch('/api/songs', {
    method: "POST",
    body: JSON.stringify(song)
  })

  if (res.ok) {
    const song = await res.json();
    dispatch(uploadSong(song))
    return song;
  }
}

export const edit = (song) => async dispatch => {

  const res = await csrfFetch(`/api/songs/${song.id}`, {
    method: "PUT",
    body: JSON.stringify(song)
  })

  if (res.ok) {
    const song = await res.json();
    dispatch(editSong(song))
    return song;
  }
}

export const remove = (song) => async dispatch => {

  const res = await csrfFetch(`/api/songs/${song.id}`, {
    method: "DELETE"
  });

  if (res.ok) {
    dispatch(deleteSong(song));
  }
}



const initialState = {};

const songsReducer = (state = initialState, action) => {

  let newState;

  switch (action.type) {
    case LOAD_ALL_SONGS:
      const allSongs = {};
      action.songs.forEach(song => {
        allSongs[song.id] = song;
      });
      newState = {...state, ...allSongs};
      return newState;
    case LOAD_ONE_SONG:
      newState = {};
      newState[action.song.id] = action.song;
      return newState;
    case UPLOAD_SONG:
      newState = {...state};
      newState[action.song.id] = action.song;
      return newState;
    case EDIT_SONG: //* consider refactoring action creators *
      newState = {...state};
      newState[action.song.song.id] = action.song.song;
      return newState;
    case DELETE_SONG:
      newState = {...state};
      delete newState[action.song.id];
      return newState;
    default:
      return state;
  }
}

export default songsReducer;
