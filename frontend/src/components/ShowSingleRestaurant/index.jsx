import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinessById } from '../../store/yelp-api'
import Rating from "../Rating";
import Review from "../Review";
// import BusinessMap from './BusinessMap'
import BusinessMap from "../Map/BusinessMap";
import './ShowSingleRestaurant.css'

const ShowSingleRestaurant = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [business, setBusiness] = useState([])
    const [yelpReviews, setYelpReviews] = useState([])
    const [userRatings, setUserRatings] = useState([])
    const [userReviews, setUserReviews] = useState([])
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        const getCurrentBusiness = async () => {
            const currentBusiness = await dispatch(getBusinessById(id))
            console.log('currentBusiness', currentBusiness)
            setBusiness(currentBusiness.data)
            setYelpReviews(currentBusiness.yelpReviews.reviews)
            setUserRatings(currentBusiness.userRatings)
            setUserReviews(currentBusiness.userReviews)
            if (business.categories) {
                console.log('!!!!!business.categories.title', business.categories[0].title)
            }
        }
        getCurrentBusiness()
    }, [dispatch, id])

    return (
        <div className='single-business-parent'>

            <div className='single-business-frame' key={business.id}>
                <div className='single-business-name'>
                    {business.name}
                </div>
                <div className="single-business-alias-container">
                    {business.categories &&
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
                <div className="yelp-info">
                    <div className='single-business-price'>
                        Price: {business.price}
                    </div>
                    <div className='single-business-rating'>
                        Yelp Rating: {business.rating}
                    </div>
                </div>
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
                <div className="business-map">
                    {business.coordinates &&
                        <BusinessMap lat={business.coordinates.latitude}
                    lng={business.coordinates.longitude}
                />
                    }
                </div>
                <div className="rat-rev">
                    {user && <Rating id={id} />}
                    {user && <Review id={id} />}
                    {userReviews && userReviews.map((review, idx) => (
                        <div className="user-rat-rev" key={`user-rat-rev ${idx}`}>
                            <div className="user-name">
                                {user && review.User.username === user.username ? `Your Review` : review.User.username} <span className='review-time-created'>{review.createdAt.split('T')[0]}</span>
                            </div>
                            <div className="user-ratings">
                                Rating: {userRatings[idx] && userRatings[idx].rating}
                            </div>
                            <div className="user-reviews">
                                {review.reviewText && review.reviewText}
                            </div>
                        </div>
                    ))}
                    {yelpReviews && yelpReviews.map(review => {
                        return (
                            <div className="yelp-rat-rev" key={review.id}>
                                <div className="yelp-review-user">
                                    {/* <img src={review.user.image_url} 
                                        alt= {review.user.name} 
                                        className='yelp-user-image' /> */}
                                    {review.user.name} <span className='review-time-created'>{review.time_created.split(' ')[0]}</span>
                                </div>
                                <div className="yelp-rating">
                                    Rating: {review.rating}
                                </div>
                                <div className="yelp-review">
                                    {review.text}
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>

        </div>

    )
}

export default ShowSingleRestaurant