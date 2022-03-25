// Import project model
const Project = require('../models/project');
// Import error handler class
const ErrorHandler = require('../utils/errorHandler');
// Import catch async errors class
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
// Import APIFeatures class
const APIFeatures = require('../utils/apiFeatures')

// Get all projects => /api/v1/projects?keyword= or if query /api/v1/projects?keyword=query
exports.getProjects = catchAsyncErrors(async (req, res, next) => {

    // APIFeatures class with its search method to look for projects.
    // It takes a MongoDB query and the URL query as parameters.
    // It will return all projects if no query (see apiFeatures.js file).
    const apiFeatures = new APIFeatures(Project.find(), req.query).search()

    const projects = await apiFeatures.query

    res.status(200).json({
        success: true,
        projects
    })
})

