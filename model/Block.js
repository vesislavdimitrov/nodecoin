import SHA256 from 'crypto-js/sha256.js';

class Block {

    #index;
    #timestamp;
    #data;
    #previousHash;
    #hash;
    #nonce;

    /**
     * @param {unix timestamp} timestamp 
     * @param {*} data 
     */
    constructor(timestamp, data) {
        this.#index = 0;
        this.#timestamp = timestamp;
        this.#data = data;
        this.#previousHash = "0";
        this.#hash = this.calculateHash();
        this.#nonce = 0;
    }

    getIndex() { return this.#index }
    getTimestamp() { return this.#timestamp }
    getData() { return this.#data }
    getPreviousHash() { return this.#previousHash }
    getHash() { return this.#hash }
    getNonce() { return this.#nonce }

    setIndex(index) { this.#index = index }
    setPreviousHash(previousHash) { this.#previousHash = previousHash }
    setHash(hash) { this.#hash = hash }

    calculateHash() {
        return SHA256(
            this.#index 
            + this.#previousHash 
            + this.#timestamp 
            + this.#data 
        ).toString();
    }
}

export default Block;