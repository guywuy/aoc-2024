import { Head } from "$fresh/runtime.ts";
import { DayLink } from "../components/DayLink.tsx";

export default function Home() {
  const numDays = 25;

  return (
    <>
      <Head>
        <title>AOC 2024</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-lg text-center">
        <h1 class="text-xl font-bold">AOC 2024</h1>
      </div>
      <ol class="p-4 mx-auto max-w-screen-lg grid grid-cols-5 gap-2">
        {Array.from(Array(numDays)).map((d, i) => (
          <DayLink day={i + 1} key={i} />
        ))}
      </ol>
    </>
  );
}
