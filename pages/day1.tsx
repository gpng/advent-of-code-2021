import React, { useState, useEffect } from "react";
import { stringLinesToNumber } from "../utils";
import input from "../data/day1";

const Day1 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  // count of positive increases from previous number
  const countOfPositiveIncreases = (numbers: number[]): number => {
    let count = 0;
    for (let i = 0; i < numbers.length - 1; i++) {
      if (numbers[i] < numbers[i + 1]) {
        count++;
      }
    }
    return count;
  };

  // sum of previous 3 in array
  const sumOfPreviousThree = (numbers: number[]): number[] => {
    const sums = [];
    for (let i = 0; i < numbers.length - 2; i++) {
      sums.push(numbers[i] + numbers[i + 1] + numbers[i + 2]);
    }
    return sums;
  };

  const main = () => {
    const numbers = stringLinesToNumber(input);
    setAnswer1(countOfPositiveIncreases(numbers).toString());
    setAnswer2(
      countOfPositiveIncreases(sumOfPreviousThree(numbers)).toString()
    );
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

export default Day1;
