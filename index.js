const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;
const util = require('util');
const request = require('request');
const rp = require('request-promise-native');
const client = new Client({ config: config.getInCluster(), version: '1.9' });

async function main() {
    let res = await client.apis.v1.namespaces().pods.get({
        qs: {
            labelSelector: 'habitat=true'
        }
    });

    // Eww, basically a global state of running services
    let services = {};

    // fetch all the services we have running in our cluster
    for (const pod of res.body.items) {
        await fetch_sup_info(pod.status.podIP, services);
    }
    console.log(services);

    // Look at builder to see if there are newer versions
    for (const svc of Object.keys(services)) {
        // TED: Channel should be configurable, but this is demoware
        try {
            let resp = await rp.get({
                url: `https://bldr.habitat.sh/v1/depot/channels/${services[svc].origin}/stable/pkgs/${services[svc].name}/latest`,
                headers: { 'User-Agent': 'your-mom' }
            });
            if (parseInt(resp.body.ident.release) > parseInt(services[svc].release)) {
                console.log("newer version available")
            } else {
                console.log("latest version installed")
            }
        } catch (err) {
            console.log(err);
        }
    };
}

async function fetch_sup_info(ip, services) {
    try {
        let data = await rp.get(`http://${ip}:9631/services`);
        JSON.parse(data).reduce((prev, svc) => {
            return prev[svc.pkg.ident] = {
                origin: svc.pkg.origin,
                name: svc.pkg.name,
                version: svc.pkg.version,
                release: svc.pkg.release
            }
        }, services);
    } catch (err) {
        console.log(`Unable to reach supervisor: ${err}`);
    }
}

main();