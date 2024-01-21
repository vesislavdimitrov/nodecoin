import Blockchain, {GENESIS_DATA} from '../model/Blockchain.js';
import Block from '../model/Block.js';

describe('A Blockchain', () => {
    let blockchain;
    const TEST_BLOCK = new Block(101, "Data");
    const FAKE_HASH = "Preslava";

    it('should be created with a genesis block', () => {
        blockchain = new Blockchain();
        expect(blockchain.getChain()).toHaveLength(1);
        expect(blockchain.getChain()[0].getData()).toBe(GENESIS_DATA);
        expect(blockchain.getChain()[0].getData()).toBe(GENESIS_DATA);
    });

    it('should add a block to the blockchain', () => {
        blockchain = new Blockchain();
        blockchain.addBlock(TEST_BLOCK);
    
        const chain = blockchain.getChain();
        expect(chain).toHaveLength(2);
        expect(chain[1]).toBe(TEST_BLOCK);
    });
    
    describe("when checking its validity", () => {

        it('should return true if the chain is valid', () => {
            blockchain = new Blockchain();
            blockchain.addBlock(TEST_BLOCK);
            expect(blockchain.isValid()).toBe(true);
        });

        it('should return false if the {previousHash} of a block is invalid', () => {
            blockchain = new Blockchain();
            blockchain.addBlock(TEST_BLOCK);
            // adding the same block which breaks the previousHash logic
            blockchain.addBlock(TEST_BLOCK);
            expect(blockchain.isValid()).toBe(false);
        });

        it('should return false if the {hash} of a bock is invalid', () => {
            blockchain = new Blockchain();
            blockchain.addBlock(TEST_BLOCK);
            blockchain.getChain()[1].setHash(FAKE_HASH);;
            expect(blockchain.isValid()).toBe(false);
        });
    });
});
