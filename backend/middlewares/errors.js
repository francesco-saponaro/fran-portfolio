// Import error handler class
const ErrorHandler = require('../utils/errorHandler');

// This middleware function will be used by the app to handle errors (see app.js)
module.exports = (err, req, res, next) => {
    
    // If err doesnt contain a status code, it will be 500 by default (Internal server error)
    err.statusCode = err.statusCode || 500;

    // In development mode we want the response to return the full error info 
    if(process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success:false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    // In production mode only show the error message as we dont want to expose the rest of the info
    if(process.env.NODE_ENV === 'PRODUCTION') {

        let error = {...err}
        error.message = err.message
        
        // Wrong Mongoose Object ID Error
        if(err.name === 'CastError') {
            const message = `Resource not found: invalid ${err.path}`
            error = new ErrorHandler(message, 404)
        }

        // Handle Mongoose validation error (for example adding a model instance without name)
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message, 404)
        }

        // Handle Mongoose duplicate key errors (for example adding a user with same email)
        if(err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message, 400) 
        }

        // Handle wrong JWT error
        if(err.name === 'JsonWebTokenError') {
            const message = 'JSON Web Token is invalid'
            error = new ErrorHandler(message, 400)
        }

        // Handle expired JWT error
        if(err.name === 'TokenExpiredError') {
            const message = 'JSON Web Token is expired'
            error = new ErrorHandler(message, 400 )
        }

        res.status(error.statusCode).json({
            success:false,
            errMessage: error.message || 'Internal Server Error'
        })

    }
}