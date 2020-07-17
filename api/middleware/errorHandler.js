const HttpStatus = require("http-status-codes");

const errorDetails = {
    "NO_KEY": {
        status: HttpStatus.NOT_FOUND,
        message: "No such key found" 
    },
    "NO_ACC_KEY": {
        status: HttpStatus.FORBIDDEN,
        message: "No access to this API key"
    }
}

module.exports = (err, req, res, next) => {
    const {status, message} = errorDetails[err.message];
    res.status(status).send({
        error: message
    })
}