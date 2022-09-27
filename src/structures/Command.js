const Discord = require("discord.js");
const Client = require("./Client.js");

/**
 * @param {Discord.Message} message
 * @param {String[]} args
 * @param {Client} client
 */
function RunFunction(message, args, client) {}

class Command {
  /**
   * @typedef {{name: string, desc: string, run: RunFunction}} CommandOptions
   * @param {CommandOptions} options
   */

  constructor(options) {
    this.name = options.name;
    this.desc = options.desc;
    this.run = options.run;
  }
}

module.exports = Command;
