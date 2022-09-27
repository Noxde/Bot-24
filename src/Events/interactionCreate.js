const Event = require("../structures/Events.js");
const { EmbedBuilder } = require("@discordjs/builders");

module.exports = new Event("interactionCreate", async (client, interaction) => {
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.log(error);
    if (!interaction.deferred) {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.editReply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});
