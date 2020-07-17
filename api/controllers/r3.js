const {getKeyStore} = require("../model/keyStore");
const HttpStatus = require("http-status-codes");
const keyStore = getKeyStore();

module.exports = (req, res) => {
    const key = req.body.key;
    const blockedKeys = keyStore.getValue("blocked");
    if (blockedKeys && blockedKeys.has(key)) {
        clearTimeout(keyStore.getAdditionalKeyInfo(key)[1]); // clear 1 minute timer
        keyStore.changeKeyValue(key, "available");
        res.status(HttpStatus.OK).json({ apiKey: key });
    } else {
        res.status(HttpStatus.FORBIDDEN).json({ Error: "No such key found" });
    }
}
