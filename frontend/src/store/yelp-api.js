// https://api.yelp.com/v3/businesses/search?term=cuban&location=miami
// const baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?'
// const yelpKey = process.env.REACT_APP_BEARER_TOKEN
import { csrfFetch } from "./csrf";
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
    const res = await csrfFetch(`/api/yelp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({term, location})
    })
    
    const result = await res.json()
    // console.log('data', result.data.businesses)
    dispatch(getBusinesses(result.data.businesses))
    return result.data.businesses
}

export const getBusinessById = (id) => async (dispatch) => {
    // the following link worked while testing a page by id
    // `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${"eXIEbOrEar3x0ye0RYMLEw"}`
    const res = await csrfFetch(`/api/yelp/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = await res.json()
    dispatch(getSingleBusiness(data))
    return data
}

export default function yelpApiReducer(state = {}, action) {
    switch (action.type) {
        case GET_BUSINESSES:
            // let newObj = {...state}
            let newObj = {}
            action.businesses.forEach(business => {
                newObj[business.id] = business
            })
            return newObj
  
        case GET_SINGLE_BUSINESS:
            return {
                ...state,
                business: action.business
            }
        default:
            return state
    }
}