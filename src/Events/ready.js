const Event = require("../structures/Events.js");

module.exports = new Event("ready", (client) => {
  console.log("Ready!");
  const inv = client.generateInvite({
    scopes: ["bot", "applications.commands"],
    permissions: ["SendMessages", "AttachFiles"],
  });

  console.log(inv);
});
