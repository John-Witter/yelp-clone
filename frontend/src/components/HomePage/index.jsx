import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBusinessByName } from "../../store/yelp-api";
import Stars from "../Yelp Stars/Stars";
// import { getUserLocation } from "../../store/userLocation";
import './HomePage.css'

const HomePage = () => {
    // const userLocation = useSelector(state => state.userLocation)
    const dispatch = useDispatch()
    // const searchTerm = 'restaurants'
    // const location = 'manhattan'
    const [searchTerm, setSearchTerm] = useState('restaurants')
    const [location, setLocation] = useState('')
    const businessesObj = useSelector(state => Object.values(state.yelpAPI))
    const history = useHistory()


    useEffect(() => {
        const getUserLocation = async () => {
            const res = await fetch('https://ipapi.co/json/')
            if (res.ok) {
                const data = await res.json()
                setLocation(data.city)
            }
        }
        getUserLocation()
    }, [dispatch])

    useEffect(() => {
        if (location) {
            dispatch(getBusinessByName(searchTerm, location))
        }
    }, [location])

    const handleBusinessClick = (id) => {
        history.push(`/businesses/${id}`)
    }

    return (

        <div className='homepage-body'>
            {location && <div className="intro-text">
                <h1 className='tag-line'>Find businesses anywhere!</h1>
                <p className='search-term-result'>The following results are based on the most recent search of "{searchTerm}" near "{location}"</p>
            </div>}
            {location && searchTerm && location && businessesObj &&
                <div>
                    <div className='business-parent'>
                        {businessesObj?.map((business, idx) => (
                            <div className='business-frame' key={business.id + idx}
                                onClick={() => handleBusinessClick(business.id)}
                            >
                                <div className='business-name'>{business.name}</div>
                                <div className="price-rating">
                                    <div className='business-rating'> {business.review_count} reviews <Stars rating={business.rating} size='small' /></div>
                                    <div className='business-price'>{business.price}</div>
                                </div>
                                <img src={business.image_url} alt={business.name}
                                    className='business-photo'
                                />

                                <div className="business-description">
                                    <div className="business-category-container">
                                        {business.categories && business.categories.map(category => (
                                            <div className='business-category'
                                                key={`${business.name}-${category.title}`}>
                                                {category.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="business-address">
                                    <div className="business-address-line-1">
                                        {business.location.display_address[0]}
                                    </div>
                                    <div className="business-address-line-2">
                                        {business.location.display_address[1]}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>}
        </div>
    )
}

export default HomePage


/*
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
*/