import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import UploadSongFormModal from './components/UploadSongFormModal';
import * as sessionActions from './store/session';

function App() {

  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <UploadSongFormModal />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <>
            <ReactPlayer url="https://www.youtube.com/watch?v=6rdiaR0PjL0" />
            <HomePage />
            </>
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
