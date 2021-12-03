import { readFile } from "fs/promises";

async function day1Part1(path: string) {
  const input = await readFile(path);
  const depths: number[] = input
    .toString()
    .split("\n")
    .map((str) => Number.parseInt(str));
  const res = depths.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return acc;
    if (curr <= arr[idx - 1]) return acc;
    return acc + 1;
  }, 0);
  console.log("Difference: ", res);
}

day1Part1("./day1/input.txt");
// day1Part1("./day1/test1.txt");
