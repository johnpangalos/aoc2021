import { readFile } from "fs/promises";

let fishMap: Map<number, number> = new Map([
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0],
  [6, 0],
  [7, 0],
  [8, 0],
]);

async function getAnswer(path: string) {
  const input = await readFile(path);
  let fish: number[] = input
    .toString()
    .trim()
    .split(",")
    .map((str) => Number.parseInt(str));

  fish.forEach((f) => {
    const currVal = fishMap.get(f);
    if (currVal === undefined) throw new Error("Huh?");
    fishMap.set(f, currVal + 1);
  });

  for (let i = 0; i < 256; i++) {
    const nextMap: Map<number, number> = new Map();
    fishMap.forEach((num, fishNo) => {
      if (fishNo === 0) {
        const curr = nextMap.get(6);
        if (curr === undefined) {
          nextMap.set(6, num);
        } else {
          nextMap.set(6, num + curr);
        }
        nextMap.set(8, num);
        return;
      }

      const curr = nextMap.get(fishNo - 1);
      if (curr === undefined) return nextMap.set(fishNo - 1, num);
      nextMap.set(fishNo - 1, num + curr);
    });
    fishMap = nextMap;
  }
  let sum = 0;
  for (let [_, val] of fishMap) {
    sum = sum + val;
  }
  console.log(sum);
}

// getAnswer("./day6/test1.txt");
getAnswer("./day6/input.txt");
