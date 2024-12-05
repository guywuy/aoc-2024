import { Handlers, PageProps } from "$fresh/server.ts";
import { Answer } from "../../components/Answer.tsx";
import { Layout } from "../../components/Layout.tsx";
import { mapToInts, sumInts } from "../../utils.ts";

interface Data {
  rules: string[][];
  lines: string[][];
}

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    // const text = await Deno.readTextFile("./routes/day5/input-test.txt");
    const text = await Deno.readTextFile("./routes/day5/input.txt");
    const data = text
      .trim()
      .split("\n\n")
      .map((l) => l.split("\n"))
      .map((block, i) =>
        i === 0
          ? block.map((line) => line.split("|"))
          : block.map((line) => line.split(","))
      );
    return ctx.render({
      rules: data[0],
      lines: data[1],
    });
  },
};

export default function Day({ data }: PageProps<Data>) {
  if (!data) {
    return <h1>Data not found</h1>;
  }

  const { rules, lines } = data;

  // for each line.
  // check each number.
  // find each rule that contains the number.
  // for each matching rule
  //   - if the number is on the left, the number on the right shouldn't appear before the current number in the line.
  //   - if the number is on the right, the number on the left shouldn't appear after the current number in the line.

  const isValidLine = (line: string[]) => {
    let valid = true;
    line.forEach((letter, letterIndex) => {
      if (!valid) return;

      const relevantRules = rules.filter((rule) => rule.includes(letter));
      relevantRules.forEach((rule) => {
        const prevLetters = line.slice(0, letterIndex);
        const nextLetters = line.slice(letterIndex + 1);
        const isLeft = rule[0] === letter;

        if (isLeft && prevLetters.includes(rule[1])) {
          valid = false;
        } else if (!isLeft && nextLetters.includes(rule[0])) {
          valid = false;
        }
      });
    });
    return valid;
  };

  const valids = lines.filter((line) => isValidLine(line));

  console.log(valids);

  const answer = sumInts(
    mapToInts(valids.map((line) => line.at(Math.floor(line.length / 2))!))
  );
  console.log(answer);

  return (
    <>
      <Layout>
        <Answer>{answer}</Answer>
      </Layout>
    </>
  );
}
