import Block from './Block.js';

const GENESIS_DATA = "I am the first one here!";

class Blockchain {
    
    /**
     * @private {Array}
     */ 
    #chain;

    constructor() {
        this.#chain = [this.#createGenesis()];
    }

    getChain() { return this.#chain }

    getChainContent() {
        return this.#chain.map(block => ({
            index: block.getIndex(),
            timestamp: block.getTimestamp(),
            data: block.getData(),
            previousHash: block.getPreviousHash(),
            hash: block.getHash(),
            nonce: block.getNonce(),
        }));
    }

    /**
     * Adds a new block to the blockchain.
     * @param {Block} block
     * @returns {void}
     * Increments the index of the block, attaches the previous hash,
     * recalculates its own hash, and pushes it to the chain list.
     */
    addBlock(block) {
        block.setIndex(this.#getLatestBlock().getIndex() + 1);
        block.setPreviousHash(this.#getLatestBlock().getHash());
        block.setHash(block.calculateHash());
        this.#chain.push(block);
    }

    /**
     * Checks the validity of the blockchain.
     * @returns {boolean}
     * Iterates through the blocks starting from the second block, and checks
     * if each block's hash matches the recalculated hash and if the previous
     * hash matches the hash of the preceding block in the chain.
    */    
    isValid() {
        return this.#chain.slice(1).every((block, i) =>
            block.getHash() === block.calculateHash() &&
            block.getPreviousHash() === this.#chain[i].getHash()
        );
    }

    /**
     * @private
     */
    #getLatestBlock() {
        return this.#chain[this.#chain.length - 1]
    }

    #createGenesis() {
        return new Block(this.#createGenesisDate(), GENESIS_DATA)
    }

    #createGenesisDate() {
        return Math.round(new Date().getTime() / 1000);
    }
}

export default Blockchain;
export {GENESIS_DATA};