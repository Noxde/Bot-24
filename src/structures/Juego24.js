const Canvas = require("canvas");
const fs = require("fs");
const Random = require("crypto-random");
class Juego {
  #y;
  #x;
  #canvas;
  #context;
  constructor() {
    this.#y = 319;
    this.#x = 208;
    this.#canvas = Canvas.createCanvas(this.#x * 2, this.#y * 2);
    this.#context = this.#canvas.getContext("2d");
  }

  async #drawCard(palo, numero, espacio) {
    let cards = await Canvas.loadImage("./assets/cartas.png");
    let x = this.#x;
    let y = this.#y;
    let context = this.#context;
    switch (espacio) {
      case 1:
        context.drawImage(cards, x * (numero - 1), palo * y, x, y, 0, 0, x, y);
        break;
      case 2:
        context.drawImage(cards, x * (numero - 1), palo * y, x, y, x, 0, x, y);
        break;
      case 3:
        context.drawImage(cards, x * (numero - 1), palo * y, x, y, 0, y, x, y);
        break;
      case 4:
        context.drawImage(cards, x * (numero - 1), palo * y, x, y, x, y, x, y);
        break;
    }

    fs.writeFileSync(`./cartas.png`, this.#canvas.toBuffer());
  }

  drawCards() {
    let numeros = [];
    for (let i = 1; i <= 4; i++) {
      let numero = Random.range(1, 12);
      this.#drawCard(Random.range(1, 4), numero, i);
      numeros.push(numero);
    }
    return numeros;
  }
}

module.exports = Juego;
