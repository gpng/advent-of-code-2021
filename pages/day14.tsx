import React, { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day14";
import { stringLinesToString } from "../utils";

const DayX = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const step = (
    pairs: Record<string, number>,
    counts: Map<string, number>,
    insertions: Record<string, string>
  ): [Record<string, number>, Map<string, number>] => {
    const newPairs: Record<string, number> = { ...pairs };
    const newCounts = new Map(counts);

    for (const [pair, count] of Object.entries(pairs)) {
      if (count <= 0) continue;
      const toInsert = insertions[pair];
      if (!toInsert) continue;
      newPairs[pair] -= count;
      newCounts.set(toInsert, (newCounts.get(toInsert) || 0) + count);

      const newFirstPair = pair[0] + toInsert;
      const newSecondPair = toInsert + pair[1];
      if (!newPairs[newFirstPair]) {
        newPairs[newFirstPair] = 0;
      }
      newPairs[newFirstPair] += count;
      if (!newPairs[newSecondPair]) {
        newPairs[newSecondPair] = 0;
      }
      newPairs[newSecondPair] += count;
    }
    return [newPairs, newCounts];
  };

  const getInsertions = (lines: string[]) => {
    const insertions: Record<string, string> = {};
    lines.forEach((line) => {
      const [pair, insert] = line.split(" -> ");
      insertions[pair] = insert;
    });
    return insertions;
  };

  const scoreCounts = (counts: Map<string, number>) => {
    const max = Math.max(...Array.from(counts.values()));
    const min = Math.min(...Array.from(counts.values()));
    return max - min;
  };

  const lineToPairs = (line: string[]) => {
    const pairs: Record<string, number> = {};

    for (let i = 1; i < line.length; i++) {
      const pair = line.slice(i - 1, i + 1).join("");
      pairs[pair] = (pairs[pair] || 0) + 1;
    }
    return pairs;
  };

  const lineCount = (line: string[]) => {
    const counts = new Map<string, number>();
    line.forEach((letter) => {
      counts.set(letter, (counts.get(letter) || 0) + 1);
    });
    return counts;
  };

  const run = (
    startPairs: Record<string, number>,
    startCounts: Map<string, number>,
    insertions: Record<string, string>,
    n: number
  ) => {
    let pairs = { ...startPairs };
    let counts = new Map(startCounts);
    for (let i = 0; i < n; i++) {
      [pairs, counts] = step(pairs, counts, insertions);
    }
    return scoreCounts(counts);
  };

  const main = () => {
    const lines = stringLinesToString(input);
    const start = lines[0].split("");
    const insertions = getInsertions(lines.slice(2));

    let pairs = lineToPairs(start);
    let counts = lineCount(start);

    setAnswer1(run(pairs, counts, insertions, 10).toString());
    setAnswer2(run(pairs, counts, insertions, 40).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default DayX;
