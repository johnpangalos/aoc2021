import { readFile } from "fs/promises";

async function getAnswer(path: string) {
  const input = await readFile(path);
  let lines: string[] = input.toString().trim().split("\n");

  let sum = 0;
  lines.forEach((line) => {
    const [start, end] = line.split("|").map((str) => str.trim().split(" "));

    const eight = start.find((item) => item.length === 7)?.split("");
    const one = start.find((item) => item.length === 2)?.split("");
    const seven = start.find((item) => item.length === 3)?.split("");
    const four = start.find((item) => item.length === 4)?.split("");

    const trBlMiddle = start
      .filter((item) => item.length === 6)
      .map((str) => str.split(""))
      .reduce<string[]>((acc, curr) => {
        const diff = eight?.filter((item) => !curr.includes(item));
        if (diff === undefined) throw new Error("tlBrMiddle diff error");
        return [...acc, ...diff];
      }, []);

    const topMiddleBottom = start
      .filter((item) => item.length === 5)
      .map((str) => str.split(""))
      .reduce<string[]>((acc, curr, idx) => {
        if (idx === 0) return curr;
        return acc.filter((item) => curr.includes(item));
      }, []);

    const oneSevenDiff = seven?.filter((item) => !one?.includes(item));
    const oneFourDiff = four?.filter((item) => !one?.includes(item));

    if (oneSevenDiff === undefined) throw new Error("oneSevenDiff error");
    if (oneFourDiff === undefined) throw new Error("oneFourDiff error");
    if (eight === undefined) throw new Error("eight error");

    const top = oneSevenDiff[0];
    const [bottom] = topMiddleBottom.filter(
      (item) => !trBlMiddle.includes(item) && item !== top
    );
    const [middle] = topMiddleBottom.filter(
      (item) => ![top, bottom].includes(item)
    );
    const [tl] = oneFourDiff?.filter((item) => item !== middle);
    const [tr] = trBlMiddle?.filter((item) => one?.includes(item));
    const [bl] = trBlMiddle?.filter((item) => ![tr, middle].includes(item));
    const [br] = eight?.filter(
      (item) => ![top, tl, tr, middle, bl, bottom].includes(item)
    );

    function getNumber(str: string): number {
      if (str.length === 2) return 1;
      if (str.length === 3) return 7;
      if (str.length === 4) return 4;
      if (str.length === 7) return 8;
      if (str.length === 6 && !str.includes(middle)) return 0;
      if (str.length === 6 && !str.includes(tr)) return 6;
      if (str.length === 6 && !str.includes(bl)) return 9;
      if (str.length === 5 && str.includes(bl)) return 2;
      if (str.length === 5 && str.includes(tl)) return 5;
      return 3;
    }

    sum =
      sum +
      end.reduce<number>((acc, curr) => {
        return Number.parseInt(`${acc}${getNumber(curr)}`);
      }, 0);
  });
  console.log(sum);
}

// getAnswer("./day8/test1.txt");
// getAnswer("./day8/test2.txt");
getAnswer("./day8/input.txt");
