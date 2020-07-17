const crypto = require("crypto");
const HttpStatus = require("http-status-codes");
const {getKeyStore} = require("../model/keyStore");

const keyStore = getKeyStore();

module.exports = (req, res) => {
    crypto.randomBytes(32, (err, buf) => {
        if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message})
        };
        const key = buf.toString("hex");
        keyStore.setKeyValue(key, "available"); // O(1)
        keyStore.setAdditionalKeyInfo(key);
        res.status(HttpStatus.OK).json({ success: 'Generated Key' });
    });
}
