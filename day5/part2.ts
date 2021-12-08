import { readFile } from "fs/promises";

type Vector = { x1: number; y1: number; x2: number; y2: number };

async function part1(path: string) {
  const input = await readFile(path);
  const vectors: Vector[] = input
    .toString()
    .trim()
    .split("\n")
    .map((str) => {
      const [start, end] = str.split("->");
      const [x1, y1] = start
        .trim()
        .split(",")
        .map((s) => Number.parseInt(s));
      const [x2, y2] = end
        .trim()
        .split(",")
        .map((s) => Number.parseInt(s));
      return { x1, y1, x2, y2 };
    });
  const points: Map<string, number> = new Map();

  vectors.forEach((vec) => {
    let xFunc = (num: number) => num;
    let yFunc = (num: number) => num;

    if (vec.x1 > vec.x2) xFunc = (num: number) => num - 1;
    if (vec.y1 > vec.y2) yFunc = (num: number) => num - 1;

    if (vec.x1 < vec.x2) xFunc = (num: number) => num + 1;
    if (vec.y1 < vec.y2) yFunc = (num: number) => num + 1;

    let currX = vec.x1;
    let currY = vec.y1;

    let run = true;
    while (run) {
      if (currX === vec.x2 && currY === vec.y2) run = false;
      const exist = points.get(`${currX}.${currY}`);
      if (!exist) {
        points.set(`${currX}.${currY}`, 1);
      } else {
        points.set(`${currX}.${currY}`, exist + 1);
      }
      currX = xFunc(currX);
      currY = yFunc(currY);
    }
  });

  let total = 0;
  points.forEach((point) => {
    if (point === 1) return;
    total++;
  });
  console.log(total);
}

// part1("./day5/test1.txt");
part1("./day5/input.txt");
