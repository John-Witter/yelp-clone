import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './ShowRestaurants.css'

const ShowRestaurants = () => {
    const { searchTerm, location } = JSON.parse(window.localStorage.getItem('searchObj'))
    const businessesObj = useSelector(state => state.yelpAPI.businesses)
    const history = useHistory()
    // console.log('businesses', businesses)
    if (!businessesObj) return null
    const businesses = Object.values(businessesObj)

    const handleBusinessClick = (id) => {
        history.push(`/businesses/${id}`)
    }

    return (
        <div>

            <h1>"{searchTerm}" near "{location}"</h1>
            <article>
                <p>Here's what we found for your search</p>
            </article>

            <div className='business-parent'>
                {businesses?.map((business, idx) => (
                    <div className='business-frame' key={businesses.id}
                        onClick={() => handleBusinessClick(business.id)}
                    >
                        <img src={business.image_url} alt={business.name}
                            className='business-photo'
                        />
                        <div className='business-name'>{business.name}</div>
                        <div className='business-price'>Price: {business.price}</div>
                        <div className='business-rating'>Rating: {business.rating}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ShowRestaurants