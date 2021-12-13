import React, { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day12";
import { stringLinesToString } from "../utils";

const DayX = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const isLowerCase = (char: string) => char === char.toLowerCase();

  const getMap = (lines: string[]) => {
    const map: Record<string, string[]> = {};
    lines.forEach((line) => {
      const [start, end] = line.split("-");
      if (!map[start]) {
        map[start] = [];
      }
      map[start].push(end);
      if (!map[end]) {
        map[end] = [];
      }
      map[end].push(start);
    });
    return map;
  };

  const part1 = (map: Record<string, string[]>) => {
    let queue = [["start"]];
    let i = 0;
    let validPaths: string[][] = [];
    while (queue.length > 0) {
      const newQueue: string[][] = [];
      queue.forEach((path) => {
        const last = path[path.length - 1];
        const visitedSmall = new Set(path.filter(isLowerCase));
        const possibilities = map[last].filter(
          (possibility) =>
            possibility !== last && !visitedSmall.has(possibility)
        );
        possibilities.forEach((possibility) => {
          const newPath = [...path];
          if (possibility === "end") {
            validPaths.push(newPath.concat(possibility));
          } else if (possibility === "start") {
          } else {
            newPath.push(possibility);
            newQueue.push(newPath);
          }
        });
      });
      queue = newQueue;
    }
    return validPaths;
  };

  const visitedSmallCount = (path: string[]) => {
    const count = {} as Record<string, number>;
    path
      .filter((char) => isLowerCase(char))
      .forEach((char) => {
        if (isLowerCase(char)) {
          count[char] = (count[char] || 0) + 1;
        }
      });
    return count;
  };

  const isValid = (path: string[]) => {
    const visited = visitedSmallCount(path);
    return Object.values(visited).filter((count) => count > 1).length < 2;
  };

  const part2 = (map: Record<string, string[]>) => {
    let queue = [["start"]];
    let validPaths: string[][] = [];
    while (queue.length > 0) {
      const newQueue: string[][] = [];
      queue.forEach((path) => {
        const last = path[path.length - 1];
        const visitedSmall = visitedSmallCount(path);
        const possibilities = map[last].filter(
          (possibility) =>
            possibility !== last && (visitedSmall[possibility] || 0) < 2
        );
        possibilities.forEach((possibility) => {
          const newPath = [...path];
          if (possibility === "end") {
            validPaths.push(newPath.concat(possibility));
          } else if (possibility !== "start") {
            newPath.push(possibility);
            if (isValid(newPath)) {
              newQueue.push(newPath);
            }
          }
        });
      });
      queue = newQueue;
    }
    return validPaths;
  };

  const main = () => {
    const lines = stringLinesToString(input);
    const map = getMap(lines);

    setAnswer1(part1(map).length.toString());
    setAnswer2(part2(map).length.toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default DayX;
