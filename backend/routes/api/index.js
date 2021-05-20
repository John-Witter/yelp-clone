// backend/routes/api/index.js
const router = require('express').Router()
const sessionRouter = require('../api/session.js')
const usersRouter = require('../api/users')

router.use('/session', sessionRouter)
router.use('/users', usersRouter)

module.exports = router