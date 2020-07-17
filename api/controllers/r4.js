const {getKeyStore} = require("../model/keyStore");
const HttpStatus = require("http-status-codes");
const keyStore = getKeyStore();

module.exports = (req, res) => {
    const key = req.params.key;
    if (keyStore.getKey(key)){
        const keyInfo = keyStore.getAdditionalKeyInfo(key);
        clearTimeout(keyInfo[1]); // clearing 1 minute timeout
        clearTimeout(keyInfo[2]); // clearing 5 minute timeout
        keyStore.deleteKey(key);
        res.status(HttpStatus.OK).json({ apiKey: key });
    } else {
        res.status(HttpStatus.NOT_FOUND).json({ error: "No Available Key" });
    }
}
