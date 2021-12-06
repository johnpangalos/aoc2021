import { readFile } from "fs/promises";

type MapKey = string;
type MapValue = { value: number; called: boolean };

function checkCard(card: Map<MapKey, MapValue>): boolean | number {
  let isMatch = false;
  for (let i = 0; i < 5; i++) {
    let xNumMatches = 0;
    let yNumMatches = 0;
    for (let j = 0; j < 5; j++) {
      // horizontal
      if (card.get(`${i}.${j}`)?.called) xNumMatches++;
      // vertical
      if (card.get(`${j}.${i}`)?.called) yNumMatches++;
    }
    if ([xNumMatches, yNumMatches].some((matches) => matches === 5)) {
      isMatch = true;
      break;
    }
  }
  return isMatch;
}

async function part1(path: string) {
  const input = await readFile(path);
  const lines: string[] = input.toString().trim().split("\n");

  // Remove empty space from start of cardsRaw
  const [numsRaw, _, ...cardsRaw] = lines;

  const nums = numsRaw.split(",").map((str) => Number.parseInt(str));

  let cardNumber = 0;
  let rowNumber = 0;
  const cards: Map<MapKey, MapValue>[] = [];
  let currCard = new Map<MapKey, MapValue>();

  cardsRaw.forEach((row) => {
    if (row === "") {
      cardNumber++;
      rowNumber = 0;
      cards.push(currCard);
      currCard = new Map<MapKey, MapValue>();
      return;
    }

    row
      .trim()
      .split(" ")
      .filter((item) => item !== "")
      .forEach((str, idx) => {
        currCard.set(`${rowNumber}.${idx}`, {
          value: Number.parseInt(str),
          called: false,
        });
      });
    rowNumber++;
  });

  cards.push(currCard);

  for (let num of nums) {
    cards.forEach((card) => {
      for (let [key, { value }] of card.entries()) {
        if (value === num) card.set(key, { value, called: true });
      }
    });
    const matchCard = cards.find((card) => checkCard(card));

    if (matchCard !== undefined) {
      let numNotMatched = 0;
      matchCard.forEach(({ value, called }) => {
        if (called) return;
        numNotMatched = numNotMatched + value;
      });
      console.log(num * numNotMatched);
      break;
    }
  }
}
// part1("./day4/test1.txt");
part1("./day4/input.txt");
