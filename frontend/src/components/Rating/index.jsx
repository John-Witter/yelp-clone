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

        const data = await res.json()
        // console.log('data', data.newRating)
    }

    return (
        <div className="rating-container">
            <label htmlFor="rating" className='rating-label'>Rating</label>
            <input id='rating' className="rating" type="radio" name="ratingValue" value='1' id='1' onClick={(e) => handleClick(e)}/>
            <input id='rating' className="rating" type="radio" name="ratingValue" value='2' id='2' onClick={(e) => handleClick(e)} />
            <input id='rating' className="rating" type="radio" name="ratingValue" value='3' id='3' onClick={(e) => handleClick(e)} />
            <input id='rating' className="rating" type="radio" name="ratingValue" value='4' id='4' onClick={(e) => handleClick(e)} />
            <input id='rating' className="rating" type="radio" name="ratingValue" value='5' id='5' onClick={(e) => handleClick(e)} />
        </div>
    )
}

export default Rating