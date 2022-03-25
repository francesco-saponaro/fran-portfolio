// Import project model
const Project = require('../models/project');
// Import question model
const Question = require('../models/question');
// Import error handler class
const ErrorHandler = require('../utils/errorHandler');
// Import catch async errors class
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')


// Get all projects (admin) => /api/v1/admin/projects
exports.getAdminProjects = catchAsyncErrors(async (req, res, next) => {

    // Get all projects from database
    const projects = await Project.find()

    res.status(200).json({
        success: true,
        projects
    })
})

// Get project details (admin) => /api/v1/admin/project/:id
exports.getProjectDetails = catchAsyncErrors(async (req, res, next) => {

    // Find single project by its ID in the products collection
    const project = await Project.findById(req.params.id);

    // If product not found handle the error with the ErrorHandler class created.
    // It will communicate with the app through the middleware function.
    if(!project) {
        return next(new ErrorHandler('Project not found', 404));
    }

    res.status(200).json({
        success: true,
        project
    })
})

// Create new project => /api/v1/admin/project/new
exports.newProject = catchAsyncErrors(async (req, res, next) => {

    // Create a new instance of the Project model from the request body
    const project = await Project.create(req.body);

    res.status(201).json({
        success: true,
        project
    })
})

// Update project => /api/v1/admin/projupdate/:id
exports.updateProject = catchAsyncErrors(async (req, res, next) => {

    // Find single project by its ID in the projects collection
    let project = await Project.findById(req.params.id);

    // If project not found handle the error with the ErrorHandler class created.
    // It will communicate with the app through the middleware function.
    if(!project) {
        return next(new ErrorHandler('Project not found', 404));
    }

    // If projects exists, update it with the request body
    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        project
    })
})

// Delete project => /api/v1/admin/project/:id
exports.deleteProject = catchAsyncErrors(async (req, res, next) => {

    // Find single project by its ID in the projects collection
    const project = await Project.findById(req.params.id);

    // If project not found handle the error with the ErrorHandler class created.
    // It will communicate with the app through the middleware function.
    if(!project) {
        return next(new ErrorHandler('Project not found', 404));
    }

    // If project exists remove it
    await project.remove();
 
    res.status(200).json({
        success: true,
        message: "Project is deleted."
    })
})

// Get all questions (admin) => /api/v1/admin/questions
exports.getAdminQuestions = catchAsyncErrors(async (req, res, next) => {

    // Get all questions from database
    const questions = await Question.find()

    res.status(200).json({
        success: true,
        questions
    })
})

// Create new question => /api/v1/admin/project/new
exports.newQuestion = catchAsyncErrors(async (req, res, next) => {

    // Create a new instance of the Question model from the request body
    const question = await Question.create(req.body);

    res.status(201).json({
        success: true,
        question
    })
})

// Delete project => /api/v1/admin/question/:id
exports.deleteQuestion = catchAsyncErrors(async (req, res, next) => {

    // Find single question by its ID in the question collection
    const question = await Question.findById(req.params.id);

    // If question not found handle the error with the ErrorHandler class created.
    // It will communicate with the app through the middleware function.
    if(!question) {
        return next(new ErrorHandler('Question not found', 404));
    }

    // If question exists remove it
    await question.remove();

    res.status(200).json({
        success: true,
        message: "Question is deleted."
    })
})