const express = require('express');
const router = express.Router();

// Import isUserAuthenticated middleware to attach to routes that require authentication
// to be accessed
const { isUserAuthenticated } = require('../middlewares/auth');

// Import controllers from userControllers file
const { login, logout, getUserProfile } = require('../controllers/userController');

// Pair controllers with routes
// Routes
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile').get(isUserAuthenticated, getUserProfile)

module.exports = router;