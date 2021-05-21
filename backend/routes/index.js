// backend/routes/index.js
const express = require('express')
const router = express.Router()
const apiRouter = require('./api')

// all the URLs of the routes in the api router will be prefixed with /api
router.use('/api', apiRouter)

module.exports = router