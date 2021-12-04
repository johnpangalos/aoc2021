import { readFile } from "fs/promises";

function binToNum(arr: number[]): number {
  return arr.reverse().reduce((acc, curr, idx) => {
    if (curr === 0) return acc;
    return acc + Math.pow(2, idx);
  }, 0);
}

async function part1(path: string) {
  const input = await readFile(path);
  const binNums: number[][] = input
    .toString()
    .trim()
    .split("\n")
    .map((str) => str.split("").map((char) => Number.parseInt(char)));

  let gammaRateArr: number[] = [];
  let epsilonRateArr: number[] = [];
  let sums: number[] = [];

  let o2Arr = [...binNums];
  let co2Arr = [...binNums];

  let idx = 0;
  while (o2Arr.length > 1) {
    const sum = o2Arr.reduce((acc, bin) => acc + bin[idx], 0);
    const commonBit = sum < o2Arr.length / 2 ? 0 : 1;
    o2Arr = o2Arr.filter((bin) => bin[idx] === commonBit);
    idx++;
  }

  idx = 0;
  while (co2Arr.length > 1) {
    const sum = co2Arr.reduce((acc, bin) => acc + bin[idx], 0);
    const commonBit = sum < co2Arr.length / 2 ? 1 : 0;
    co2Arr = co2Arr.filter((bin) => bin[idx] === commonBit);
    idx++;
  }
  console.log(binToNum(o2Arr[0]) * binToNum(co2Arr[0]));
}
// part1("./day3/test1.txt");
part1("./day3/input.txt");
