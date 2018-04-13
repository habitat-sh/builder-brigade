const { events, Job } = require('brigadier')

events.on("pkg_check", (brigadeEvent, project) => {
  console.log("Checking for package updates!")
  var node = new Job("builder-brigade")
  node.image = "node:alpine"
  node.tasks = [
    "cd /src",
    "npm i",
    "node index.js"
  ]
  node.run().then(simpleResults => {
    console.log("==> Job Results")
    console.log(simpleResults.toString())
    console.log("==> Job Done")
  })
})
