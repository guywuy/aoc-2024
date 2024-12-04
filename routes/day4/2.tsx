import { Handlers, PageProps } from "$fresh/server.ts";
import { Answer } from "../../components/Answer.tsx";
import { Layout } from "../../components/Layout.tsx";
import { mapToInts, sumInts } from "../../utils.ts";

type Data = string[][];

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    // const text = await Deno.readTextFile("./routes/day4/input-test.txt");
    const text = await Deno.readTextFile("./routes/day4/input.txt");
    const data = text
      .trim()
      .split("\n")
      .map((l) => l.split(""));
    return ctx.render(data);
  },
};

export default function Day({ data }: PageProps<Data>) {
  if (!data) {
    return <h1>Data not found</h1>;
  }

  const isXmas = (stingArr: (string | undefined)[]) =>
    stingArr.length === 4 &&
    stingArr[0] === "X" &&
    stingArr[1] === "M" &&
    stingArr[2] === "A" &&
    stingArr[3] === "S";

  // For y in col
  // for x in row
  // If val is X, check each direction for letters making up XMAS
  // If found, increment total
  let valids = [];

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      const letter = data[y][x];
      if (letter === "X") {
        // console.log({ x, y });
        const arrayRight = [
          letter,
          data[y][x + 1],
          data[y][x + 2],
          data[y][x + 3],
        ];
        const arrayLeft = [
          letter,
          data[y][x - 1],
          data[y][x - 2],
          data[y][x - 3],
        ];
        const arrayTop = [
          letter,
          data.at(y - 1)?.at(x),
          data.at(y - 2)?.at(x),
          data.at(y - 3)?.at(x),
        ];
        const arrayBottom = [
          letter,
          data.at(y + 1)?.at(x),
          data.at(y + 2)?.at(x),
          data.at(y + 3)?.at(x),
        ];
        const arrayTopLeft = [
          letter,
          data.at(y - 1)?.at(x - 1),
          data.at(y - 2)?.at(x - 2),
          data.at(y - 3)?.at(x - 3),
        ];
        const arrayTopRight = [
          letter,
          data.at(y - 1)?.at(x + 1),
          data.at(y - 2)?.at(x + 2),
          data.at(y - 3)?.at(x + 3),
        ];
        const arrayBottomLeft = [
          letter,
          data.at(y + 1)?.at(x - 1),
          data.at(y + 2)?.at(x - 2),
          data.at(y + 3)?.at(x - 3),
        ];
        const arrayBottomRight = [
          letter,
          data.at(y + 1)?.at(x + 1),
          data.at(y + 2)?.at(x + 2),
          data.at(y + 3)?.at(x + 3),
        ];
        const arraysToCheck = [
          arrayTop,
          arrayBottom,
          arrayRight,
          arrayLeft,
          arrayTopRight,
          arrayTopLeft,
          arrayBottomLeft,
          arrayBottomRight,
        ];

        arraysToCheck.forEach((arr) => {
          const valid = isXmas(arr);
          if (valid) {
            console.log("valid at : ", { x, y });
            valids.push({ x, y });
          }
        });
      }
    }
  }

  const answer = valids.length;
  console.log(answer);

  return (
    <>
      <Layout>
        <Answer>{answer ? answer : ""}</Answer>
      </Layout>
    </>
  );
}
