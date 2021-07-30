// export const getBusinessByName = (term, location) => async (dispatch) => {
//     // `https://api.yelp.com/v3/businesses/{${"eXIEbOrEar3x0ye0RYMLEw"}}`
//     const res = await fetch(`${baseUrl}term=${term}&location=${location}`, {
//         headers: {
//             Authorization: `Bearer ${yelpKey}`
//         }
//     })

//     const data = await res.json()

//     dispatch(getBusinesses(data))
//     return data

//     // const res = fetch('https://jsonplaceholder.typicode.com/todos/1')
// }

const express = require('express')
const asyncHandler = require('express-async-handler')
const fetch = require('node-fetch')
const { Review } = require('../../db/models')
const { Rating } = require('../../db/models')
const { User } = require('../../db/models')
const router = express.Router()

const yelpKey = process.env.BEARER_TOKEN
const baseUrl = 'https://api.yelp.com/v3/businesses/'

router.post('/',
    asyncHandler(async (req, res) => {
        const {term, location} = req.body
        const reqBody = req.body
        const result = await fetch(`${baseUrl}search?term=${term}&location=${location}`, {
            headers: {
                Authorization: `Bearer ${yelpKey}`
            }
        })
        const data = await result.json()
        return res.json({data})
    }))

router.get('/:id',
    asyncHandler(async (req, res) => {
        const businessId = req.params.id
        const business = await fetch(`${baseUrl}${businessId}`, {
            headers: {
                Authorization: `Bearer ${yelpKey}`
            }
        })

        const userRatingsFromDb = await Rating.findAll({where: {businessId:businessId}, include: [User]})

        if (userRatingsFromDb) userRatings = userRatingsFromDb
        else userRatings = []
    
        const userReviewsFromDb = await Review.findAll({where: {businessId:businessId}, include: [User]})

        if (userReviewsFromDb) userReviews = userReviewsFromDb
        else userReviews = []

        const yelpReviewsRes = await fetch(`${baseUrl}${businessId}/reviews`, {
            headers: {
                Authorization: `Bearer ${yelpKey}`
            }
        })
        const yelpReviews = await yelpReviewsRes.json()
        const data = await business.json()
        return res.json({data, yelpReviews, userRatings, userReviews})


    }))

module.exports = router