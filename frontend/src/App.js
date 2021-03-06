import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import SongsPage from './components/SongsPage';
import IndividualSongPage from './components/IndividualSongPage';
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
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/songs">
            <SongsPage />
          </Route>
          <Route path="/songs/:songId">
            <IndividualSongPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
