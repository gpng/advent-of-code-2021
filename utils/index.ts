export const stringLinesToString = (str: string) => str.split("\n");

export const stringLinesToNumber = (str: string) =>
  stringLinesToString(str).map((line) => parseInt(line, 10));

export const stringLinesToNumbers = (str: string, sep = "\t") =>
  stringLinesToString(str).map((line) =>
    line.split(sep).map((num) => parseInt(num, 10))
  );

export const stringLinesToStrings = (str: string, sep = "\t") =>
  stringLinesToString(str).map((line) => line.split(sep));
