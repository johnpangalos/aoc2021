import { readFile } from "fs/promises";

async function getAnswer(path: string) {
  const input = await readFile(path);
  let movements: number[] = input
    .toString()
    .trim()
    .split(",")
    .map((str) => Number.parseInt(str));

  let temp = Infinity;
  let pos = 0;
  while (true) {
    const sum = movements.reduce((acc, curr) => acc + Math.abs(curr - pos), 0);
    if (sum > temp) break;
    temp = sum;
    pos++;
  }
  console.log(temp);
}

// getAnswer("./day7/test1.txt");
getAnswer("./day7/input.txt");
