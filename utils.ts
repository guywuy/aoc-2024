import { JSX } from "https://esm.sh/v99/preact@10.11.0/src/index.d.ts";
import { JSXInternal } from "https://esm.sh/v99/preact@10.11.0/src/jsx.d.ts";

// export const arrayToP: JSX.Element = (arr: string[] | number[]) =>
//   arr.map((a, i) => (<p key={i}>{a}</p>));

export const sum = (a: number, b: number) => a + b;

export const mapToInts = (strs: string[]) => strs.map((s) => parseInt(s));

export const sumInts = (arr: number[]) => arr.reduce(sum, 0);
