const {getKeyStore} = require("../model/keyStore");
const HttpStatus = require("http-status-codes");
const keyStore = getKeyStore();

module.exports = (req, res, next) => {
    const key = req.params.key;
    const blockedKeys = keyStore.getValue("blocked");
    if (blockedKeys && blockedKeys.has(key)) {
        clearTimeout(keyStore.getAdditionalKeyInfo(key)[1]); // clear 1 minute timer
        keyStore.changeKeyValue(key, "available");
        res.status(HttpStatus.OK).json({ apiKey: key });
    } else {
        next(new Error("NO_KEY"));
    }
}
