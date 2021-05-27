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
const router = express.Router()

const yelpKey = process.env.BEARER_TOKEN
const baseUrl = 'https://api.yelp.com/v3/businesses/?'

router.post('/',
    asyncHandler(async (req, res) => {
        const {term, location} = req.body
        const reqBody = req.body
        console.log('reqBody', reqBody)
        const result = await fetch(`${baseUrl}search?term=${term}&location=${location}`, {
            headers: {
                Authorization: `Bearer ${yelpKey}`
            }
        })
        const data = await result.json()
        return res.json({data})
    }))

router.post('/:id',
    asyncHandler(async (req, res) => {
        const businessId = req.params.id
        const result = await fetch(`${baseUrl}${businessId}`, {
            headers: {
                Authorization: `Bearer ${yelpKey}`
            }
        })
        const data = await result.json()
        return res.json({data})


    }))

module.exports = router