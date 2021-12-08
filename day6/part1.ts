import { readFile } from "fs/promises";

async function getAnswer(path: string) {
  const input = await readFile(path);
  let fish: number[] = input
    .toString()
    .trim()
    .split(",")
    .map((str) => Number.parseInt(str));

  for (let i = 0; i < 80; i++) {
    let addedFish = [];
    for (let j = 0; j < fish.length; j++) {
      if (fish[j] === 0) {
        addedFish.push(8);
        fish[j] = 6;
        continue;
      }
      fish[j] = fish[j] - 1;
    }
    fish = fish.concat(addedFish);
  }
  console.log(fish.length);
}

// getAnswer("./day6/test1.txt");
getAnswer("./day6/input.txt");
