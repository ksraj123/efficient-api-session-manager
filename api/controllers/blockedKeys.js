const {getKeyStore} = require("../model/keyStore");
const HttpStatus = require("http-status-codes");
const keyStore = getKeyStore();

module.exports = (req, res) => {
    console.log(keyStore.getValue("blocked"));
    res.status(HttpStatus.OK).json({ 
        blockedKeys: Array.from(keyStore.getValue("blocked").keys()) 
    });
}
