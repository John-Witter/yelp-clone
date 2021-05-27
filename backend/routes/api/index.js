// backend/routes/api/index.js
const router = require('express').Router()
const sessionRouter = require('../api/session.js')
const usersRouter = require('../api/users')
const yelpRouter = require('../api/yelp')
const reviewRouter = require('../api/reviews')

router.use('/session', sessionRouter)
router.use('/users', usersRouter)
router.use('/yelp', yelpRouter)
router.use('/review', reviewRouter)

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router