const {getKeyStore} = require("../model/keyStore");
const HttpStatus = require("http-status-codes");
const keyStore = getKeyStore();

module.exports = (req, res) => {
    console.log(keyStore.getValue("available"));
    res.status(HttpStatus.OK).json({
        availableKeys: Array.from(keyStore.getValue("available").keys())
    });
}
