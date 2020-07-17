// Implements Bi directional Multimaps
// lookups for both keys and values possible in O(1)
//

class MultiMap {
    // one key can have multiple non identical values
    constructor() {
        this.map = new Map();
    }
    add(k, v) {
        if (!this.map.has(k)) this.map.set(k, new Map());
        this.map.get(k).set(v, "");
    }
    delete(k, v) {
        if (this.map.has(k)) {
            this.map.get(k).delete(v);
        }
    }
    setAdditional(k, v, info) {
        this.map.get(k).set(v, info);
    }
    getKey(k) {
        return this.map.get(k);
    }
}

class BiMultiMap {
    // lookup possible through both key and value in O(1)
    // A key can have only one value
    // Multiple keys can have same value
    constructor() {
        this.keyMap = new Map();
        this.valueMap = new MultiMap();
    }
    setKeyValue(k, v) {
        this.keyMap.set(k, v);
        this.valueMap.add(v, k);
    }
    setValueKey(v, k) {
        this.keyMap.set(k, v);
        this.valueMap.add(v, k);
    }
    changeKeyValue(k, v) {
        const prevVal = this.keyMap.get(k);
        this.keyMap.set(k, v);
        this.valueMap.delete(prevVal, k);
        this.valueMap.add(v, k);
    }
    deleteKey(k) {
        const currVal = this.keyMap.get(k);
        this.keyMap.delete(k);
        this.valueMap.delete(currVal, k);
    }
    getKey(k) {
        return this.keyMap.get(k);
    }
    getValue(v) {
        return this.valueMap.getKey(v);
    }
    setAdditionalKeyInfo(k, info) {
        const currVal = this.keyMap.get(k);
        this.valueMap.setAdditional(currVal, k, info);
    }
    getAdditionalKeyInfo(k) {
        const currVal = this.keyMap.get(k);
        console.log(currVal);
        return this.valueMap.getKey(currVal).get(k);
    }
}

module.exports = BiMultiMap;

// Tests

// myMap.setKeyValue("saurabh", "blocked");
// myMap.setKeyValue("Gaurav", "blocked");
// console.log(myMap.getValue("blocked")); // saurabh gaurav
// console.log(myMap.getKey("saurabh")); // blocked
// myMap.changeKeyValue("saurabh", "unblocked");
// console.log(myMap.getKey("saurabh")); // unblocked
// console.log(myMap.getValue("blocked")); // gaurav
// console.log(myMap.getValue("unblocked")); // saurabh

// myMap.setKeyValue("saurabh", "unblocked");
// console.log(myMap.getKey("saurabh"));
// myMap.setValueKey("unblocked", "suru");
// console.log(myMap.getValue("unblocked"));
// console.log(myMap.getKey("saurabh"));
