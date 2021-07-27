import { useState } from "react";
import { useSelector } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import './Rating.css'

const Rating = ({ id }) => {
    const [rating, setRating] = useState(1)
    const user = useSelector(state => state.session.user)
    const userId = user.id

    const handleClick = async (e) => {
        e.preventDefault()
        setRating(parseInt(e.target.value))

        const res = await csrfFetch(`/api/rating/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({rating, userId})
        })

        await res.json()
        // console.log('data', data.newRating)
    }

    return (
        <div className="rating-container">
            <label htmlFor="rating" className='rating-label'>Your Rating</label>
            <input id='rating1' className="rating" type="radio" name="ratingValue" value='1' onClick={(e) => handleClick(e)}/>
            <input id='rating2' className="rating" type="radio" name="ratingValue" value='2' onClick={(e) => handleClick(e)} />
            <input id='rating3' className="rating" type="radio" name="ratingValue" value='3' onClick={(e) => handleClick(e)} />
            <input id='rating4' className="rating" type="radio" name="ratingValue" value='4' onClick={(e) => handleClick(e)} />
            <input id='rating5' className="rating" type="radio" name="ratingValue" value='5' onClick={(e) => handleClick(e)} />
        </div>
    )
}

export default Rating