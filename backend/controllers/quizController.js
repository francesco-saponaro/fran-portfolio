// Import question model
const Question = require('../models/question');
// Import error handler class
const ErrorHandler = require('../utils/errorHandler');
// Import catch async errors class
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// Get all questions => /api/v1/quiz
exports.getQuestions = catchAsyncErrors(async (req, res, next) => {

    // We use the $sample aggregation to randomly select 12 questions from the database
    const questions = await Question.aggregate([{ $sample: {size: 12}}]);

    res.status(200).json({
        success: true,
        questions
    })
})