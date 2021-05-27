import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './ShowRestaurants.css'

const ShowRestaurants = () => {
    const { searchTerm, location } = JSON.parse(window.localStorage.getItem('searchObj'))
    const businessesObj = useSelector(state => Object.values(state.yelpAPI))
    const history = useHistory()
    if (!businessesObj) return null

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
                {businessesObj?.map((business, idx) => (
                    <div className='business-frame' key={business.id}
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