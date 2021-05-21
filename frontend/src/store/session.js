// frontend/src/store/session.js

import { set } from 'js-cookie'
import { csrfFetch } from './csrf'

const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const login = (user) => async dispatch => {
    const { credential, password } = user
    const res = await csrfFetch('/api/session', {
        method: "POST", 
        body: JSON.stringify({
            credential,
            password
        })
    })
    const data = await res.json()
    dispatch(setUser(data.user))
    return res
}

//thunk action to call GET /api/session to set session user to the user
// in the response body
export const restoreUser = () => async dispatch => {
    const res = await csrfFetch('/api/session')
    const data = await res.json()
    dispatch(setUser(data.user))
    return res
}

//thunk action to call POST /api/users to create a user
export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//thunk action to call DELETE /api/session logout
export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: "DELETE",
    })
    dispatch(removeUser())
    return res
}


const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
    let newState

    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state)
            newState.user = action.payload
            return newState
        case REMOVE_USER:
            newState = Object.assign({}, state)
            newState.user = null
            return newState
        default:
            return state
    }
}

export default sessionReducer