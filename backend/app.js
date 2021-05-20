const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const csurf = require('csurf')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const routes = require('./routes')
const { environment } = require('./config')
const isProduction = environment === 'production'

//initialize the express app
const app = express()

//connect morgan middleware for logging info about requests & responses
app.use(morgan('dev'))

//middleware for parsing cookies
app.use(cookieParser())

//middleware for parsing JSON bodies w/type "application/json"
app.use(express.json())

// Security Middlewares
if (!isProduction) {
    //enable cors only in development
    app.use(cors())
}

//helmet helps set a variety of headers to better secure your app
app.use(helmet({
    contentSecurityPolicy: false
}))

//set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: false
        }
    })
)

//connect all the routes
app.use(routes)

module.exports = app