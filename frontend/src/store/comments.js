import { csrfFetch } from './csrf';

const LOAD_SONG_COMMENTS = 'soundsfound/comments/LOAD_SONG_COMMENTS';

// action creator to load all the comments for a song:
const loadSongComments = comments => ({
  type: LOAD_SONG_COMMENTS,
  comments
});


// thunk action creator to fetch all comments on a song from backend api:
export const getComments = (songId) => async dispatch => {

  const res = await fetch(`/api/comments/${songId}`);

  const comments = await res.json();

  dispatch(loadSongComments(comments));
}

const initialState = {};

const commentsReducer = (state = initialState, action) => {

  let newState;

  switch(action.type) {
    case LOAD_SONG_COMMENTS:
      const songComments = {};
      action.comments.forEach(comment => {
        songComments[comment.id] = comment;
      });
      newState = {...state, ...songComments};
      return newState;
    default:
      return state;
  }
}

export default commentsReducer;
