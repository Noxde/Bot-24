const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  CommandInteraction,
  AttachmentBuilder,
  EmbedBuilder,
} = require("discord.js");
const Juego = require("../structures/Juego24");

// const Canvas = require("@napi-rs/canvas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("24")
    .setDescription("Tira 4 cartas al azar"),
  /**
   *  @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    await interaction.deferReply();
    const juego = new Juego();

    juego.drawCards();

    await interaction.editReply({
      files: ["./cartas.png"],
      embeds: [
        new EmbedBuilder()
          .setImage(`attachment://cartas.png`)
          .setColor("Green"),
      ],
    });
  },
};
