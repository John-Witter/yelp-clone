const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const csurf = require('csurf')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const routes = require('./routes')
const { ValidationError } = require('sequelize')
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


//server error handlers

//catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.")
    err.title = "Resource Not Found"
    err.errors = ["The requested resource couldn't be found."]
    err.status = 404
    next(err)
})

//catch and format sequelize errors
app.use((_req, _res, next) => {
    //check if error is a Sequelize error
    if (err instanceof ValidationError) {
        err.errors = err.errors.map(e => e.message)
        err.title = 'Validation error'
    }
    next(err)
})

// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app
