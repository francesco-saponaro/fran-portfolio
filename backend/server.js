const app = require('./app');
// Import function to connect to database
const connectDatabase = require('./config/database');

// Handle Uncaught exceptions
process.on('uncaughtException', err => {

    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Uncaught exception');
    process.exit(1)
})

// Setting up config.env file if not in PRODUCTION mode, as in production the config files are uploaded
// from Heroku
if(process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({ path: 'backend/config/config.env' })
}

// Connecting to database
connectDatabase();

// Start the server on required PORT.
// process.env.PORT and NODE_ENV refers to the config.env files respective variables
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandles Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})