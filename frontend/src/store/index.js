import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import ratingReducer from "./ratings";
import reviewReducer from "./reviews";
import sessionReducer from "./session";
import yelpApiReducer from './yelp-api'

const rootReducer = combineReducers({
    session: sessionReducer,
    yelpAPI: yelpApiReducer,
    rating: ratingReducer,
    review: reviewReducer
})

let enhancer

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk)
} else {
    const logger = require('redux-logger').default
    const composeEnhancers = 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    enhancer = composeEnhancers(applyMiddleware(thunk, logger))
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore