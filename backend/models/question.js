// Import mongoose
const mongoose = require('mongoose');

// Question model schema
const questionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: [true, 'Please enter quiz question']
    },
    answers: [
        {
            answer: {
                type: String,
                required: [true, 'Please enter quiz answer']
            },
            boolean: {
                type: String,
                default : 'false'
            }
        }
    ]
});

// We call the model 'Question' and it uses the questionSchema
module.exports = mongoose.model('Question', questionSchema);