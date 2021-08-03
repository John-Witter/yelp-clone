import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { postRating } from "../../store/ratings";
import Stars from "../Yelp Stars/Stars";
import './Rating.css'

const Rating = ({ id }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userId = user.id    

    const handleClick = async (e) => {
        e.preventDefault()
        // const rating = e.target.value
        // console.log(rating)
        // const res = await csrfFetch(`/api/rating/${id}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({rating, userId})
        // })

        // const data = await res.json()
        // console.log('data', data.newRating)
        dispatch(postRating(id, userId, e.target.value))

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