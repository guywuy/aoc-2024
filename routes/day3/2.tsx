import { Handlers, PageProps } from "$fresh/server.ts";
import { Answer } from "../../components/Answer.tsx";
import { Layout } from "../../components/Layout.tsx";
import { mapToInts, sumInts } from "../../utils.ts";

type Data = string;

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    // const text = await Deno.readTextFile("./routes/day3/input-test-2.txt");
    const text = await Deno.readTextFile("./routes/day3/input.txt");
    const data = text.trim();
    return ctx.render(data);
  },
};

export default function Day({ data }: PageProps<Data>) {
  if (!data) {
    return <h1>Data not found</h1>;
  }

  // Split strings into array of substrings, split on 'do()' or 'dont()'.
  const split = data.split(/(don't\(\)|do\(\))/g);

  console.log(split);

  let counts = true;
  let validString = ""
  split.forEach(item => {
    if (item === "don't()") {
      counts = false;
      return;
    } else if (item === "do()") {
      counts = true;
      return;
    }
    if (counts) {
      validString = validString + item;
    }
  })

  const parsed = validString.match(/mul\(\d{1,3},\d{1,3}\)/g);

  const numberArrays = parsed!.map((item) =>
    mapToInts(item.match(/\d{1,3}/g) as string[])
  );

  const results = numberArrays.map(arr => arr[0] * arr[1]);

  const answer = sumInts(results);
  console.log(answer);

  return (
    <>
      <Layout>
        <Answer>{answer ? answer : ""}</Answer>
      </Layout>
    </>
  );
}
