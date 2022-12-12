const ErrorHandler = require("../utils/ErrorHandler")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Server Errror"

    // database error
    if (err.name === 'error') {
        const message = `Something wrong at ${err}`
        err = new ErrorHandler(400, message)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
        // message: err.stack
    })
}