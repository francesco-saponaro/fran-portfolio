// Import mongoose
const mongoose = require('mongoose');
// Import installed validator package
const validator = require('validator');
// Import package used to release jwt token
const jwt = require('jsonwebtoken');

// User model schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Password must be longer than 6 characters'],
        select: false
    }
})

// Define JWT token method, which when called, assigns the token in the env variables 
// to the ID of the user.
// We pass the user's id as payload for the jwt token.
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY_TIME
    });
}

// We call the model 'User' and it uses the userSchema
module.exports = mongoose.model('User', userSchema);