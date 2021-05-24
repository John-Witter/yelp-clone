import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBusinessByName } from "../../store/yelp-api";
const yelpKey = process.env.REACT_APP_BEARER_TOKEN


const RestaurantSearch = () => {

    //used to format the user input to use with the Yelp Fusion API
    const [searchTerm, setSearchTerm] = useState('')
    const [location, setLocation] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = await dispatch(getBusinessByName(searchTerm, location))
        console.log('data', data)

        // const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchTerm}&location=${location}`, {
        //     headers: {
        //         Authorization: `Bearer ${yelpKey}`
        //     }
        // })
        // const data = await res.json()
        // console.log(data)

    }



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