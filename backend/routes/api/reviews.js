const express = require('express')
const asyncHandler = require('express-async-handler')
const { Review } = require('../../db/models')
const router = express.Router()

router.get(
    '/:businessId',
    asyncHandler(async (req, res) => {
        const businessId = req.params.businessId

        const reviews = await Review.findAll({
            where: {
                businessId: businessId
            }
        })
        console.log('!!!!!!GET REVIEWS:', reviews)
        res.json({ reviews })
    })
)

router.post(
    '/:businessId',
    asyncHandler(async (req, res) => {
        const businessId = req.params.businessId
        const userId = req.body.userId
        const reviewText = req.body.reviewText

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