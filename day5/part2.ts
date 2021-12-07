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
    const xHigh = vec.x1 > vec.x2 ? vec.x1 : vec.x2;
    const xLow = vec.x1 < vec.x2 ? vec.x1 : vec.x2;
    const yHigh = vec.y1 > vec.y2 ? vec.y1 : vec.y2;
    const yLow = vec.y1 < vec.y2 ? vec.y1 : vec.y2;

    for (let i = xLow; i <= xHigh; i++) {
      for (let j = yLow; j <= yHigh; j++) {
        const exist = points.get(`${i}.${j}`);
        if (!exist) {
          points.set(`${i}.${j}`, 1);
          continue;
        }
        points.set(`${i}.${j}`, exist + 1);
      }
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
