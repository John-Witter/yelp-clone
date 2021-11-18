import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBusinessByName } from "../../store/yelp-api";
import { Event } from "../GoogleAnalytics/GoogleAnalytics";
import Stars from "../Yelp Stars/Stars";
import './ShowRestaurants.css'

const ShowRestaurants = () => {
    const dispatch = useDispatch()
    const businessesObj = useSelector(state => Object.values(state.yelpAPI))
    const { searchTerm, location } = JSON.parse(window.localStorage.getItem('searchObj'))
    const history = useHistory()

    useEffect(() => {
        if (searchTerm && location) {
            dispatch(getBusinessByName(searchTerm, location))
        }
    }, [dispatch])

    const handleBusinessClick = (id) => {
                Event(
                    "BUSINESS EVENT",
                    `Link clicked for business with id: ${id}`,
                    "ShowRestaurants_PAGE"
                );
        history.push(`/businesses/${id}`)
    }

    return (
        <div>
            {searchTerm && location && <h1 className='searchTermResult'>{searchTerm} near {location}</h1>}
            {/* <article className='searchDisplayText'>
                <p>Here's what we found for your search</p>
            </article> */}
            <div className='business-parent'>
                {businessesObj?.map((business, idx) => (
                    <div className='business-frame' key={business.id + idx}
                        onClick={() => handleBusinessClick(business.id)}
                    >
                        <img src={business.image_url} alt={business.name}
                            className='business-photo'
                        />
                        <div className='business-name'>{business.name}</div>

                        <div className="price-rating">
                            <div className='business-rating'> <Stars rating={business.rating} size='small' /></div>
                            <div className='business-price'>{business.price}</div>
                        </div>

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

                    </div>
                ))}
            </div>

        </div>
    )
}

export default ShowRestaurants