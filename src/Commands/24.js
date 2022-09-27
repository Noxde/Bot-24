const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, AttachmentBuilder } = require("discord.js");
const Canvas = require("@napi-rs/canvas");

module.exports = {
  data: new SlashCommandBuilder().setName("24").setDescription("test 24"),
  /**
   *  @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    await interaction.deferReply();

    let y = 318;
    let x = 208;
    const canvas = Canvas.createCanvas(x * 2, y * 2);
    const context = canvas.getContext("2d");
    const cards = await Canvas.loadImage("./cartas.png");

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    let palos = ["oro", "copas", "espadas", "basto"];

    drawCard(
      palos[Math.floor(Math.random() * palos.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      1
    );
    drawCard(
      palos[Math.floor(Math.random() * palos.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      2
    );
    drawCard(
      palos[Math.floor(Math.random() * palos.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      3
    );
    drawCard(
      palos[Math.floor(Math.random() * palos.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      4
    );
    function drawCard(palo, numero, espacio) {
      let coord = {
        oro: 0,
        copas: 1,
        espadas: 2,
        basto: 3,
      };

      switch (espacio) {
        case 1:
          context.drawImage(
            cards,
            x * (numero - 1),
            coord[palo] * y,
            x,
            y,
            0,
            0,
            x,
            y
          );
          break;
        case 2:
          context.drawImage(
            cards,
            x * (numero - 1),
            coord[palo] * y,
            x,
            y,
            x,
            0,
            x,
            y
          );
          break;
        case 3:
          context.drawImage(
            cards,
            x * (numero - 1),
            coord[palo] * y,
            x,
            y,
            0,
            y,
            x,
            y
          );
          break;
        case 4:
          context.drawImage(
            cards,
            x * (numero - 1),
            coord[palo] * y,
            x,
            y,
            x,
            y,
            x,
            y
          );
          break;
      }
    }

    let test = new AttachmentBuilder(await canvas.encode("png"), {
      name: "test.png",
    });

    interaction.editReply({ files: [test] });
  },
};
