import { Handlers, PageProps } from "$fresh/server.ts";
import { Answer } from "../../components/Answer.tsx";
import { Layout } from "../../components/Layout.tsx";

type Data = string[][];

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const text = await Deno.readTextFile("./routes/day1/input.txt");
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

  const firsts = data
    .map((line) => parseInt(line[0]))
    .sort((a, b) => (a > b ? 1 : -1));
  const lasts = data
    .map((line) => parseInt(line[1]))
    .sort((a, b) => (a > b ? 1 : -1));
  // const diff = firstAndLast.map(n => n[0] + n[1])

  const countMap = new Map<
    number,
    {
      count: number;
      matches: number;
    }
  >();
  firsts.forEach((num) => {
    if (countMap.has(num)) {
      countMap.set(num, {
        count: countMap.get(num)!.count + 1,
        matches: countMap.get(num)!.matches,
      });
    } else {
      const matches = lasts.filter((last) => last === num).length;
      countMap.set(num, {
        count: 1,
        matches,
      });
    }
  });

  const answer = countMap.entries().reduce((prev, current) => {
    const lineValue = current[0] * (current[1].count * current[1].matches);
    return lineValue + prev
  }, 0);
  console.log(answer);

  return (
    <>
      <Layout>
        <Answer>{answer}</Answer>
      </Layout>
    </>
  );
}
