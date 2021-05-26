import { useSelector } from "react-redux";
import './CreateRestaurantDisplay.css'

const CreateRestaurantDisplay = () => {
    const businessesObj = useSelector(state => state.yelpAPI.businesses)
    // console.log('businesses', businesses)
    if (!businessesObj) return null
    const businesses = Object.values(businessesObj)
    return (
        <div className='business-parent'>
            {businesses?.map((business, idx) => (
                <div className='business-frame' key={businesses.id}>                    
                        <img src={business.image_url} alt={business.name}
                            className='business-photo'
                        />                    
                        <div className='business-name'>{business.name}</div>
                        <div className='business-price'>Price: {business.price}</div>
                        <div className='business-rating'>Rating: {business.rating}</div>
                </div>
            ))}
        </div>
    )
}

export default CreateRestaurantDisplay