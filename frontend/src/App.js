// frontend/src/App.js

// https://cors-anywhere.herokuapp.com/corsdemo

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage'
import SignupFormPage from './components/SignupFormPage'
import Navigation from './components/Navigation'
import ShowRestaurants from "./components/ShowRestaurants";
import ShowSingleRestaurant from './components/ShowSingleRestaurant'
import HomePage from './components/HomePage'
import * as sessionActions from './store/session'
import { Footer } from "./components/Footer/Footer";
import { PageView, initGA} from './components/GoogleAnalytics/GoogleAnalytics'

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))

    // initialize ReactGA
    initGA("UA-213353187-2");
    PageView();    
  }, [dispatch])

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path = '/'>
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/businesses">
            <ShowRestaurants />
          </Route>
          <Route path="/businesses/:id">          
            <ShowSingleRestaurant />
          </Route>
        </Switch>
      )}
      <Footer />    
    </>
  );
}

export default App;
