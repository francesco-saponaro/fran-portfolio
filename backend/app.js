// Import the express framework and assign it to the app
const express = require('express');
const app = express();
// Import installed body parser and cookie parser middlewares,
// body-parser is the NodeJS body parsing middleware. It is responsible for parsing the 
// incoming request bodies in a middleware before you handle it.
const cookieParser = require('cookie-parser');

const path = require('path')

// Setting up config.env file if not in PRODUCTION mode, as in production the config files are uploaded
// from Heroku
if(process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({ path: 'backend/config/config.env' })
}

// Import middleware function from the errors.js file to handle errors
const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(cookieParser());

// Import all routes from routes files
const quiz = require('./routes/quizRoute');
const projects = require('./routes/projectsRoute');
const user = require('./routes/userRoute');
const admin = require('./routes/adminRoute');

// The app will use the below url, which is /api/v1 + any route in the routes files 
app.use('/api/v1', quiz);
app.use('/api/v1', projects);
app.use('/api/v1', user);
app.use('/api/v1', admin);

// If in PRODUCTION mode run the app with the 'build' folder, which is an optimized version
// of the app for deployment
if(process.env.NODE_ENV === 'PRODUCTION') {

    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

// The app will use the middleware function from the errors.js file to handle errors
app.use(errorMiddleware);

module.exports = app