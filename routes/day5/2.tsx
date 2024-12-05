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

  const inValids = lines.filter((line) => !isValidLine(line));

  console.log(inValids);

  // For each number in invalid line
  // Insert into new array.
  // Look at each item in new array. If this current number appears on the *left* of a rule with a number in the array, insert it before that number. Otherwise, append it to end of array
  const sortLine = (line: string[]) => {
    // console.log("----------- sorting line");
    // console.log(line);
    // console.log("-----------");
    const sortedArray = [line.at(0)];

    line.forEach((letter, letterIndex) => {
      if (letterIndex === 0) return;
      // console.log('sorting letter: ', letter);

      let placed = false;

      const relevantRules = rules
        .filter((rule) => rule[0] === letter)
        .map((rule) => rule[1]);

      sortedArray.forEach((sortedLetter, sortedIndex) => {
        if (placed) return;
        // console.log({sortedLetter}, { relevantRules }, { sortedArray });

        if (relevantRules.includes(sortedLetter!)) {
          // insert into array at this position
          // console.log("inserting ", letter, " into ", { sortedArray });
          sortedArray.splice(sortedIndex, 0, letter);
          placed = true;
        }
      });
      if (!placed) {
        // console.log("pushing ", letter, " into sortedArray");
        sortedArray.push(letter);
      }
    });

    return sortedArray;
  };

  const newValids = inValids.map((line) => sortLine(line));

  console.log({newValids});

  const answer = sumInts(
    mapToInts(newValids.map((line) => line.at(Math.floor(line.length / 2))!))
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
