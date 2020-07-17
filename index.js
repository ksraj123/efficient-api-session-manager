const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const apiRouter = require('./api/routes');

app.use(express.json());
app.use("/api", apiRouter);

app.get("/", (req, res)=>{
    res.status(200).json({
        success: 'Server Running'
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
