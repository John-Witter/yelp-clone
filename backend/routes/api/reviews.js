const express = require('express')
const asyncHandler = require('express-async-handler')
const { Review } = require('../../db/models')
const router = express.Router()

router.post(
    '/:id',
    asyncHandler(async (req, res) => {
        const businessId = req.params.id
        const userId = req.body.userId
        const reviewText = req.body.review

        console.log('reviewText', reviewText)
        console.log('userId', userId)

        const prevReview = Review.findOne({
            where: {
                userId: userId, businessId: businessId
            }
        })

        const review = await Review.create({
            reviewText,
            userId,
            businessId
        })

        res.json({ review })


    })
)

module.exports = router