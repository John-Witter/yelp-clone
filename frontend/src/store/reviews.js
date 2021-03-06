import csrfFetch from "./csrf";

// constants
const POST_REVIEW = 'reviews/POST_REVIEW'
const GET_REVIEWS_FOR_BUSINESS = 'reviews/GET_REVIEWS_FOR_BUSINESS'

// actions
const getReviewsForBusinessAction = (reviews) => ({
    type: GET_REVIEWS_FOR_BUSINESS,
    reviews
})

const postReviewAction = (review) => ({
    type: POST_REVIEW,
    review
})

// thunks 
export const getReviewsForBusiness = (businessId) => async (dispatch) => {
    const res = await csrfFetch(`/api/review/${businessId}`)

    const data = await res.json()
    dispatch(getReviewsForBusinessAction(data))
}

export const postReview = (businessId, userId, reviewText) => async (dispatch) => {
    const res = await csrfFetch (`/api/review/${businessId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({reviewText, userId})
    })


    const data = await res.json()
    dispatch(postReviewAction(data))
}

// reducer

export default function reviewReducer (state={}, action) {
    switch(action.type) {
        case GET_REVIEWS_FOR_BUSINESS:
            const reviews = {}
            // console.log('!!!GET_REVIEWS_FOR_BUSINESS action:', action)
            action.reviews.reviews.forEach(review => {
                const userId = review.userId
                reviews[userId] = review
            })
            return reviews

        case POST_REVIEW:
            const newObj = {...state}            
            // console.log('!!!!!!POST_REVIEW action:', action)
            const userId = action.review.review.userId
            newObj[userId] = action.review.review
            return newObj

        default:
            // console.log('!!!reviewReducer default action:', action)
            return state
    }
}