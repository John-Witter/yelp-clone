import csrfFetch from "./csrf"

// constants
const POST_RATING = 'ratings/POST_RATING'

// actions 
const postRatingAction = (rating) => ({
    type: POST_RATING,
    rating
})


// thunks
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
        console.log('!!!!!!postRating data:', data)
        dispatch(postRatingAction(data))
    }
}


// reducer
export default function ratingReducer(state = {}, action) {    
    switch(action.type) {
        case POST_RATING:
            console.log('!!!!!!POST_RATING action:', action)
            const newRating = {rating: action.rating.newRating}
            return newRating
        default:
            return state
    }
}