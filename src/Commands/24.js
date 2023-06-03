const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");
const Juego = require("../structures/Juego24");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("24")
    .setDescription("Tira 4 cartas al azar"),
  /**
   *  @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    await interaction.deferReply();
    let { jugando } = interaction.client;

    if (!jugando) {
      interaction.client.jugando = true;
      const juego = new Juego();
      let numeros = juego.drawCards();

      await interaction.editReply({
        files: ["./cartas.png"],
      });

      let collector = interaction.channel.createMessageCollector({
        time: 5 * 60 * 1000,
        dispose: true,
        filter: (x) =>
          x.content.toLowerCase() == "pasar" ||
          /^\s*\(*\d{1,2}\)*\s*(?:(?:[+\-*/]|rt|lg)\s*\(*\d{1,2}\)*\s*)*(?:\*\*\s*\(*\d{1,2}\)*\s*(?:(?:[+\-*/]|rt|lg)\s*\(*\d{1,2}\)*\s*)*)?$/g.test(
            x.content
          ),
      });

      collector.on("collect", (m) => {
        let resultado = m.content;
        if (
          m.author == interaction.member.user &&
          m.content.toLowerCase() == "pasar"
        ) {
          collector.stop("Juego pasado");
          interaction.client.jugando = false;
          return m.reply({
            content: "Chauuu",
          });
        }
        let flag = false;

        for (const numero of numeros) {
          if (!resultado.includes(numero)) {
            flag = false;
            break;
          }
          flag = true;
        }
        // Verifica que no hayan numeros de mas
        resultado.match(/\d+/g).length > 4 ? (flag = false) : (flag = true);
        resultado = resultado.replace(/(\d+)rt(\d+)/, "Math.pow($2, 1/$1)");
        resultado = resultado.replace(
          /(\d+)lg(\d+)/,
          "Math.log($2)/Math.log($1)"
        );

        if (flag) resultado = eval(resultado);

        if (resultado == 24) {
          collector.stop("Juego resuelto");
          interaction.client.jugando = false;

          m.reply({
            content: "Correcto",
          });
        }
      });
      collector.on("end", () => {
        interaction.client.jugando = false;
      });
    } else {
      await interaction.editReply({
        content: "Anterior juego no resuelto",
      });
    }
  },
};
