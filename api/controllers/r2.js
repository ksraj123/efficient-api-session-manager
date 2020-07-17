const {getKeyStore} = require("../model/keyStore");
const keyStore = getKeyStore();

module.exports = (req, res) => {
    let availableKeys = keyStore.getValue("available"); // O(1)
    if (!availableKeys || !availableKeys.entries().next().value) {
        res.status(404).json({
            Error: "No Available Key"
        });
    } else {
        // get first available key in keyStore
        const key = availableKeys.entries().next().value[0]; // O(1)
        keyStore.changeKeyValue(key, "used");
        keyStore.setAdditionalKeyInfo(key, "blocked"); // O(1)
        console.log(keyStore.getValue("used"));
        setTimeout(() => {
            const deleteTimeout = setTimeout(
                () => keyStore.deleteKey(key),
                5 * 60 * 1000
            );
            keyStore.setAdditionalKeyInfo(key, deleteTimeout); // O(1)
            console.log(keyStore.getValue("used"));
        }, 1000 * 60);
        res.status(200).json({
            apiKey: key
        });
    }
}
