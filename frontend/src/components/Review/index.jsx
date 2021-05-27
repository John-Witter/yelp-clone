import { useState } from "react";
import { csrfFetch } from '../../store/csrf'

const Review = ({ id }) => {
    const [review, setReview] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = csrfFetch(`/review/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        })

        console.log('res', res)
        const data = await res.parse()
        console.log('!!!review', data)
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