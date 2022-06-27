const { assert } = require('chai');

const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DecentralBank', (accounts) => {
    let tether, rwd


    before(async () => {
        tether = await Tether.new();
        rwd = await RWD.new();
    })



    describe('Tether Deployment', async () => {
        it('matches names succesfully', async () => {
            
            const name = await tether.name()
            assert.equal(name, "Tether Token")
        })
    })

     describe("Reward Token", async () => {
       it("matches names succesfully", async () => {
         
         const name = await rwd.name();
         assert.equal(name, "Reward Token");
       });
     });
})