// backend/routes/api/index.js
const router = require('express').Router()
const sessionRouter = require('../api/session.js')
const usersRouter = require('../api/users')

router.use('/session', sessionRouter)
router.use('/users', usersRouter)

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router