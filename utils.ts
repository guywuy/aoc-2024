export const sum = (a: number, b: number) => a + b;

export const mapToInts = (strs: string[]) => strs.map((s) => parseInt(s));

export const sumInts = (arr: number[]) => arr.reduce(sum, 0);

export const splitStringByWhitespace = (l: string) => l.split(/\s+/g);
