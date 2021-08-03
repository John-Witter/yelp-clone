import csrfFetch from "./csrf";

// constants
const POST_REVIEW = 'reviews/POST_REVIEW'

// actions
const postReviewAction = (review) => ({
    type: POST_REVIEW,
    review
})

// thunks 
export const postReview = (businessId, userId, reviewText) => async (dispatch) => {
    const res = await csrfFetch (`/api/review/${businessId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({reviewText, userId})
    })


    const data = await res.json()
    console.log('!!!!!!postReview data:', data)
    dispatch(postReviewAction(data))
}

// reducer

export default function reviewReducer (state={}, action) {
    switch(action.type) {
        case POST_REVIEW:
            const newObj = {}            
            console.log('!!!!!!POST_REVIEW action:', action)
            const userId = action.review.review.userId
            newObj[userId] = action.review.review
            return newObj
        default:
            console.log('!!!reviewReducer default action:', action)
            return state
    }
}