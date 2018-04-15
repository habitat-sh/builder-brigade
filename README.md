# Builder Brigade: A service for syncing package update with kubernetes managed habitat services
This is the repo for a brigade service that syncs package updates between builder and kubernetes.

In it's current state it is *ONLY FOR DEMO PURPOSES*. The pattern we use currently is to deploy the cron gateway alongside the builder brigade service. The cron gateway will trigger the run of the builder-brigade service on a user defined interval.

## Usage
Clone this repository and then:
```
$ cd builder-brigade
$ helm repo add brigade https://azure.github.io/brigade
$ helm init
$ helm install -n brigade brigade/brigade
$ helm install -n builder-brigade brigade/brigade-project -f project.yml
$ helm install -n brigade-cron ./charts/brigade-cron -f charts/values.yml
```
If your cluster has RBAC enabled, append `--set rbac.enabled=true` to the end of the second install command, like so:
```
$ helm install -n builder-brigade -f values.yml --set rbac.enabled=true
```
