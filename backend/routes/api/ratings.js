const express = require('express')
const asyncHandler = require('express-async-handler')
const { Rating } = require('../../db/models')
const router = express.Router()

router.post(
    '/:businessId',
    asyncHandler(async (req, res) => {
        const businessId = req.params.businessId
        const userId = req.body.userId
        const rating = req.body.rating

        console.log('rating', rating)
        console.log('userId', userId)
        console.log('businessId', businessId)

        const prevRating = Rating.findOne({ where: { userId: userId, businessId: businessId } })

        const newRating = await Rating.create({
            rating,
            userId,
            businessId
        })

        res.json({ newRating })
    })
)

module.exports = router