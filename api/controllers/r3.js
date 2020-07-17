const {getKeyStore} = require("../model/keyStore");
const keyStore = getKeyStore();

module.exports = (req, res) => {
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
}
