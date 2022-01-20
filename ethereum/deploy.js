const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const CampaignFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "add here your 12 words key of metamask",
  "add here your infura network link"
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
