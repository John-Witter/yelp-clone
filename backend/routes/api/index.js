// backend/routes/api/index.js
const router = require('express').Router()
const sessionRouter = require('./session.js')
const usersRouter = require('./users')
const yelpRouter = require('./yelp')
const reviewRouter = require('./reviews')
const ratingRouter = require('./ratings')

router.use('/session', sessionRouter)
router.use('/users', usersRouter)
router.use('/yelp', yelpRouter)
router.use('/review', reviewRouter)
router.use('/rating', ratingRouter)

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router