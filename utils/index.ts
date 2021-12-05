export const stringLinesToNumber = (str: string) =>
  str.split("\n").map((line) => parseInt(line, 10));

export const stringLinesToNumbers = (str: string, sep = "\t") =>
  str
    .split("\n")
    .map((line) => line.split(sep).map((num) => parseInt(num, 10)));

export const stringLinesToStrings = (str: string, sep = "\t") =>
  str.split("\n").map((line) => line.split(sep));
