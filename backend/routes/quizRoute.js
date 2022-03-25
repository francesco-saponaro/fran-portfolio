const express = require('express');
const router = express.Router();

// Import controllers from quizControllers file
const { getQuestions } = require('../controllers/quizController');

// Pair controllers with routes
// Routes
router.route('/quiz').get(getQuestions);

module.exports = router;