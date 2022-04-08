import { csrfFetch } from './csrf';

const LOAD_SONG_COMMENTS = 'soundsfound/comments/LOAD_SONG_COMMENTS';
const POST_COMMENT = 'soundsfound/comments/POST_COMMENT';
const DELETE_COMMENT = 'soundsfound/comments/DELETE_COMMENT';

// action creator to load all the comments for a song:
const loadSongComments = comments => ({
  type: LOAD_SONG_COMMENTS,
  comments
});

// action creator to post a comment on a song:
const postAComment = comment => ({
  type: POST_COMMENT,
  comment
});

//action creator to delete a comment:
const deleteAComment = comment => ({
  type: DELETE_COMMENT,
  comment
});


// thunk action creator to fetch all comments on a song from backend api:
export const getComments = (songId) => async dispatch => {

  const res = await fetch(`/api/comments/${songId}`);



  if (res.ok) {
    const comments = await res.json();
    dispatch(loadSongComments(comments));
    return comments
  }

}

// thunk action creator to fetch POST a comment to backend api:
export const post = (comment) => async dispatch => {

  const res = await csrfFetch(`/api/comments/${comment.songId}`, {
    method: "POST",
    body: JSON.stringify(comment)
  })

  if (res.ok) {
    const comment = await res.json();
    dispatch(postAComment(comment));
    return comment
  }
}

// thunk action creator to fetch DELETE a comment from backend api:
export const deleteComment = (comment) => async dispatch => {

  const res = await csrfFetch(`/api/comments/${comment.id}`,{
    method: "DELETE"
  });

  if (res.ok) {
    dispatch(deleteAComment(comment));
  }
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
      newState = {...songComments};
      return newState;
    case POST_COMMENT:
      newState = {...state};
      newState[action.comment.id] = action.comment;
      return newState;
    case DELETE_COMMENT:
      newState = {...state};
      delete newState[action.comment.id];
      return newState;
    default:
      return state;
  }
}

export default commentsReducer;
