import csrfFetch from "./csrf"

// constants
const POST_RATING = 'ratings/POST_RATING'
const GET_RATINGS_FOR_BUSINESS = 'ratings/GET_RATINGS_FOR_BUSINESS'

// actions 
const getRatingsForBusinessAction = (ratings) => ({
    type: GET_RATINGS_FOR_BUSINESS,
    ratings
})

const postRatingAction = (rating) => ({
    type: POST_RATING,
    rating
})


// thunks
export const getRatingsForBusiness = (businessId) => async (dispatch) => {
    const res = await csrfFetch(`/api/rating/${businessId}`)
    const data = await res.json()
    dispatch(getRatingsForBusinessAction(data))
}

export const postRating = (businessId, userId, rating) => async (dispatch) => {
    const res = await csrfFetch(`/api/rating/${businessId}`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({rating, userId})
    })

    if (res.ok) {
        const data = await res.json()
        // console.log('!!!!!!postRating data:', data)
        dispatch(postRatingAction(data))
    }
}


// reducer
export default function ratingReducer(state = {}, action) {    
    switch(action.type) {
        case GET_RATINGS_FOR_BUSINESS:
            const ratings = {}
            // console.log('!!!GET_RATINGS_FOR_BUSINESS action:', action)
            action.ratings.ratings.forEach(rating => {
                const userId = rating.userId
                ratings[userId] = rating
            })
            return ratings

        case POST_RATING:
            // console.log('!!!!!!POST_RATING action:', action)
            const newRating = {}
            const userId = action.rating.newRating.userId
            newRating[userId] = action.rating.newRating
            return newRating
        default:
            return state
    }
}