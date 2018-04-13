const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;
const util = require('util');
const request = require('request');
const rp = require('request-promise-native');
const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });

client.apis.v1.namespaces().pods.get({
    qs: {
        labelSelector: 'habitat=true'
    }
}).then((res) => {
    res.body.items.forEach((pod) => {
        rp.get(`http://${pod.status.podIP}:9631/services`).then((data) => {
            console.log(util.inspect(data, false, null))
        }).catch((err) => {
            console.log(`Unable to reach supervisor: ${err}`);
        });
    });
});
