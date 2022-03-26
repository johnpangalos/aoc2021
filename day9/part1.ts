import { readFile } from "fs/promises";

type Points = Map<string, { val: number; x: number; y: number }>;

function genKey(x: number, y: number) {
  return `${x}.${y}`;
}

function compare(val1: number, val2?: number) {
  if (val2 === undefined) return true;
  return val1 < val2;
}

async function getAnswer(path: string) {
  const input = await readFile(path);
  let lines: string[] = input.toString().trim().split("\n");

  const points: Points = new Map();
  let count = 0;
  lines.forEach((line, y) => {
    line.split("").forEach((chr, x) => {
      points.set(genKey(x, y), { val: Number.parseInt(chr), x, y });
    });
  });

  points.forEach(({ val, x, y }, _, m) => {
    const { val: up } = m.get(genKey(x, y - 1)) ?? {};
    const { val: down } = m.get(genKey(x, y + 1)) ?? {};
    const { val: left } = m.get(genKey(x - 1, y)) ?? {};
    const { val: right } = m.get(genKey(x + 1, y)) ?? {};
    if ([up, down, left, right].every((item) => compare(val, item)))
      count = count + val + 1;
  });
  console.log(count);
}

// getAnswer("./day9/test1.txt");
getAnswer("./day9/input.txt");
