import { readFile } from "fs/promises";

async function getAnswer(path: string) {
  const input = await readFile(path);
  let lines: string[] = input.toString().trim().split("\n");

  let count = 0;
  lines.forEach((line) => {
    const [_, end] = line.split("|");
    const entries = end.split(" ");
    entries.forEach((entry) => {
      if (![2, 3, 4, 7].includes(entry.length)) return;
      count++;
    });
  });
  console.log(count);
}

// getAnswer("./day8/test1.txt");
getAnswer("./day8/input.txt");
