import CreateRestaurantDisplay from "../CreateRestaurantDisplay";

const ShowRestaurants = () => {
    const {searchTerm, location} = JSON.parse(window.localStorage.getItem('searchObj'))

    console.log('searchTerm', searchTerm)
    console.log('location', location)

    return (
        <div>

            <h1>"{searchTerm}" near "{location}"</h1>
            <article>
                <p>Here's what we found for your search</p>
            </article>
            <CreateRestaurantDisplay />
        </div>
    )
}

export default ShowRestaurants