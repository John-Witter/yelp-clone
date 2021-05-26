import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBusinessByName } from "../../store/yelp-api";



const RestaurantSearch = () => {

    //used to format the user input to use with the Yelp Fusion API
    const [searchTerm, setSearchTerm] = useState(null)
    const [location, setLocation] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = await dispatch(getBusinessByName(searchTerm, location))
        const searchObj = {'searchTerm': searchTerm, "location": location}
        window.localStorage.setItem('searchObj', JSON.stringify(searchObj))
        history.push('/restaurants')
    }

    useEffect(() => {
        const localSearchObj = JSON.parse(window.localStorage.getItem('searchObj'))

        if (localSearchObj) {
            let newSearchTerm = localSearchObj.searchTerm
            let newSearchLocation = localSearchObj.searchLocation
            console.log('!!!!!!#@#@#@#!@#!#')
            dispatch(getBusinessByName(newSearchTerm, newSearchLocation))
        }

    }, [dispatch])

    return (
        <div className='search-form-container'>
            <h2>Search for restaurants</h2>

            <form className="search-form" onSubmit={handleSubmit}>

                <label htmlFor="search-input">Search For:</label>
                <input type="text" id='search-input' className="search-input"
                    placeholder="search restaurants" required
                    onChange={e => setSearchTerm(e.target.value)}
                />


                <label htmlFor="search-input">Near:</label>
                <input type="text" id='search-input' className="search-input"
                    placeholder="enter location" required
                    onChange={e => setLocation(e.target.value)}
                />

                <button className="search-btn" type='submit'>search</button>
            </form>
        </div>
    )
}

export default RestaurantSearch