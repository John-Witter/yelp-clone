// https://api.yelp.com/v3/businesses/search?term=cuban&location=miami
const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?'
const yelpKey = process.env.REACT_APP_BEARER_TOKEN

const GET_BUSINESSES = 'yelpApi/GET_BUSINESSES'

export const getBusinesses = (payload) => ({
    type: GET_BUSINESSES,
    payload
})

export const getBusinessByName = (term, location) => async (dispatch) => {

    const res = await fetch(`${baseUrl}term=${term}&location=${location}`, {
        headers: {
            Authorization: `Bearer ${yelpKey}`
        }
    })
    
    const data = await res.json()
    
    dispatch(getBusinesses(data))
    return data
    
    // const res = fetch('https://jsonplaceholder.typicode.com/todos/1')
}


export default function yelpApiReducer(state = {}, action) {
    switch (action.type) {
        case GET_BUSINESSES:
            console.log('action.payload', action.payload.businesses)
            return {
                ...state,
                businesses: action.payload.businesses
            }
            // let newState = {...state}
            // newState['businesses'] = action.payload.businesses.forEach(business => {
            //     newState['businesses'][business.id] = business
            // })
            // return newState

        default:
            return state
    }
}