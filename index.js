const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;
const util = require('util');
const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });

client.api.v1.namespaces.get().then((res) => {
    console.log(util.inspect(res, false, null));
});
