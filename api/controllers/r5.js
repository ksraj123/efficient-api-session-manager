const {getKeyStore} = require("../model/keyStore");
const keyStore = getKeyStore();

module.exports = (req, res) => {
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
}
