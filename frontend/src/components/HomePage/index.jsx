import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import './HomePage.css'

const HomePage = () => {
    const searchTerm = 'restaurants'
    const location = 'manhattan'
    const businessesObj = useSelector(state => Object.values(state.yelpAPI))
    const history = useHistory()

    const handleBusinessClick = (id) => {
        history.push(`/businesses/${id}`)
    }



    return (

        <div className='homepage-body'>
            <div className="intro-text">
                <h1>Welcome to my Yelp Clone!!!</h1>
                <h2>This app is here to help you find businesses anywhere!</h2>
            </div>
            {searchTerm && location && businessesObj &&
            <div>
                <p className='search-term-result'>The following results are based on the most recent search of "{searchTerm}" near "{location}"</p>
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
            </div>}
        </div>
    )
}

export default HomePage