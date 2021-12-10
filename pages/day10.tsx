import React, { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day10";
import { stringLinesToNumber, stringLinesToStrings } from "../utils";

const pairs: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const corruptionScore: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const incompleteScore: Record<string, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const DayX = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const findCorruptionAndIncomplete = (line: string[]) => {
    const starts = Object.keys(pairs);

    const stack: string[] = [];
    let corrupted: string[] = [];

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (starts.includes(char)) {
        stack.push(char);
        continue;
      }
      const last = stack.pop() as string;
      if (pairs[last] !== char) {
        corrupted.push(char);
      }
    }
    stack.reverse();
    return [corrupted, stack];
  };

  const calcIncompleteScore = (line: string[]) => {
    let score = 0;
    for (const char of line) {
      score *= 5;
      score += incompleteScore[pairs[char]];
    }
    return score;
  };

  const main = () => {
    const lines = stringLinesToStrings(input, "");

    let score = 0;
    const iScores: number[] = [];
    for (const line of lines) {
      const [corrupted, incomplete] = findCorruptionAndIncomplete(line);
      if (corrupted.length > 0) {
        score += corruptionScore[corrupted[0]];
      } else {
        iScores.push(calcIncompleteScore(incomplete));
      }
    }
    iScores.sort((a, b) => a - b);

    setAnswer1(score.toString());
    setAnswer2(iScores[Math.floor(iScores.length / 2)].toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default DayX;
