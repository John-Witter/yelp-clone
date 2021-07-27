import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBusinessByName } from "../../store/yelp-api";
import './RestaurantSearch.css'



const RestaurantSearch = () => {

    //used to format the user input to use with the Yelp Fusion API
    const [searchTerm, setSearchTerm] = useState('')
    const [location, setLocation] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await dispatch(getBusinessByName(searchTerm, location))
        // const searchObj = {'searchTerm': searchTerm, "location": location}
        // window.localStorage.setItem('searchObj', JSON.stringify(searchObj))
        history.push('/businesses')
    }

    //add to store as thunk
    useEffect(() => {
        // const localSearchObj = JSON.parse(window.localStorage.getItem('searchObj'))

        if (searchTerm && location) {
        //     let newSearchTerm = localSearchObj.searchTerm
        //     let newSearchLocation = localSearchObj.searchLocation
            dispatch(getBusinessByName(searchTerm, location))
        }

    }, [dispatch])

    return (
        <div className='search-form-container'>
            <form className="search-form" onSubmit={handleSubmit}>

                <label htmlFor="search-input">Search For:</label>
                <input type="text" id='search-input' className="search-input"
                    placeholder="sushi, theaters, etc..." required
                    onChange={e => setSearchTerm(e.target.value)}
                />


                <label htmlFor="location-input">Near:</label>
                <input type="text" id='location-input' className="location-input"
                    placeholder="enter location" required
                    onChange={e => setLocation(e.target.value)}
                />

                <button className="search-btn" type='submit'>search</button>
            </form>
        </div>
    )
}

export default RestaurantSearch