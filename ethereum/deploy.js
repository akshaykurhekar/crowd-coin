const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const CampaignFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
    "horse neither robot throw begin luggage depth fragile bulb artist august gate",
    "https://ropsten.infura.io/v3/cc2b3d7b2a4642baa7f5ac5526a1dfc5"
  );

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface)
  )
    .deploy({ data: CampaignFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
