import React, { useState, useEffect } from "react";
import { stringLinesToStrings } from "../utils";
import input from "../data/day3";

const Day3 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const mostCommonBit = (numbers: number[][]): number[] => {
    let counts1: Record<number, number> = {
      1: 0,
    };
    for (const line of numbers) {
      line.forEach((num, i) => {
        if (!counts1[i]) {
          counts1[i] = 0;
        }
        if (num === 1) {
          counts1[i]++;
        }
      });
    }
    const n = numbers.length;
    const mostCommon = [0];
    for (const [i, count] of Object.entries(counts1)) {
      mostCommon[parseInt(i, 10)] = count >= n / 2 ? 1 : 0;
    }
    return mostCommon;
  };

  const binaryToDecimal = (binary: string): number => {
    return parseInt(binary, 2);
  };

  const flipBinaryArrray = (arr: number[]): number[] => {
    return arr.map((x) => (x === 0 ? 1 : 0));
  };

  const part1 = (numbers: number[][]) => {
    const mostCommon = mostCommonBit(numbers);
    return (
      binaryToDecimal(mostCommon.join("")) *
      binaryToDecimal(flipBinaryArrray(mostCommon).join(""))
    );
  };

  const filterByMostCommonBit = (
    numbers: number[][],
    flip = false
  ): number[] => {
    let oxygen = [...numbers];
    let i = 0;
    while (oxygen.length > 1) {
      const mostCommon = mostCommonBit(oxygen);
      let num = mostCommon[i];
      if (flip) {
        num = num === 0 ? 1 : 0;
      }
      oxygen = oxygen.filter((line) => line[i] === num);

      i++;
    }

    return oxygen[0];
  };

  const part2 = (numbers: number[][]) => {
    const oxygen = filterByMostCommonBit(numbers);
    const co2 = filterByMostCommonBit(numbers, true);

    return binaryToDecimal(oxygen.join("")) * binaryToDecimal(co2.join(""));
  };

  const main = () => {
    const lines = stringLinesToStrings(input);
    const numbers = lines.map((l) =>
      l[0].split("").map((i) => parseInt(i, 10))
    );

    setAnswer1(part1(numbers).toString());
    setAnswer2(part2(numbers).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return (
    <div>
      <div>Answer1: {answer1}</div>
      <div>Answer2: {answer2}</div>
    </div>
  );
};

export default Day3;
