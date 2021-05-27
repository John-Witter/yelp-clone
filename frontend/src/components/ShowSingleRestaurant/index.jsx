import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinessById } from '../../store/yelp-api'

const ShowSingleRestaurant = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [business, setBusiness] = useState(null)
    
    useEffect(() => {
        const getBusiness = async () => {
            const currentBusiness = await dispatch(getBusinessById(id))
            setBusiness(currentBusiness)
            console.log('currentBusiness', currentBusiness)
            console.log('business', business)
        }
        
        getBusiness()
    }, [id, dispatch])
    // console.log('business', business)
    return (
        <div>
            
                {/* <img src={business.image_url} alt={business.name}
                    className='business-photo'
                />
                <div className='business-name'>{business.name}</div>
                <div className='business-price'>Price: {business.price}</div>
                <div className='business-rating'>Rating: {business.rating}</div> */}
            
        </div>

    )
}

export default ShowSingleRestaurant