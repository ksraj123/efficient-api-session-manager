const BiMultiMap = require("./biMultiMap");
const keyStore = new BiMultiMap();

module.exports = {
    getKeyStore: ()=>{
        return keyStore
    }
}
