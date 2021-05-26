// frontend/src/App.js

// https://cors-anywhere.herokuapp.com/corsdemo

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage'
import SignupFormPage from './components/SignupFormPage'
import Navigation from './components/Navigation'
import RestaurantSearch from './components/RestaurantSearch'
import ShowRestaurants from "./components/ShowRestaurants";
import * as sessionActions from './store/session'

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      <RestaurantSearch />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/restaurants">
            <ShowRestaurants />
          </Route>
        </Switch>
      )}
      

    </>
  );
}

export default App;
