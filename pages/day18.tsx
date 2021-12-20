import React, { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day18";
import { stringLinesToStrings } from "../utils";

interface Num {
  value: number;
  nested: number;
}

const DayX = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const shouldSplit = (num: Num) => num.value >= 10;

  const shouldExplode = (num: Num) => num.nested > 4;

  const shouldReduce = (num: Num) => shouldExplode(num) || shouldSplit(num);

  const lineToNums = (line: string[]) => {
    const nums: Num[] = [];
    let nest = 0;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === "[") {
        nest++;
        continue;
      }
      if (char === "]") {
        nest--;
        continue;
      }
      if (char === ",") {
        continue;
      }
      nums.push({
        value: parseInt(char, 10),
        nested: nest,
      });
    }
    return nums;
  };

  const addNums = (nums1: Num[], nums2: Num[]) => {
    return [
      ...nums1.map((num) => ({ ...num, nested: num.nested + 1 })),
      ...nums2.map((num) => ({ ...num, nested: num.nested + 1 })),
    ];
  };

  const reduceNums = (currNums: Num[]) => {
    const nums = [...currNums];
    while (nums.some(shouldReduce)) {
      const toExplodeIndex = nums.findIndex(shouldExplode);
      if (toExplodeIndex > -1) {
        const leftNumIndex = toExplodeIndex;
        const leftNum = nums[leftNumIndex];
        const rightNumIndex = toExplodeIndex + 1;
        const rightNum = nums[rightNumIndex];
        const toDeleteIndex = [];

        if (leftNumIndex !== 0) {
          const leftNumIndexBefore = leftNumIndex - 1;
          const leftNumBefore = nums[leftNumIndexBefore];
          nums[leftNumIndexBefore] = {
            ...leftNumBefore,
            value: leftNumBefore.value + leftNum.value,
          };
          toDeleteIndex.push(leftNumIndex);
        }
        if (rightNumIndex !== nums.length - 1) {
          const rightNumIndexAfter = rightNumIndex + 1;
          const rightNumAfter = nums[rightNumIndexAfter];
          nums[rightNumIndexAfter] = {
            ...rightNumAfter,
            value: rightNumAfter.value + rightNum.value,
          };
          toDeleteIndex.push(rightNumIndex);
        }
        nums.splice(leftNumIndex, 2, {
          ...leftNum,
          value: 0,
          nested: leftNum.nested - 1,
        });
        continue;
      }
      const toSplitIndex = nums.findIndex(shouldSplit);
      const toSplit = nums[toSplitIndex];
      nums[toSplitIndex] = {
        value: Math.floor(toSplit.value / 2),
        nested: toSplit.nested + 1,
      };
      nums.splice(toSplitIndex + 1, 0, {
        value: Math.ceil(toSplit.value / 2),
        nested: toSplit.nested + 1,
      });
    }
    return nums;
  };

  const calcMagnitude = (currNums: Num[]) => {
    const nums = [...currNums];
    while (nums.length > 1) {
      const index = nums.findIndex(
        (num, i) => num.nested === nums[i + 1].nested
      );
      nums.splice(index, 2, {
        value: nums[index].value * 3 + nums[index + 1].value * 2,
        nested: nums[index].nested - 1,
      });
    }
    return nums[0].value;
  };

  const part1 = (lines: string[][]) => {
    let result = lineToNums(lines[0]);
    for (let i = 1; i < lines.length; i++) {
      const nums = lineToNums(lines[i]);
      const newNums = addNums(result, nums);
      result = reduceNums(newNums);
    }
    return calcMagnitude(result);
  };

  const part2 = (lines: string[][]) => {
    let max = 0;
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines.length; j++) {
        if (i === j) continue;
        const nums1 = lineToNums(lines[i]);
        const nums2 = lineToNums(lines[j]);
        const newNums = addNums(nums1, nums2);
        const reduced = reduceNums(newNums);
        const magnitude = calcMagnitude(reduced);
        if (magnitude > max) {
          max = magnitude;
        }
      }
    }
    return max;
  };

  const main = () => {
    const lines = stringLinesToStrings(input, "");

    setAnswer1(part1(lines).toString());
    setAnswer2(part2(lines).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default DayX;
