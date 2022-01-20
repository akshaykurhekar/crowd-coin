import web3 from "./web3.js";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "xxxxxxxxxxxxxxx" //replace with address of your deployed smart contract
);

export default instance;
