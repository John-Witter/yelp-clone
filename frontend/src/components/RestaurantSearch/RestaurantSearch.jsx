import { useState } from "react";

const RestaurantSearch = () => {

    //used to format the user input to use with the Yelp Fusion API
    const [userInput, setUserInput] = useState('')
    const [restaurantName, setRestaurantName] = useState('')
    const [restaurantLocation, setRestaurantLocation] = useState('')
    const [restaurantCuisine, setRestaurantCuisine] = useState('')
    const [searchType, setSearchType] = useState('restaurantName')
    const [requestHeader, setRequestHeader] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        switch (searchType) {
            case 'restaurantName':
                setRestaurantName(userInput)
                break
            case 'restaurantLocation':
                setRestaurantLocation(userInput)
                break
            case 'restaurantCuisine':
                setRestaurantCuisine(userInput)
                break
            default: return
        }

        console.log('search type:', searchType)
        console.log('restaurant name:', restaurantName)
        console.log('restaurant location:', restaurantLocation)
        console.log('restaurant cuisine:', restaurantCuisine)
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