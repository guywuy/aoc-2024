interface Props {
  day: number;
}

export function DayLink({ day }: Props) {
  return (
    <li class="grid grid-cols-2 gap-0.5 w-48 h-48 relative rounded-md border-2 border-black overflow-hidden bg-white bg-gradient-to-l from-red-500 via-red-100 via-green-100 to-green-500">
      <a
        class="bg-green-200 bg-opacity-60 flex flex-col justify-end items-center text-center p-8 hover:bg-opacity-100"
        href={`/day${day}/1`}
      >
        Part <span class="text-xl">1</span>
      </a>
      <a
        class="bg-red-200 bg-opacity-60 flex flex-col justify-end items-center text-center p-8 hover:bg-opacity-100"
        href={`/day${day}/2`}
      >
        Part <span class="text-xl">2</span>
      </a>
      <p class="font-bold tracking-widest text-lg absolute top-0 left-0 pointer-events-none text-center w-full py-4 bg-white">
        Day {day}
      </p>
    </li>
  );
}
