const express = require('express');
const router = express.Router();

// Import isUserAuthenticated middleware to attach to routes that require authentication
// to be accessed
const { isUserAuthenticated } = require('../middlewares/auth');

// Import controllers from projectsControllers file
const { getAdminProjects,
        newProject,
        getProjectDetails,
        updateProject, 
        deleteProject,
        getAdminQuestions,
        newQuestion,
        deleteQuestion 
    } = require('../controllers/adminController');

// Pair controllers with routes
// Admin projects routes
router.route('/admin/projects').get(isUserAuthenticated, getAdminProjects);
router.route('/admin/project/new').post(isUserAuthenticated, newProject);
router.route('/admin/project/:id').get(isUserAuthenticated, getProjectDetails);
router.route('/admin/project/:id').delete(isUserAuthenticated, deleteProject);
router.route('/admin/projupdate/:id').put(isUserAuthenticated, updateProject);

// Admin quiz routes
router.route('/admin/questions').get(isUserAuthenticated, getAdminQuestions);
router.route('/admin/question/new').post(isUserAuthenticated, newQuestion);
router.route('/admin/question/:id').delete(isUserAuthenticated, deleteQuestion);

module.exports = router;