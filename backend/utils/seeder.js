// Import Question and Project models
const Question = require('../models/question');
const Project = require('../models/project');
// Import dotenv since we are connecting to the database and therefore
// need to access the environment variables.
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
// Import the quiz and projects json files, which contains all data to be seeded
const questions = require('../data/quiz');
const projects = require('../data/projects');

// Setting dotenv file, in this case we need it to connect our database, as
// mongos credentials are in the config.env file.
dotenv.config({ path: 'backend/config/config.env' });
// Connecting to database
connectDatabase();

// Function to upload all data from imported json files onto mongoDB.
// This file is then added in the package.json file as command named "seeder",
// Which will allow us to call this function by running "npm run seeder".
const seedData = async () => {

    try {

        await Question.deleteMany();
        console.log('Questions deleted');

        await Question.insertMany(questions);
        console.log('Questions added');

        await Project.deleteMany();
        console.log('Projects deleted');

        await Project.insertMany(projects);
        console.log('Projects added');

        process.exit();

    } catch(error) {

        console.log(error.message);
        process.exit();
    }
}

seedData();

