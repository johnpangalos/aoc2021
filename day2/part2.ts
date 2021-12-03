import { readFile } from "fs/promises";
type Direction = "forward" | "down" | "up";
async function part1(path: string) {
  const input = await readFile(path);
  const moves: [Direction, number][] = input
    .toString()
    .trim()
    .split("\n")
    .map((str) => {
      const [direction, lengthStr] = str.split(" ");
      const length = Number.parseInt(lengthStr);
      if (!["forward", "down", "up"].includes(direction))
        throw new Error("unexpected direction");
      return [direction as Direction, length];
    });

  let x = 0;
  let y = 0;
  let aim = 0;
  moves.forEach(([direction, length]) => {
    if (direction === "up") return (aim = aim - length);
    if (direction === "down") return (aim = aim + length);
    y = y + length * aim;
    x = x + length;
  });
  console.log(x * y);
}
// part1("./day2/test1.txt");
part1("./day2/input.txt");
