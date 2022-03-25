// This function assign the httpOnly token to the user and saves it in the cookie
const sendToken = (user, statusCode, res) => {

    // Assign jwt token, with the method defined in the user model, to the user.
    const token = user.getJwtToken();

    // Options to be passed to the cookie along with the token
    const options = {
        expires: new Date(
            // Convert time into milliseconds
            Date.now() + process.env.COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000
        ),
        // We must specify the cookie as httpOnly to make sure it can only be accessed
        // from the backend.
        httpOnly: true
    }

    // Save the token and its options in the cookie and return both the user and token in the response
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken;