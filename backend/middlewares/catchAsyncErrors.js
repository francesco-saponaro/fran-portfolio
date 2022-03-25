// We are going to wrap all our controller function in this middleware.
// It either resolves a promise or catches the error, so it is the equivalent of
// adding a try/catch block on all functions.
module.exports = func => (req, res, next) => 
            Promise.resolve(func(req, res, next))
                   .catch(next)