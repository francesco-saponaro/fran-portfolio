// Error Handler Class
// It extends the Error parent class
class ErrorHandler extends Error {
    
    constructor(message, statusCode) {
        // The super function represents the constructor of the parent class (Error),
        // so we want to pass the message to it.
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler;