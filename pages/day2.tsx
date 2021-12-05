import React, { useState, useEffect } from "react";
import { stringLinesToStrings } from "../utils";
import input from "../data/day2";

const Day2 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  // "down" increases y by val
  // "up" decreases y by val
  // "forward" increases x by val
  // returns x * y
  const move = (instrs: [string, number][]): number => {
    let x = 0;
    let y = 0;
    for (const [dir, val] of instrs) {
      if (dir === "down") {
        y += val;
      } else if (dir === "up") {
        y -= val;
      } else if (dir === "forward") {
        x += val;
      }
    }
    return x * y;
  };

  // "down" increases aim by val
  // "up" decreases aim by val
  // "forward" increases x by val and increases y by aim * val
  // returns x * y
  const move2 = (instrs: [string, number][]): number => {
    let x = 0;
    let y = 0;
    let aim = 0;
    for (const [dir, val] of instrs) {
      if (dir === "down") {
        aim += val;
      } else if (dir === "up") {
        aim -= val;
      } else if (dir === "forward") {
        x += val;
        y += aim * val;
      }
    }
    return x * y;
  };

  const main = () => {
    const lines = stringLinesToStrings(input);
    const instrs: [string, number][] = lines
      .map((line) => line[0].split(" "))
      .map((row) => [row[0], parseInt(row[1], 10)]);

    setAnswer1(move(instrs).toString());
    setAnswer2(move2(instrs).toString());
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

export default Day2;
