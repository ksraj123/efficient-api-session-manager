const {getKeyStore} = require("../model/keyStore");
const keyStore = getKeyStore();

module.exports = (req, res) => {
    const key = req.params.key;
    keyStore.deleteKey(key);
    res.status(200).json({
        apiKey: key
    });
}
