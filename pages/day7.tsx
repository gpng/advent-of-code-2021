import React, { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day7";
import { stringLinesToNumber, stringLinesToNumbers } from "../utils";

const DayX = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const part1 = (positions: number[]) => {
    const max = Math.max(...positions);
    const fuels = [];
    for (let i = 0; i < max; i++) {
      let fuel = 0;
      positions.forEach((n) => {
        fuel += Math.abs(n - i);
      });
      fuels.push(fuel);
    }
    return Math.min(...fuels);
  };

  const triangleNumber = (n: number) => {
    return (n * (n + 1)) / 2;
  };

  const part2 = (positions: number[]) => {
    const max = Math.max(...positions);
    const fuels = [];
    for (let i = 0; i < max; i++) {
      let fuel = 0;
      positions.forEach((n) => {
        const steps = Math.abs(n - i);
        fuel += triangleNumber(steps);
      });
      fuels.push(fuel);
    }
    return Math.min(...fuels);
  };

  const main = () => {
    const numbers = stringLinesToNumbers(input, ",")[0];

    setAnswer1(part1(numbers).toString());
    setAnswer2(part2(numbers).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default DayX;
