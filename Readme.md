
## Smart contract
    CampaignFactory
    Campaign

## How to use this repo ?

# Ans:
    1. fork repo and download in your pc
    2. in cmd run : $ npm install
    3. wait for all dependency to download
    4. mean while check the ethereum folder it contain smart contract stuff 
    5. check deploy.js file lin no. 6 :: add 12 word mnemonic of metamask
    6. and on line no. 7 add infura network link { you can create account in infura.io for test and main network }
    7. now change path to ethereum folder in cmd run :: $ node compile.js
    8. then run :: $ node deploy.js
    9. in cmd you get address of deployed smart contract copy it some were.
    10. check factory.js file on line no. 6 :: replace xxxxxxxx with deployed address.
    11. check web3.js file line no. 12 :: replace xxxx with infura link.
    12. change path to main dir in cmd.

 ## Now Dapp is ready to work 

  # run :: $ npm run dev   
