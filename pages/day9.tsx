import React, { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day9";
import { stringLinesToNumbers } from "../utils";

const Day9 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const adjacentCells = (x: number, y: number, maxX: number, maxY: number) => {
    const cells = [];
    cells.push([x, y + 1]);
    cells.push([x, y - 1]);
    cells.push([x + 1, y]);
    cells.push([x - 1, y]);
    return cells.filter(([x, y]) => x >= 0 && y >= 0 && x < maxX && y < maxY);
  };

  const getLowPoints = (grid: number[][]) => {
    let lowPointsSum = 0;
    const lowPoints = [];
    const maxY = grid[0].length;
    const maxX = grid.length;
    for (let x = 0; x < maxX; x++) {
      for (let y = 0; y < maxY; y++) {
        const val = grid[x][y];
        const adjacent = adjacentCells(x, y, maxX, maxY).map(
          ([x, y]) => grid[x][y]
        );
        if (adjacent.every((v) => v > val)) {
          lowPoints.push([x, y]);
          lowPointsSum += val + 1;
        }
      }
    }
    return { lowPointsSum, lowPoints };
  };

  const basinSize = (numbers: number[][], x: number, y: number) => {
    const visited = new Array(numbers.length)
      .fill(false)
      .map(() => new Array(numbers[0].length).fill(false));
    const queue: number[][] = [[x, y]];
    let size = 1;
    while (queue.length > 0) {
      const [x, y] = queue.shift() as number[];
      visited[x][y] = true;
      const val = numbers[x][y];
      adjacentCells(x, y, numbers.length, numbers[0].length).forEach(
        ([newX, newY]) => {
          if (
            numbers[newX][newY] !== 9 &&
            numbers[newX][newY] > val &&
            !visited[newX][newY]
          ) {
            size += 1;
            visited[newX][newY] = true;
            queue.push([newX, newY]);
          }
        }
      );
    }
    return size;
  };

  const main = () => {
    const numbers = stringLinesToNumbers(input, "");

    const { lowPoints, lowPointsSum } = getLowPoints(numbers);
    setAnswer1(lowPointsSum.toString());

    const sizes: number[] = [];
    for (const [x, y] of lowPoints) {
      const size = basinSize(numbers, x, y);
      sizes.push(size);
    }
    sizes.sort((a, b) => b - a);

    const total = sizes.slice(0, 3).reduce((acc, val) => acc * val, 1);
    setAnswer2(total.toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default Day9;
