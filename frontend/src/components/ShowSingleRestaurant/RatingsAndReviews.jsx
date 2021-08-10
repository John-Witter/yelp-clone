import React, { useEffect, useState } from 'react'
import Stars from '../Yelp Stars/Stars'
import Rating from '../Rating'
import Review from '../Review'

export const RatingsAndReviews = ({ currentBusiness, currentUser = null }) => {
    const [showRatingInput, setShowRatingInput] = useState(true)
    const [showReviewInput, setShowReviewInput] = useState(true)

    let [userId, setUserId] = useState('')
    let [username, setUsername] = useState('')
    let [userRatings, setUserRatings] = useState([])
    let [userReviews, setUserReviews] = useState([])
    let [yelpReviews, setYelpReviews] = useState([])
    let [longestReviewsRatings, setLongestReviewsRatings] = useState(userReviews)


    useEffect(() => {

        if (currentBusiness === null) return

        else {


            if (currentBusiness && currentBusiness.userRatings) {
                setUserRatings(currentBusiness.userRatings)
            }

            if (currentBusiness && currentBusiness.userReviews) {
                setUserReviews(currentBusiness.userRatings)
            }

            if (currentBusiness && currentBusiness.yelpReviews) {
                setYelpReviews(currentBusiness.yelpReviews.reviews)
            }

            if (currentUser && currentUser) {
                setUserId(currentUser.id)
                setUsername(currentUser.username)
            }

            userRatings.length && userRatings.forEach(rating => {
                if (rating.userId === userId) setShowRatingInput(false)
            })

            userReviews.length && userReviews.forEach(review => {
                if (review.userId === userId) setShowReviewInput(false)
            })

        }

        console.log('U S E R R E V I E W S currentUser: :', currentUser)
        console.log('U S E R R E V I E W S currentBusiness: :', currentBusiness)
    }, [currentBusiness, currentUser])

    // create an object that contains userRatings and userReviews for
    // matching users
    // store userRatings that are unique users from userReviews in a
    // new object
    // same for userReviews


    return (
        <div className='rat-rev'>
            {/* {showRatingInput && currentBusiness && currentUser && userId && <Rating id={currentBusiness.data.id} />}
            {showReviewInput && currentBusiness && currentUser && userId && <Review id={currentBusiness.data.id} />} */}
            {currentUser && currentBusiness && currentBusiness.userReviews && currentBusiness.userReviews.map((review, idx) => {
                return (
                    <div className="user-rat-rev" key={`user-rat-rev ${idx}`}>
                        <div className="user-name">
                            <img 
                                className="yelp-user-photo user-photo"
                                src="https://images.unsplash.com/photo-1547354142-526457358bb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbGhvdWV0dGV8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" 
                                alt="profile-pic" 
                            /> 
                            <span className="username">

                                {review.User.username}
                            </span>
                            <span className="review-time-created">
                                {review.createdAt.split('T')[0]}
                            </span>
                        </div>

                        <div className="user-ratings">
                            {currentBusiness.userRatings.length && currentBusiness.userRatings.map(rating => {
                                if (rating.userId === review.userId) {
                                    return (
                                        <Stars rating={rating.rating} size='small' key={`rating-${rating.businessId}`} />
                                    )                                
                                }
                                else return null
                            })}
                        </div>


                    </div>
                )
            })}
        </div>
    )
}
