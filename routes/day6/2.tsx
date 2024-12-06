import { Handlers, PageProps } from "$fresh/server.ts";
import { Answer } from "../../components/Answer.tsx";
import { Layout } from "../../components/Layout.tsx";
import { mapToInts, sumInts } from "../../utils.ts";

type Data = string[][];

type Loc = {
  x: number;
  y: number;
};

export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const text = await Deno.readTextFile("./routes/day6/input-test.txt");
    // const text = await Deno.readTextFile("./routes/day6/input.txt");
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

  const isInGrid = (location: Loc) => {
    const { x, y } = location;
    return x >= 0 && x < rowLength && y >= 0 && y < colLength;
  };

  const visitedLocations: Loc[] = [];

  // Find intial position of guard and direction.
  // Add position to a `map`
  // While currentPosition is inside the grid
  // try to move position appropriately (x + - 1, or y + - 1)
  // if the next position would be a `#`, change direction instead
  // add currentPosition to the `map`

  // Once out of the while loop, check the map length

  const rowLength = data[0].length;

  const colLength = data.length;

  let currentPosition: Loc = {
    x: 0,
    y: 0,
  };

  for (let y = 0; y < colLength; y++) {
    for (let x = 0; x < rowLength; x++) {
      if (data[y][x] === "^") {
        currentPosition = {
          x,
          y,
        };
        visitedLocations.push(currentPosition);
      }
    }
  }

  let inGrid = true;

  const directions = ["UP", "RIGHT", "DOWN", "LEFT"];

  let directionIndex = 0;
  while (inGrid) {
    const nextLocPosition: Loc = {
      x:
        directions[directionIndex] === "RIGHT"
          ? currentPosition.x + 1
          : directions[directionIndex] === "LEFT"
          ? currentPosition.x - 1
          : currentPosition.x,
      y:
        directions[directionIndex] === "DOWN"
          ? currentPosition.y + 1
          : directions[directionIndex] === "UP"
          ? currentPosition.y - 1
          : currentPosition.y,
    };
    if (!isInGrid(nextLocPosition)) {
      inGrid = false;
      break;
    }
    const nextChar: string = data[nextLocPosition.y][nextLocPosition.x];

    if (nextChar === "#") {
      console.log({ nextChar }, { nextLocPosition });
      directionIndex =
        directionIndex === directions.length - 1 ? 0 : directionIndex + 1;
    } else {
      currentPosition = nextLocPosition;
      visitedLocations.push(currentPosition);
    }
  }

  const locstrings = visitedLocations.map((l) => `${l.x}|${l.y}`);
  const locset = new Set(locstrings);
  console.log({ locset });

  const answer = locset.size;
  console.log("The answer is :", answer);

  return (
    <>
      <Layout>
        <Answer>
          <div className="grid gap-4">
            {data.map((col, colIndex) => (
              <div
                className="grid gap-4"
                style={`grid-template-columns: repeat(${rowLength}, 40px)`}
              >
                {col.map((row, rowIndex) => (
                  <div
                    className={`w-10 h-10 ${
                      row === "#" ? "bg-red-100" : ""
                    } grid place-content-center`}
                  >
                    {locstrings.includes(`${rowIndex}|${colIndex}`) ? "X" : row}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Answer>
      </Layout>
    </>
  );
}
