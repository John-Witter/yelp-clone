import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinessById } from '../../store/yelp-api'
import Review from "../Review";

const ShowSingleRestaurant = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [business, setBusiness] = useState([])
    const user = useSelector(state => state.session.user)
    
    useEffect(() => {
        const getCurrentBusiness = async() => {
            const currentBusiness = await dispatch(getBusinessById(id))
            console.log('currentBusiness', currentBusiness)
            setBusiness(currentBusiness.data)
        }
        getCurrentBusiness()
    }, [dispatch, id])
    return (
        <div>
            
                <img src={business.image_url} alt={business.name}
                    className='business-photo'
                />
                <div className='business-name'>{business.name}</div>
                <div className='business-price'>Price: {business.price}</div>
                <div className='business-rating'>Rating: {business.rating}</div>
                {user && <Review id={id}/>}
            
        </div>

    )
}

export default ShowSingleRestaurant