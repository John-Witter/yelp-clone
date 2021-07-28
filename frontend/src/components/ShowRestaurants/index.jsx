import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBusinessByName } from "../../store/yelp-api";
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
                        <div className='business-price'>Price: {business.price}</div>
                        <div className='business-rating'>Yelp Rating: {business.rating}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ShowRestaurants