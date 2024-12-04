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

  const isXmas = (surrounds: string[][]) => {
    let left = false;
    let right = false;
    if (
      (surrounds[0][0] === "M" && surrounds[2][2] === "S") ||
      (surrounds[0][0] === "S" && surrounds[2][2] === "M")
    ) {
      left = true;
    }
    if (
      (surrounds[0][2] === "M" && surrounds[2][0] === "S") ||
      (surrounds[0][2] === "S" && surrounds[2][0] === "M")
    ) {
      right = true;
    }
    return left && right;
  };

  const valids: {
    x: number;
    y: number;
  }[] = [];

  const rowLength = data[0].length;

  const colLength = data.length;

  for (let y = 0; y < colLength; y++) {
    for (let x = 0; x < rowLength; x++) {
      const letter = data[y][x];

      if (letter === "A" && y > 0 && x > 0 && y < colLength - 1 && x < rowLength - 1) {
        const arr = [
          [data[y - 1][x - 1], data[y - 1][x], data[y - 1][x + 1]],
          [data[y][x - 1], data[y][x], data[y][x + 1]],
          [data[y + 1][x - 1], data[y + 1][x], data[y + 1][x + 1]],
        ];
        const valid = isXmas(arr);
        if (valid) {
          console.log("valid at : ", { x, y }, "with letters", arr);
          valids.push({ x, y });
        }
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
