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


  const firsts = data.map(line => parseInt(line[0])).sort((a, b) => a > b ? 1 : -1);
  const lasts = data.map(line => parseInt(line[1])).sort((a, b) => a > b ? 1 : -1);
  // const diff = firstAndLast.map(n => n[0] + n[1])
  console.log(firsts);
  console.log(lasts);

  const answer = firsts.reduce((prev, item, index) => {
    const diff = Math.abs(item - lasts[index]);
    return prev + diff
  }, 0);

  return (
    <>
      <Layout>
        <Answer>{answer}</Answer>
      </Layout>
    </>
  );
}
