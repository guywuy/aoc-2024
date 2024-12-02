import { Handlers, PageProps } from "$fresh/server.ts";
import { Answer } from "../../components/Answer.tsx";
import { Layout } from "../../components/Layout.tsx";
import { mapToInts, sumInts } from "../../utils.ts";

type Data = string[][];

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    // const text = await Deno.readTextFile("./routes/day2/input-test.txt");
    const text = await Deno.readTextFile("./routes/day2/input.txt");
    const data = text
      .trim()
      .split("\n")
      .map((l) => l.split(/\s+/g));
    return ctx.render(data);
  },
};

export default function Day({ data }: PageProps<Data>) {
  if (!data) {
    return <h1>Data not found</h1>;
  }

  const reports = data.map((line) => mapToInts(line));

  const safes = reports.map((line) => {
    let isSafe = true;
    let prev = line[0];
    const asc = line[0] < line[1];
    line.forEach((number, index) => {
      if (index === 0) return;

      if (asc) {
        if (prev >= number) {
          isSafe = false;
          return;
        }
      } else {
        if (prev <= number) {
          isSafe = false;
          return;
        }
      }

      if (Math.abs(prev - number) > 3) {
        isSafe = false;
        return;
      }

      prev = number;
    });

    return isSafe ? 1 : 0;
  });

  console.log(safes);

  const answer = sumInts(safes);
  console.log(answer);

  return (
    <>
      <Layout>
        <Answer>{answer}</Answer>
      </Layout>
    </>
  );
}
