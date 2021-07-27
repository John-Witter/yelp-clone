import { useState } from "react";
import { useSelector } from "react-redux";
import { csrfFetch } from '../../store/csrf'
import './Review.css'

const Review = ({ id }) => {
    const [review, setReview] = useState('')
    const user = useSelector(state => state.session.user)
    const userId = user.id

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await csrfFetch(`/api/review/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({review, userId})
        })

        
        const data = await res.json()        
        console.log('data.review', data.review)
        setReview('')
    }
    return (
        <div className="review-form-container">
            <form className="review-form" onSubmit={handleSubmit}>
                <label htmlFor="review" className='review-label'>Enter Your Review Here</label>
                <textarea name="" id="review" className='review'
                     cols="30" rows="10"
                     value={review}
                     onChange={(e) => setReview(e.target.value)}
                >

                </textarea>
                <button className="review-submit-btn" type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Review