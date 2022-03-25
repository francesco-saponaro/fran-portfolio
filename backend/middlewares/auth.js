// Import user model
const User = require('../models/user');
// Import error handler class
const ErrorHandler = require('../utils/errorHandler');
// Import catch async errors class
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
// Import package used to release jwt token
const jwt = require('jsonwebtoken');

// This middleware function checks if user is authenticated, to be attached to required routes
exports.isUserAuthenticated = catchAsyncErrors( async(req, res, next) => {

    // Get token from the cookies, token should have been sent to the cookies 
    // by the login controller.
    const { token } = req.cookies;

    // If there is no token, meaning user hasnt logged in, send error
    if(!token) {
        return next(new Error('You must log in to access this page', 401));
    }

    // If there's a token in the cookies, verify that it matches the 
    // token in the environment variables. 
    // If so find a user by the user ID in the token (which was added by calling the getJwtToken 
    // user model method when logging in) and assign it to the req.user.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next()
})