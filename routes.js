const routes = require('next-routes')();

routes
    .add('/campaign/createCampaign','/campaign/createCampaign')
    .add('/campaign/:address','/campaign/show')
    .add('/campaign/:address/requests','/campaign/requests/index');

module.exports = routes