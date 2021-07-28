import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinessById } from '../../store/yelp-api'
import Rating from "../Rating";
import Review from "../Review";
import './ShowSingleRestaurant.css'

const ShowSingleRestaurant = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [business, setBusiness] = useState([])
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        const getCurrentBusiness = async () => {
            const currentBusiness = await dispatch(getBusinessById(id))
            console.log('currentBusiness', currentBusiness)
            setBusiness(currentBusiness.data)
        }
        getCurrentBusiness()
    }, [dispatch, id])
    return (
        <div className='single-business-parent'>

            {business && <div className='single-business-frame' key={business.id}>

                <div className="photos">
                    <img src={business.photos[0]} alt={business.name}
                        className='business-photo photo1'
                    />
                    <img src={business.photos[1]} alt={business.name}
                        className='business-photo photo2'
                    />
                    <img src={business.photos[2]} alt={business.name}
                        className='business-photo photo 3'
                    />
                </div>

                <div className='business-name'>{business.name}</div>
                <div className='business-price'>Price: {business.price}</div>
                <div className='business-rating'>Yelp Rating: {business.rating}</div>
            </div>}
            {user && <Rating id={id} />}
            {user && <Review id={id} />}

        </div>

    )
}

export default ShowSingleRestaurant