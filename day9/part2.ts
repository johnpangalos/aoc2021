import { readFile } from "fs/promises";

type Point = { val: number; x: number; y: number };
type Points = Map<string, Point>;
type SurroundingPoints = {
  up?: Point;
  down?: Point;
  right?: Point;
  left?: Point;
};

function genKey(x: number, y: number) {
  return `${x}.${y}`;
}

function compare(val1: number, val2?: number) {
  if (val2 === undefined) return true;
  return val1 < val2;
}

function getBasin(m: Points, p: Point) {}

function getSurrounding(m: Points, p: Point): SurroundingPoints {
  const { x, y } = p;
  const up = m.get(genKey(x, y - 1));
  const down = m.get(genKey(x, y + 1));
  const left = m.get(genKey(x - 1, y));
  const right = m.get(genKey(x + 1, y));
  return { up, down, left, right };
}
async function getAnswer(path: string) {
  const input = await readFile(path);
  let lines: string[] = input.toString().trim().split("\n");

  const points: Points = new Map();
  lines.forEach((line, y) => {
    line.split("").forEach((chr, x) => {
      points.set(genKey(x, y), { val: Number.parseInt(chr), x, y });
    });
  });

  const lowPoints: Set<string> = new Set();
  points.forEach((p, _, m) => {
    const { val, x, y } = p;
    if (
      Object.values(getSurrounding(m, p)).every((item: Point | undefined) => {
        if (item === undefined) return;
        return compare(val, item.val);
      })
    )
      lowPoints.add(genKey(x, y));
  });

  lowPoints.forEach((point) => {});
}

// getAnswer("./day9/test1.txt");
getAnswer("./day9/input.txt");
