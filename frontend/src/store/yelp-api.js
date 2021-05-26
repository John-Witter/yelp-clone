// https://api.yelp.com/v3/businesses/search?term=cuban&location=miami
const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?'
const yelpKey = process.env.REACT_APP_BEARER_TOKEN

const GET_BUSINESSES = 'yelpApi/GET_BUSINESSES'
const GET_SINGLE_BUSINESS = 'yelpApi/GET_SINGLE_BUSINESS'

export const getBusinesses = (businesses) => ({
    type: GET_BUSINESSES,
    businesses
})

export const getSingleBusiness = (business) => ({
    type: GET_SINGLE_BUSINESS,
    business
})

export const getBusinessByName = (term, location) => async (dispatch) => {
// `https://api.yelp.com/v3/businesses/{${"eXIEbOrEar3x0ye0RYMLEw"}}`
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

export const getBusinessById = (id) => async (dispatch) => {
    // the following link worked while testing a page by id
    // `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${"eXIEbOrEar3x0ye0RYMLEw"}`
    const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`, {
        headers: {
            Authorization: `Bearer ${yelpKey}`
        }
    })

    const data = await res.json()
}


export default function yelpApiReducer(state = {}, action) {
    switch (action.type) {
        case GET_BUSINESSES:
            return {
                ...state,
                businesses: action.businesses.businesses
            }
            // let newState = {...state}
            // newState['businesses'] = action.businesses.businesses.forEach(business => {
            //     newState['businesses'][business.id] = business
            // })
            // return newState
        case GET_SINGLE_BUSINESS:
            console.log('GET_SINGLE_BUSINESS', action)
            return {
                ...state,
                business: action.business
            }
        default:
            return state
    }
}