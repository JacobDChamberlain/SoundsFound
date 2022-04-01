import { csrfFetch } from "./csrf";

const SET_SESSION_USER = 'session/SET_SESSION_USER';
const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

// regular action creator: (set session user)
// (takes in an object with a credential key with the value set to either the user's email or username,
// as well as a password key with the value set to the user's password)
export const setSessionUser = (user) => {
  return {
    type: SET_SESSION_USER,
    user
  }
};

// regular action creator: (remove session user)
export const removeSessionUser = (user) => {
  return {
    type: REMOVE_SESSION_USER,
    user
  }
};


// thunk action creator: (login)
// (takes in an object with a credential key with the value set to either the user's email or username,
// as well as a password key with the value set to the user's password)
export const login  = (user) => async(dispatch) => {
  
  const res = await csrfFetch('/api/session', {
    method: "POST",
    body: JSON.stringify(user)
  });

  if (res.ok) {
    const user = await res.json();

    dispatch(setSessionUser(user));
    return user;
  }
};


const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {

  let newState;

  switch (action.type) {
    case SET_SESSION_USER:
      newState = {...state};
      newState.user = action.user;
      return newState;
    case REMOVE_SESSION_USER:
      newState = {...state};
      // TODO - remove session user
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
