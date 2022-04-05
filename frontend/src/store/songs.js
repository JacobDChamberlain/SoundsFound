const LOAD_ALL_SONGS = 'soundsfound/songs/LOAD_ALL_SONGS';
const LOAD_ONE_SONG = 'soundsfound/songs/LOAD_ONE_SONG';
const UPLOAD_SONG = 'soundsfound/songs/UPLOAD_SONG';

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

  const res = await fetch('/api/songs', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(song)
  })

  if (res.ok) {
    const song = await res.json();
    dispatch(uploadSong(song))
    return song;
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
    case UPLOAD_SONG:
      newState = {...state};
      newState[action.song.id] = action.song;
      return newState;
    default:
      return state;
  }
}

export default songsReducer;
