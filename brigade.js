const { events } = require('brigadier')

events.on("pkg_check", (brigadeEvent, project) => {
  console.log("Checking for package updates!")
  var node = new Job("package_updater")
  node.image = "node:alpine"
  node.tasks = [
    "node index.js"
  ]
  node.run()
})
