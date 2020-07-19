const express = require("express");
const app = express();
const apiRouter = require('./api/routes');
const errorHandler = require('./api/middleware/errorHandler');

app.use(express.json());
app.use("/api", apiRouter);

app.get("/", (req, res)=>{
    res.status(200).json({
        success: 'Server Running'
    })
})

app.use(errorHandler);

module.exports = app;
