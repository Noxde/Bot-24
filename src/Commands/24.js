const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, EmbedBuilder } = require("discord.js");
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
    let {jugando} = interaction.client;

    if(!jugando) {
      interaction.client.jugando = true;
      const juego = new Juego();
      let numeros = juego.drawCards();
      
      await interaction.editReply({
        files: ["./cartas.png"],
        embeds: [
          new EmbedBuilder()
          .setImage(`attachment://cartas.png`)
          .setColor("Green"),
        ],
      });

      let collector = interaction.channel.createMessageCollector({
        time: 5 * 60 * 1000,
        dispose: true,
        filter: (x) => x.content == "Pasar" || (/^\s*\(*\d{1,2}\)*\s*(?:[+\-*/]\s*\(*\d{1,2}\)*\s*)*(?:\*\*\s*\(*\d{1,2}\)*\s*(?:[+\-*/]\s*\(*\d{1,2}\)*\s*)*)?$/g).test(x.content)
      })

      collector.on("collect", (m) => {
        let resultado = m.content;
        if(resultado == "Pasar") {
          collector.stop("Juego pasado");
          interaction.client.jugando = false;
          return  m.reply({
            content: "Chauuu"
          })
        }
        let flag = false;

        for (const numero of numeros) {
          if (!resultado.includes(numero)) {
            flag = false;
            break
          } 
          flag = true;
        }

        if(flag) resultado = eval(resultado);

        if(resultado == 24) {
          collector.stop("Juego resuelto");
          interaction.client.jugando = false;
          
          m.reply({
            content: "Resuelto da 24"
          })
        }
      })
      collector.on("end", () => {
        interaction.client.jugando = false; 
      })

    } else {
      await interaction.editReply({
        content: "Anterior juego no resuelto"
      })
    }
  },
};
