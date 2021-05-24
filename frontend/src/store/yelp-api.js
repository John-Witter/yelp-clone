// https://api.yelp.com/v3/businesses/search?term=cuban&location=miami
const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?'
const yelpKey = process.env.REACT_APP_BEARER_TOKEN

const GET_BUSINESSES = 'yelpApi/GET_BUSINESSES'

export const getBusinesses = (payload) => ({
    type: GET_BUSINESSES,
    payload
})

export const getBusinessByName = (term, location) => async (dispatch) => {

    // const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`, {
    //     headers: {
    //         Authorization: `Bearer ${yelpKey}`
    //     }
    // })

    // const res = fetch('https://jsonplaceholder.typicode.com/todos/1')

    // const data = await res.json()
    // console.log(data)
    // dispatch(getBusinesses(data))
    // return data

}


export default function yelpApiReducer(state = {}, action) {
    switch (action.type) {
        case GET_BUSINESSES:
            return action.payload
        default:
            return state
    }
}