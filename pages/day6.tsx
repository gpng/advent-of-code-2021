import React, { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day6";
import { stringLinesToNumbers } from "../utils";

const Day6 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const total = (list: number[], days: number) => {
    const daysLeftMap: Record<number, number> = {};
    for (let i = 0; i <= 8; i++) {
      daysLeftMap[i] = 0;
    }
    list.forEach((num) => {
      daysLeftMap[num]++;
    });
    for (let i = 1; i <= days; i++) {
      const new8 = daysLeftMap[0];
      for (let j = 0; j < 8; j++) {
        daysLeftMap[j] = daysLeftMap[j + 1];
      }
      daysLeftMap[8] = new8;
      daysLeftMap[6] += new8;
    }
    return Object.values(daysLeftMap).reduce((acc, curr) => acc + curr, 0);
  };

  const main = () => {
    const numbers = stringLinesToNumbers(input, ",")[0];

    setAnswer1(total(numbers, 80).toString());
    setAnswer2(total(numbers, 256).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default Day6;
