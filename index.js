const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const apiRouter = require('./api/routes');

app.use(express.json());
app.use("/api", apiRouter);

const {getKeyStore} = require("./api/model/keyStore");
const keyStore = getKeyStore();


app.get("/test/:key", (req, res)=>{
    const key = req.params.key;
    if (keyStore.getValue("used") && keyStore.getValue("used").has(key)){
        if (keyStore.getAdditionalKeyInfo(key) === "blocked"){
            res.status(403).send({
                "Error": "Key Blocked, will release 1 min after being served"
            })
        } else {
            res.status(200).json({
                apiKey: key,
                Message: "Suceessfully accessed super secret route!"
            })
        }
    } else {
        res.status(404).json({
            Error: "No such key"
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
