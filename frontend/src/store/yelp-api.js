// https://api.yelp.com/v3/businesses/search?term=cuban&location=miami
const baseUrl = 'https://api.yelp.com/v3/businesses/search?'
const yelpKey = process.env.REACT_APP_BEARER_TOKEN



export const getBusinessByName = (name) => async (dispatch) => {
    const res = await fetch(`https://api.yelp.com/v3/businesses/search?term=cuban&location=miami`, {
        headers: {
            Authorization: `Bearer ${yelpKey}`,
            Origin: 'localhost',
            withCredentials: true
        }
    })
    const data = res.json()
    // console.log('data', data)
    return data
}

export const getBusinessByLocation = (location) => async (dispatch) => {
    const res = await fetch(`${baseUrl}location=${location}`, {
        headers: {
            Authorization: `Bearer ${yelpKey}`,
            Origin: 'localhost',
            withCredentials: true
        }
    })
    const data = res.json()
    console.log(data)
    return data
}


export default function yelpApiReducer(state = {}, action) {
    switch (action.type) {
        default:
            return state
    }
}