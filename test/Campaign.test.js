const assert = require('assert'); // for testing 
const ganache = require('ganache-cli'); // for creating local blockchain
const Web3 = require('web3'); // it is interface or intermediate of communication btw code and network
const web3 = new Web3(ganache.provider()); // create instance of web3 on ganache local network

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach( async ()=>{
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data: compiledFactory.bytecode})
    .send({ from: accounts[0], gas:'1000000' });

    await factory.methods.createCampaign('100').send({
        from:accounts[0],
        gas:'1000000'
    });

    // [a,b,c] = [1,2,3]
  [campaignAddress] = await factory.methods.getDeployedCampaign().call();
    // campaign is already deployed, store the instance of deployed contract into campaign variable using address.
   campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress); 
   
});

describe('Campaign',()=>{
    it('deploys campaign and factory contract',()=>{
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('check caller is a manager', async ()=>{
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allows people to contribute money and make them as approver',async ()=>{
            await campaign.methods.contribute().send({
                from:accounts[1],
                value:2000
            });
            const isContributor = await campaign.methods.approvers(accounts[1]);
      
            assert(isContributor); // it fails if it get false value.
    });

    it('requires a minimum contribution', async ()=>{
        try{
            await campaign.methods.contribute().send({
                value:'5',
                from:accounts[1]
            });
            assert(false);
        }catch(err){
            assert(err);
        }
    });

    it('allow a manager to make payment request', async ()=>{
     
        await campaign.methods.createRequest('Buy Plastic', '100', accounts[1] ).send({
            from:accounts[0],
            gas:'1000000'
        });
        const request = await campaign.methods.requests(0).call();

        assert.equal('Buy Plastic', request.description);
    });

    it('processes request',async ()=>{
        await campaign.methods.contribute().send({
            value: web3.utils.toWei('10','ether'),
            from:accounts[1]
        });

        // manager will create request
        await campaign.methods
        .createRequest('des', web3.utils.toWei('5','ether'), accounts[2])
        .send({
            from:accounts[0],
            gas:'1000000'
        });

        // contribute will call
        await campaign.methods.approveRequest(0).send({
            from:accounts[1],
            gas:'1000000'
        });

        // only manager can call
        await campaign.methods.finalizeRequest(0).send({
            from:accounts[0],
            gas:'1000000'
        });

        let balance = await web3.eth.getBalance(accounts[2]);
        balance = web3.utils.fromWei( balance, 'ether');
        balance = parseFloat(balance);
        // console.log(balance);
        assert(balance > 104);
    });
    
});