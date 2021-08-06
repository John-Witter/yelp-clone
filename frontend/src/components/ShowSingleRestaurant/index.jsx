import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinessById } from '../../store/yelp-api'
import { getReviewsForBusiness } from "../../store/reviews";
import { getRatingsForBusiness } from "../../store/ratings";
import Rating from "../Rating";
import Review from "../Review";
import BusinessMap from "../Map/BusinessMap";
import Stars from "../Yelp Stars/Stars";
import { RatingsAndReviews } from "./RatingsAndReviews";
import './ShowSingleRestaurant.css'

const ShowSingleRestaurant = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [business, setBusiness] = useState([])
    const [yelpReviews, setYelpReviews] = useState([])
    const [userRatings, setUserRatings] = useState([])
    const [userReviews, setUserReviews] = useState([])
    const user = useSelector(state => state.session.user)
    const currentRatings = useSelector(state => state.rating)
    const currentReviews = useSelector(state => state.review)
    const [currentRatingsUserIds, setCurrentRatingsUserIds] = useState([])
    // const [showRatingInput, setShowRatingInput] = useState(currentRatingsUserIds.includes(user.id))
    const [showRatingInput, setShowRatingInput] = useState(true)
    const [showReviewInput, setShowReviewInput] = useState(true)
    const [currentBusiness, setCurrentBusiness] = useState(null)

    useEffect(() => {
        const getCurrentBusiness = async () => {
            const currentBusiness111 = await dispatch(getBusinessById(id))
            console.log('currentBusiness111', currentBusiness111)
            setCurrentBusiness(currentBusiness111)
            setBusiness(currentBusiness111.data)
            setYelpReviews(currentBusiness111.yelpReviews.reviews)
            // setUserRatings(currentBusiness.userRatings)
            // setUserReviews(currentBusiness.userReviews)
            if (business.categories) {
                // console.log('!!!!!business.categories.title', business.categories[0].title)
            }
            if (user) {
                if (currentBusiness && currentBusiness.userRatings.length) setCurrentRatingsUserIds(currentBusiness.userRatings.map(rating => {
                    return rating.userId
                }))
                setShowReviewInput(currentRatingsUserIds.includes(user.id))
                setShowRatingInput(currentRatingsUserIds.includes(user.id))
                // console.log('!!!currentRatingsUserIds.includes(user.id):', currentRatingsUserIds.includes(user.id), 'currentRatingsUserIds', currentRatingsUserIds)
                // console.log('!!!currentRatingsUserIds.includes(user.id):', currentRatingsUserIds.includes(user.id), 'user', user)

            }
        }
        dispatch(getReviewsForBusiness(id))
        dispatch(getRatingsForBusiness(id))
        getCurrentBusiness()
        Object.keys(currentRatings).length && console.log('!!!!!!currentRatings:', currentRatings)
        Object.keys(currentReviews).length && console.log('!!!!!!currentReviews:', currentReviews)
        // currentRatings && console.log('currentRatings', currentRatings)
        // currentRatingsUserIds && console.log('currentRatingsUserId', currentRatingsUserIds)
    }, [dispatch, id])

    const formatTime = (inputTime) => {
        let amPm = ''
        let returnTime = ''
        if (inputTime <= 1200) {
            amPm += ' AM'
            returnTime += inputTime.slice(0, 2)
        } else {
            amPm += ' PM'
            returnTime += Number(inputTime.slice(0, 2)) - 12
        }

        returnTime += ':'
        returnTime += inputTime.slice(2)
        returnTime += amPm
        return returnTime
    }

    return (
        <div className='single-business-parent'>

            <div className='single-business-frame' key={business.id}>
                <div className='single-business-name'>
                    {business.name} <Stars rating={business.rating} size='large' /> <span className="review-number">{business.review_count} Yelp reviews</span>
                </div>
                <div className="single-business-alias-container">
                    {business.price}{business.categories &&
                        business.categories.map(category => (
                            <div className="single-business-alias" key={category.alias}>
                                {category.title}
                            </div>
                        ))
                    }
                </div>
                {business.location && <div className="single-business-info">
                    <div className="single-business-phone">
                        {business.display_phone}
                    </div>
                    <div className="single-business-address-street">
                        {business.location.display_address[0]}
                    </div>
                    <div className="single-business-address-city">
                        {business.location.display_address[1]}
                    </div>
                </div>}

                {business.photos && <div className="photos">
                    <img src={business.photos[0]} alt={business.name}
                        className='single-business-photo photo1'
                    />
                    <img src={business.photos[1]} alt={business.name}
                        className='single-business-photo photo2'
                    />
                    <img src={business.photos[2]} alt={business.name}
                        className='single-business-photo photo 3'
                    />
                </div>}

                <div className="ra-ra-map">
                    {currentBusiness && <RatingsAndReviews currentBusiness={currentBusiness} currentUser={user} />}
                    {user && showRatingInput && <Rating id={id} />}
                    {user && showReviewInput && <Review id={id} />}
                    {user && console.log('showRatingInput:', showRatingInput, 'showReviewInput:', showReviewInput, 'id:', id)}
                    {/* <div className="rat-rev">

                        {showRatingInput && console.log('showRatingInput:', showRatingInput)}
                        {!showRatingInput && user.id && console.log('!showRatingInput:', showRatingInput, '(currentRatingsUserIds.includes(user.id)):', (currentRatingsUserIds.includes(user.id)), 'currentRatingsUserIds:', currentRatingsUserIds, 'user:', user, 'userReviews', userReviews, 'currentRatings:', currentRatings, 'currentReviews:', currentReviews)}

                        {Object.keys(currentRatings).length && console.log('!!!!!!currentRatings:', currentRatings)}

                        {Object.keys(currentReviews).length && console.log('!!!!!!currentReviews:', currentReviews)}


                        <RatingsAndReviews currentBusiness={currentBusiness} currentUser={user} />


                        {Object.keys(currentReviews).length && Object.keys(currentReviews).map((review, idx) => (
                            <div className="user-rat-rev" key={`user-rat-rev ${idx}`}>
                                {console.log('$$$$$$$$review:', currentReviews[review])}
                                <div className="user-name">
                                    <img src="https://images.unsplash.com/photo-1547354142-526457358bb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNpbGhvdWV0dGV8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt='profile pic" alt="profile pic" className="yelp-user-photo user-photo" /> {user.id && currentReviews[review].userId === user.id ? `Your Review`: `USERNAME TODO`} <span className="review-time-created">{currentReviews[review].createdAt.split('T')[0]}</span>
                                </div>
                                <div className="user-ratings">
                                    {currentRatings[review] && <Stars rating={currentRatings[review].rating} size='small' />}
                                </div>
                                <div className="user-reviews">
                                    {currentReviews[review].reviewText && currentReviews[review].reviewText}
                                </div>
                            </div>                            
                        ))}


                        {yelpReviews && yelpReviews.map(review => {
                            return (
                                <div className="yelp-rat-rev" key={review.id}>
                                    <div className="yelp-review-user">

                                        <div className="yelp-user-photo-container">
                                            <img className='yelp-user-photo' src={review.user.image_url} alt={review.user.name} /></div> {review.user.name} <span className='review-time-created'>{review.time_created.split(' ')[0]}</span>
                                    </div>
                                    <div className="yelp-rating">

                                        <Stars rating={review.rating} size='small' />
                                    </div>
                                    <div className="yelp-review">
                                        {review.text}
                                    </div>
                                </div>
                            )
                        })}
                    </div> */}

                    <div className="business-map">
                        {business.coordinates &&
                            <BusinessMap lat={business.coordinates.latitude}
                                lng={business.coordinates.longitude}
                            />
                        }
                    </div>

                    {business.hours && <div className="business-hours">
                        <div className="business-hours-title">
                            Hours
                        </div>
                        <div className="day">
                            <div className="business-hours-day-container">
                                <div className='business-hours-day'>
                                    Mon
                                </div>
                            </div>
                            <div className="business-hours-open">
                                {formatTime(business.hours[0].open[0].start)}
                            </div>
                            <div className="business-hours-dash">
                                -
                            </div>
                            <div className="business-hours-close">
                                {formatTime(business.hours[0].open[0].end)}
                            </div>
                        </div>
                        <div className="day">
                            <div className='business-hours-day-container'>
                                <div className="business-hours-day">
                                    Tue
                                </div>
                            </div>
                            <div className="business-hours-open">
                                {formatTime(business.hours[0].open[0].start)}
                            </div>
                            <div className="business-hours-dash">
                                -
                            </div>
                            <div className="business-hours-close">
                                {formatTime(business.hours[0].open[0].end)}
                            </div>
                        </div>
                        <div className="day">
                            <div className='business-hours-day-container'>
                                <div className="business-hours-day">
                                    Wed
                                </div>
                            </div>
                            <div className="business-hours-open">
                                {formatTime(business.hours[0].open[0].start)}
                            </div>
                            <div className="business-hours-dash">
                                -
                            </div>
                            <div className="business-hours-close">
                                {formatTime(business.hours[0].open[0].end)}
                            </div>
                        </div>
                        <div className="day">
                            <div className='business-hours-day-container'>
                                <div className="business-hours-day">
                                    Thu
                                </div>
                            </div>
                            <div className="business-hours-open">
                                {formatTime(business.hours[0].open[0].start)}
                            </div>
                            <div className="business-hours-dash">
                                -
                            </div>
                            <div className="business-hours-close">
                                {formatTime(business.hours[0].open[0].end)}
                            </div>
                        </div>
                        <div className="day">
                            <div className='business-hours-day-container'>
                                <div className="business-hours-day">
                                    Fri
                                </div>
                            </div>
                            <div className="business-hours-open">
                                {formatTime(business.hours[0].open[0].start)}
                            </div>
                            <div className="business-hours-dash">
                                -
                            </div>
                            <div className="business-hours-close">
                                {formatTime(business.hours[0].open[0].end)}
                            </div>
                        </div>
                        <div className="day">
                            <div className='business-hours-day-container'>
                                <div className="business-hours-day">
                                    Sat
                                </div>
                            </div>
                            <div className="business-hours-open">
                                {formatTime(business.hours[0].open[0].start)}
                            </div>
                            <div className="business-hours-dash">
                                -
                            </div>
                            <div className="business-hours-close">
                                {formatTime(business.hours[0].open[0].end)}
                            </div>
                        </div>
                        <div className="day">
                            <div className='business-hours-day-container'>
                                <div className="business-hours-day">
                                    Sun
                                </div>
                            </div>
                            <div className="business-hours-open">
                                {formatTime(business.hours[0].open[0].start)}
                            </div>
                            <div className="business-hours-dash">
                                -
                            </div>
                            <div className="business-hours-close">
                                {formatTime(business.hours[0].open[0].end)}
                            </div>
                        </div>
                    </div>}

                </div> {/* end ra-ra-map */}

            </div>

        </div>

    )
}

export default ShowSingleRestaurant