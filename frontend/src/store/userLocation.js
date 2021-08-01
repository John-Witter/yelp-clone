// constants
const GET_USER_LOCATION = 'userLocation/GET_USER_LOCATION'

// action
const getLocation = (userLocation) => ({
    type: GET_USER_LOCATION,
    userLocation
})

// thunks
export const getUserLocation = () => async (dispatch) => {
    const res = await fetch('https://ipapi.co/json/')

    if (res.ok) {
        const data = await res.json()
        dispatch(getLocation(data))        
    }
}

// reducer
export default function locationReducer(state = {}, action) {
    switch (action.type) {
        case GET_USER_LOCATION:
            const longLoc = action.userLocation
            const loc = {
                city: longLoc.city,
                lat: longLoc.latitude,
                lng: longLoc.longitude
            }
            return loc
        default:
             return state
    }
}