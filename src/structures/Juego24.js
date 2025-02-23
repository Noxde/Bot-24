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
    // Load JSON dictionary from file
    const rawData = fs.readFileSync('./src/Combinations/Combinations.json', 'utf8');
    const dictionary = JSON.parse(rawData);
    const numbers = [];

    //Get numbers until they make a valid combination
    let valid = false;
    while (!valid) {
        numbers.length = 0;
        for (let i = 1; i <= 4; i++) {
            numbers.push(Random.range(1, 12));
        }
        const sorted_numbers = [...numbers].sort((a, b) => a - b);
        const key = `${sorted_numbers[0]} ${sorted_numbers[1]} ${sorted_numbers[2]} ${sorted_numbers[3]}`;
        valid = dictionary[key];
    }

    for (let i = 1; i <= 4; i++) {
      this.#drawCard(Random.range(1, 4), numbers[i-1], i);
    }
    return numbers;
  }
}

module.exports = Juego;
