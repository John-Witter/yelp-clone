import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBusinessByName } from "../../store/yelp-api";
import { getUserLocation } from "../../store/userLocation";
import './HomePage.css'

const HomePage = () => {
    const userLocation = useSelector(state => state.userLocation)
    const dispatch = useDispatch()
    // const searchTerm = 'restaurants'
    // const location = 'manhattan'
    const [searchTerm, setSearchTerm] = useState('restaurants')
    const [location, setLocation] = useState()
    const businessesObj = useSelector(state => Object.values(state.yelpAPI))
    const history = useHistory()
    
    useEffect(() => {
        dispatch(getUserLocation())
        userLocation.city && setLocation(userLocation.city)
    }, [dispatch])

    useEffect(() => {        
        if (userLocation.city) {
            console.log('!!!!!!userLocation', userLocation)
            setLocation(userLocation.city)
            dispatch(getBusinessByName(searchTerm, location))
        }
    }, [userLocation])
    
    

    const handleBusinessClick = (id) => {
        history.push(`/businesses/${id}`)
    }

    return (

        <div className='homepage-body'>
            {userLocation && <div className="intro-text">
                <h1 className='tag-line'>Find businesses anywhere!</h1>
                <p className='search-term-result'>The following results are based on the most recent search of "{searchTerm}" near "{location}"</p>
            </div>}
            {userLocation && searchTerm && location && businessesObj &&
                <div>
                    <div className='business-parent'>
                        {businessesObj?.map((business, idx) => (
                            <div className='business-frame' key={`${business.id}Home`}
                                onClick={() => handleBusinessClick(business.id)}
                            >
                                <img src={business.image_url} alt={business.name}
                                    className='business-photo'
                                />
                                <div className='business-name'>{business.name}</div>
                                <div className='business-price'>Price: {business.price}</div>
                                <div className='business-rating'>Yelp Rating: {business.rating}</div>
                            </div>
                        ))}
                    </div>
                </div>}
        </div>
    )
}

export default HomePage