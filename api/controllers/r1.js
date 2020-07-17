const crypto = require("crypto");
const {getKeyStore} = require("../model/keyStore");

const keyStore = getKeyStore();

module.exports = (req, res) => {
    crypto.randomBytes(32, (err, buf) => {
        if (err) throw err;
        const key = buf.toString("hex");
        keyStore.setKeyValue(key, "available"); // O(1)
        res.status(200).json({
            apiKey: key
        });
    });
}