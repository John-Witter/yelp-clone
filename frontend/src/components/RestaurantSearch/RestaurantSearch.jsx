import { useState } from "react";
import * as apiCalls from "../../store/yelp-api";
const yelpKey = process.env.REACT_APP_BEARER_TOKEN


const RestaurantSearch = () => {

    //used to format the user input to use with the Yelp Fusion API
    const [userInput, setUserInput] = useState('')
    const [searchType, setSearchType] = useState('restaurantName')
    const [requestHeader, setRequestHeader] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        // switch(searchType) {
        //     case 'restaurantName':
        //         // const business = await apiCalls.getBusinessByName(userInput)
                
        //         console.log('business', business)
        //         break
        //     default: break
        // }

        const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=wendys&location=miami`, {
            headers: {
                Authorization: `Bearer ${yelpKey}`
            }
        })
        const data = await res.json()
        console.log(data)

    }



    return (
        <div className='search-form-container'>
            <h2>Search for restaurants by name, location, cuisine</h2>

            <form className="search-form" onSubmit={handleSubmit}>

                <label htmlFor="search-type">Choose a Search Type:</label>
                <select
                    className="search-type"
                    id="search-type"
                    value={searchType}
                    onChange={e => setSearchType(e.target.value)}
                >
                    <option value='restaurantName' className="search-option" 
                        defaultValue
                    >
                            name
                    </option>
                    <option value='restaurantLocation' className="search-option">location</option>
                    <option value='restaurantCuisine' className="search-option">cuisine</option>
                </select>

                <input type="text" className="search-input"
                    placeholder="search here" required
                    onChange={e => setUserInput(e.target.value)}
                />

                <button className="search-btn" type='submit'>search</button>
            </form>
        </div>
    )
}

export default RestaurantSearch