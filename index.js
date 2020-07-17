const BiMultiMap = require("./BiMultiMap");
const express = require("express");
const crypto = require("crypto");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

const keyStore = new BiMultiMap();

app.use(express.json());

app.get("/R1", (req, res) => {
    crypto.randomBytes(32, (err, buf) => {
        if (err) throw err;
        const key = buf.toString("hex");
        keyStore.setKeyValue(key, "available"); // O(1)
        res.status(200).json({
            apiKey: key
        });
    });
});

app.get("/R2", (req, res) => {
    let availableKeys = keyStore.getValue("available"); // O(1)
    if (!availableKeys || !availableKeys.entries().next().value) {
        res.status(404).json({
            Error: "No Available Key"
        });
    } else {
        // get first available key in keyStore
        const key = availableKeys.entries().next().value[0]; // O(1)
        keyStore.changeKeyValue(key, "used");
        keyStore.setAdditionalKeyInfo(key, "blocked"); // O(1)
        console.log(keyStore.getValue("used"));
        setTimeout(() => {
            const deleteTimeout = setTimeout(
                () => keyStore.deleteKey(key),
                5 * 60 * 1000
            );
            keyStore.setAdditionalKeyInfo(key, deleteTimeout); // O(1)
            console.log(keyStore.getValue("used"));
        }, 1000 * 60);
        res.status(200).json({
            apiKey: key
        });
    }
});

app.get("/R3/:key", (req, res) => {
    const key = req.params.key;
    const usedKeys = keyStore.getValue("used");
    if (usedKeys && usedKeys.has(key)) {
        keyStore.changeKeyValue(key, "available");
        res.status(200).json({
            apiKey: key
        });
    } else {
        res.status(403).json({
            Error: "No such key found"
        });
    }
});

app.post("/R3", (req, res) => {});

app.get("/R4/:key", (req, res) => {
    const key = req.params.key;
    keyStore.deleteKey(key);
    res.status(200).json({
        apiKey: key
    });
});

app.get("/R5/:key", (req, res) => {
    const key = req.params.key;
    clearTimeout(keyStore.getAdditionalKeyInfo(key));
    const deleteTimeout = setTimeout(
        () => keyStore.deleteKey(key),
        5 * 60 * 1000
    );
    keyStore.setAdditionalKeyInfo(key, deleteTimeout);
    res.status(200).json({
        apiKey: key
    })
});

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
