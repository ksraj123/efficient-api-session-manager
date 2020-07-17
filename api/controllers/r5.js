const {getKeyStore} = require("../model/keyStore");
const HttpStatus = require("http-status-codes");
const keyStore = getKeyStore();

module.exports = (req, res) => {
    const user = req.body.user;
    const key = req.params.key;
    const additionalInfo = keyStore.getAdditionalKeyInfo(key);
    if (user !== additionalInfo[0]){
        res.status(HttpStatus.FORBIDDEN).json({ error: "No access to this API key"})
    } else {
        clearTimeout(additionalInfo[2]); // clear old 5 min timer
        const deleteTimeout = setTimeout(() => keyStore.deleteKey(key), 5*60*1000); // new 5 min timer
        keyStore.changeKeyValue(key, "blocked"); // key blocked for 60s seconds again on renewing
        const oneMinTimeout = setTimeout(() => { 
            keyStore.changeKeyValue(key, "available");}, 1000 * 60);
        keyStore.setAdditionalKeyInfo(key, additionalInfo[0],  oneMinTimeout, deleteTimeout);
        res.status(HttpStatus.OK).json({ apiKey: key })
    }
}
