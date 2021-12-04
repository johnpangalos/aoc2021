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

  binNums.forEach((binNum) => {
    binNum.forEach((bit, bitIdx) => {
      if (sums[bitIdx] === undefined) return (sums[bitIdx] = bit);
      sums[bitIdx] = sums[bitIdx] + bit;
    });
  });
  sums.forEach((sum) => {
    if (sum < binNums.length / 2) {
      gammaRateArr.push(0);
      epsilonRateArr.push(1);
      return;
    }
    gammaRateArr.push(1);
    epsilonRateArr.push(0);
  });
  console.log(binToNum(gammaRateArr) * binToNum(epsilonRateArr));
}
// part1("./day3/test1.txt");
part1("./day3/input.txt");
