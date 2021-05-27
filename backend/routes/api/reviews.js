const express = require('express')
const asyncHandler = require('express-async-handler')
const Review = require('../../db/models/review')
const router = express.Router()

router.post(
    '/:id',
    asyncHandler(async (req, res) => {
        const businessId = parseInt(req.params.id, 10)
        const  { userId } = req.session.auth
        const reviewText = req.body
        const review = await Review.build({
            reviewText,
            userId,
            businessId
        })
        console.log('review', review)
        await review.save()
        console.log('review!!!!', review)
        res.render({review})
    })
)

module.exports = router