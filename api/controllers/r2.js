const {getKeyStore} = require("../model/keyStore");
const HttpStatus = require("http-status-codes");
const keyStore = getKeyStore();

module.exports = (req, res, next) => {
    let availableKeys = keyStore.getValue("available"); // O(1)
    if (!availableKeys || !availableKeys.entries().next().value) {
        next(new Error("NO_KEY"));
    } else {
        // get first available key in keyStore
        const user = req.body.user;
        const key = availableKeys.entries().next().value[0]; // O(1)
        const oldAdditionalDetails = keyStore.getAdditionalKeyInfo(key);
        // console.log(oldAdditionalDetails[2]);
        clearTimeout(oldAdditionalDetails[2]); // clear old 5 minute timer
        // 1 minute timer already cleared for all avialable keys
        keyStore.changeKeyValue(key, "blocked");
        const oneMinTimeout = setTimeout(() => { 
            keyStore.changeKeyValue(key, "available");}, 1000 * 60);
        const fiveMinTimeout = setTimeout(() => keyStore.deleteKey(key), 5*60*1000 );
        keyStore.setAdditionalKeyInfo(key, user, oneMinTimeout, fiveMinTimeout); // O(1)
        res.status(HttpStatus.OK).json({ apiKey: key });
    }
}
