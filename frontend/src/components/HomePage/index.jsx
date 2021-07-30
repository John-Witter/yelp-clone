import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBusinessByName } from "../../store/yelp-api";
import './HomePage.css'

const HomePage = () => {
    const dispatch = useDispatch()
    // const searchTerm = 'restaurants'
    // const location = 'manhattan'
    const [searchTerm, setSearchTerm] = useState('restaurants')
    const [location, setLocation] = useState('manhattan')
    const businessesObj = useSelector(state => Object.values(state.yelpAPI))
    const history = useHistory()

    useEffect(() => {
        try {
            const localSearchObj = JSON.parse(localStorage.getItem('searchObj'))
            let newSearchTerm = localSearchObj.searchTerm
            let newSearchLocation = localSearchObj.location
            // setSearchTerm(newSearchTerm)
            // setLocation(newSearchLocation)
            dispatch(getBusinessByName(newSearchTerm, newSearchLocation))
        } catch (error) {
            console.log('!!!!!!error', error)
            dispatch(getBusinessByName(searchTerm, location))
        }
    }, [dispatch])

    const handleBusinessClick = (id) => {
        history.push(`/businesses/${id}`)
    }

    return (

        <div className='homepage-body'>
            <div className="intro-text">
                <h1 className='tag-line'>Find businesses anywhere!</h1>
                <p className='search-term-result'>The following results are based on the most recent search of "{searchTerm}" near "{location}"</p>
            </div>
            {searchTerm && location && businessesObj &&
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