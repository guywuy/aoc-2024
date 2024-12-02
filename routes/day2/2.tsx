import { Handlers, PageProps } from "$fresh/server.ts";
import { Answer } from "../../components/Answer.tsx";
import { Layout } from "../../components/Layout.tsx";
import { mapToInts, sumInts } from "../../utils.ts";

type Data = string[][];

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    // const text = await Deno.readTextFile("./routes/day2/input-test.txt");
    // const text = await Deno.readTextFile("./routes/day2/input-debug.txt");
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

  const isSafe = (line: number[]) => {
    let errors = 0;
    let prev: null | number = null;
    const slopeVal = line.reduce((prev, curr, index) => {
      return index === 0 ? prev : line[index - 1] > curr ? prev + 1 : prev - 1;
    }, 0);
    const asc = slopeVal < 0;

    line.forEach((number, index) => {
      // If first number is not valid, bail out after increasing errors
      if (index === 0) {
        const next = line[1]!;
        if (!asc) {
          if (next >= number) {
            errors++;
            return;
          }
        } else {
          if (next <= number) {
            errors++;
            return;
          }
        }

        if (Math.abs(next - number) > 3) {
          errors++;
          return;
        }
      }

      // First number was error, so set prev to this one and bail
      if (!prev) {
        prev = number;
        return;
      }

      if (asc) {
        if (prev >= number) {
          errors++;
          return;
        }
      } else {
        if (prev <= number) {
          errors++;
          return;
        }
      }

      if (Math.abs(prev - number) > 3) {
        errors++;
        return;
      }

      prev = number;
    });

    return errors === 0;
  };

  const safes = reports.map((line, lineIndex) => {

    let tolerable = false;

    for (let i = 0; i < line.length; i++) {
      const removed = [...line.slice(0, i), ...line.slice(i + 1)];

      if (isSafe(removed)) {
        tolerable = true;
        break;
      }
    }

    return isSafe(line) || tolerable ? 1 : 0;
  });

  console.log(safes);

  const answer = sumInts(safes);
  // console.log(answer);

  return (
    <>
      <Layout>
        <Answer>{answer}</Answer>
      </Layout>
    </>
  );
}
