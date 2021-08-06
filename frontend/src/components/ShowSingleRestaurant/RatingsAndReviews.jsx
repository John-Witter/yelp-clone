import React, { useEffect, useState } from 'react'
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

        console.log('U S E R R E V I E W S : :', currentUser)
        console.log('U S E R R E V I E W S : :', currentBusiness)
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
        </div>
    )
}
