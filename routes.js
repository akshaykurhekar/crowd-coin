const routes = require('next-routes')();

routes
    .add('/campaign/createCampaign','/campaign/createCampaign')
    .add('/campaign/:address','/campaign/show')
    .add('/campaign/:address/requests','/campaign/requests/index')
    .add('/campaign/:address/requests/new','/campaign/requests/new');

module.exports = routes