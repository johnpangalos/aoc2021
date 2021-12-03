import { readFile } from "fs/promises";

async function day1Part2(path: string) {
  const input = await readFile(path);

  const depths: number[] = input
    .toString()
    .split("\n")
    .map((str) => Number.parseInt(str));

  let lastSum: number | null = null;

  const res = depths.reduce((acc, curr, idx, arr) => {
    if (idx < 2) return acc;
    const currentSum = curr + arr[idx - 1] + arr[idx - 2];
    if (lastSum === null || currentSum <= lastSum) {
      lastSum = currentSum;
      return acc;
    }
    lastSum = currentSum;
    return acc + 1;
  }, 0);
  console.log("Difference: ", res);
}

day1Part2("./day1/input.txt");
// day1Part2("./day1/test1.txt");
