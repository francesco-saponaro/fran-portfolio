// Import mongoose
const mongoose = require('mongoose');

// Project model schema
const projectsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter project name']
    },
    description: {
        type: String,
        required: [true, 'Please enter project description']
    },
    languages: [
        {
            language: {
                type: String,
                required: [true, 'Please enter programming language']
            }
        }
    ],
    frameworks: [
        {
            framework: {
                type: String
            }
        }
    ],
    database: {
        type: String
    },
    libraries: [
        {
            library: {
                type: String
            }
        }
    ],
    other: [
        {
            item: {
                type: String
            }
        }
    ],
    github: {
        type: String
    },
    app: {
        type: String
    }
});

// We call the model 'Projects' and it uses the projectsSchema
module.exports = mongoose.model('Project', projectsSchema);