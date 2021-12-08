import React, { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day8";
import { stringLinesToNumber, stringLinesToStrings } from "../utils";

const DayX = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const part1 = (lines: string[][]) => {
    let count = 0;
    lines.forEach((line) => {
      const output = line[1].split(" ");

      // 1 - 2 seg
      // 4 - 4 seg
      // 7 - 3 seg
      // 8 - 7 seg
      output.forEach((o) => {
        if ([2, 4, 3, 7].includes(o.length)) {
          count += 1;
        }
      });
    });
    return count;
  };

  const allPermutations = (chars: string[]): string[][] => {
    if (chars.length === 1) {
      return [chars];
    }
    const result: string[][] = [];
    chars.forEach((char, index) => {
      const rest = chars.filter((c, i) => i !== index);
      const restPermutations = allPermutations(rest);
      restPermutations.forEach((restPermutation) => {
        result.push([char].concat(restPermutation));
      });
    });
    return result;
  };

  const combinations = [
    "abcefg",
    "cf",
    "acdeg",
    "acdfg",
    "bcdf",
    "abdfg",
    "abdefg",
    "acf",
    "abcdefg",
    "abcdfg",
  ];

  const stringToStrings = (str: string) => {
    return str.split(" ").map((s) => s.split(""));
  };

  const replaceChars = (
    strings: string[][],
    replace: Record<string, string>
  ) => {
    return strings
      .map((d) => d.map((c) => replace[c]))
      .map((s) => s.sort().join(""));
  };

  const part2 = (lines: string[][]) => {
    const orig = ["a", "b", "c", "d", "e", "f", "g"];
    const permutations = allPermutations(orig);
    const replaces: Record<string, string>[] = [];
    permutations.forEach((permutation) => {
      const replace: Record<string, string> = {};
      permutation.forEach((char, index) => {
        replace[char] = orig[index];
      });
      replaces.push(replace);
    });

    let sum = 0;
    lines.forEach((line) => {
      const digits = stringToStrings(line[0]);
      for (const replace of replaces) {
        const replaced = replaceChars(digits, replace);
        const allMatched = !replaced.some((c) => !combinations.includes(c));
        if (allMatched) {
          const output = stringToStrings(line[1]);
          const outputReplaced = replaceChars(output, replace)
            .map((s) => combinations.findIndex((c) => s === c))
            .join("");
          sum += parseInt(outputReplaced, 10);
          return;
        }
      }
    });
    return sum;
  };

  const main = () => {
    const lines = stringLinesToStrings(input, " | ");

    setAnswer1(part1(lines).toString());
    setAnswer2(part2(lines).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default DayX;
