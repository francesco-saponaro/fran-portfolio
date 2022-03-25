// Import user model
const User = require('../models/user');
// Import error handler class
const ErrorHandler = require('../utils/errorHandler');
// Import catch async errors class
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
// Import sendToken function from utilities file to add the httpOnly token 
// to the user and save it in the cookie.
const sendToken = require('../utils/jwtToken');

// User login => /api/v1/login
exports.login = catchAsyncErrors( async(req, res, next) => {

    // Take the below fields from the req.body (front end)
    const { email, password } = req.body;

    // If there is no email OR password, handle the error with the ErrorHandler class created.
    // It will communicate with the app through the middleware function.
    if(!email || !password) {
        return next(new ErrorHandler('Please enter Email and Password', 400))
    }

    // If there are both email and password find a user in the User collection that matches both
    const user = await User.findOne({ email, password }).select('+password');

    // If no user is found, meaning that either email and/or password dont match, 
    // handle the error with the ErrorHandler class created.
    if(!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    // If user is found call the sendToken function created, to add the httpOnly token 
    // to the user, save it in the cookie and return both the user and token in the response.
    sendToken(user, 200, res);
})

// User logout => /api/v1/logout
// To logout a user we simply have to clear the cookie
exports.logout = catchAsyncErrors( async(req, res, next) => {

    // Set the token in the cookie to null and also change the option
    // expires to now.
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

// Get logged in user  => /api/v1/profile
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {

    // Find user by ID.
    // Find it by the ID in the req.user.id which is added to there by the isUserAuthenticated
    // middleware which will be attached to the same route as this controller.
    // isUserAuthenticated finds the token in the cookies, checks the ID attached to it, finds
    // a user with that ID and stores in the req.
    // (see isUserAuthenticated middleware) 
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
})