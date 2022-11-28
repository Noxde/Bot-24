const Canvas = require("canvas");
const fs = require("fs");

class Juego {
  #y;
  #x;
  #canvas;
  #context;
  #cards;
  #valores;
  #palos;
  #numeros;
  constructor() {
    this.#y = 318;
    this.#x = 208;
    this.#canvas = Canvas.createCanvas(this.#x * 2, this.#y * 2);
    this.#context = this.#canvas.getContext("2d");

    this.#valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    this.#palos = ["oro", "copas", "espadas", "basto"];
    this.#numeros = [
      this.#valores[Math.floor(Math.random() * this.#valores.length)],
      this.#valores[Math.floor(Math.random() * this.#valores.length)],
      this.#valores[Math.floor(Math.random() * this.#valores.length)],
      this.#valores[Math.floor(Math.random() * this.#valores.length)],
    ];
  }

  async #drawCard(palo, numero, espacio) {
    let cards = await Canvas.loadImage("./assets/cartas.png");
    let x = this.#x;
    let y = this.#y;
    let context = this.#context;
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

    fs.writeFileSync(`./cartas.png`, await this.#canvas.toBuffer());
  }

  drawCards() {
    this.#drawCard(
      this.#palos[Math.floor(Math.random() * this.#palos.length)],
      this.#numeros[0],
      1
    );
    this.#drawCard(
      this.#palos[Math.floor(Math.random() * this.#palos.length)],
      this.#numeros[1],
      2
    );
    this.#drawCard(
      this.#palos[Math.floor(Math.random() * this.#palos.length)],
      this.#numeros[2],
      3
    );
    this.#drawCard(
      this.#palos[Math.floor(Math.random() * this.#palos.length)],
      this.#numeros[3],
      4
    );
  }
}

module.exports = Juego;
