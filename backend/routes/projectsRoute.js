const express = require('express');
const router = express.Router();

// Import controllers from projectsControllers file
const { getProjects } = require('../controllers/projectsController');

// Pair controllers with routes
// Routes
router.route('/projects').get(getProjects);

module.exports = router;