const validate = (req, res, next) => {
    if (req.method === "GET")
        console.log("Get request");
    if (req.method === "POST")
        console.log("POST request");
    next();
}

module.exports = validate;