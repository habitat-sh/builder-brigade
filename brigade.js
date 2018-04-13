const { events } = require('brigadier')

events.on("pkg_update", (brigadeEvent, project) => {
  console.log("Checking for package updates!")
  var node = new Job("package_updater")
  node.image = "node:alpine"
  node.tasks = [
    "node index.js"
  ]
  node.run()
})
