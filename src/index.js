const Client = require("./structures/Client.js");
const client = new Client();
require("dotenv").config();

client.start(process.env.TOKEN);
console.log(client.guilds);
