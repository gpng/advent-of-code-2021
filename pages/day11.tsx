import React, { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day11";
import { stringLinesToNumbers } from "../utils";

const DayX = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const adjacentCells = (x: number, y: number, maxX: number, maxY: number) => {
    const cells = [];
    cells.push([x, y + 1]);
    cells.push([x, y - 1]);
    cells.push([x + 1, y]);
    cells.push([x - 1, y]);
    cells.push([x + 1, y + 1]);
    cells.push([x - 1, y - 1]);
    cells.push([x + 1, y - 1]);
    cells.push([x - 1, y + 1]);
    return cells.filter(([x, y]) => x >= 0 && y >= 0 && x < maxX && y < maxY);
  };

  const anyCellMoreThan9 = (grid: number[][]) => {
    return grid.some((row) => row.some((cell) => cell > 9));
  };

  const countZeroes = (grid: number[][]) => {
    return grid.reduce((acc, row) => {
      return (
        acc +
        row.reduce((acc, cell) => {
          return acc + (cell === 0 ? 1 : 0);
        }, 0)
      );
    }, 0);
  };

  const allZeroes = (grid: number[][]) => {
    return grid.every((row) => row.every((cell) => cell === 0));
  };

  const step = (currGrid: number[][]) => {
    const grid = [...currGrid.map((row) => [...row.map((cell) => cell + 1)])];

    const maxY = grid[0].length;
    const maxX = grid.length;
    let count = 0;
    while (anyCellMoreThan9(grid)) {
      for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
          if (grid[x][y] > 0) {
            const val = grid[x][y];
            if (val > 9) {
              grid[x][y] = 0;
              const adjacent = adjacentCells(x, y, maxX, maxY);
              adjacent.forEach(([xx, yy]) => {
                if (grid[xx][yy] > 0) {
                  grid[xx][yy] += 1;
                }
              });
            }
          }
        }
      }
    }
    return grid;
  };

  const part1 = (grid: number[][]) => {
    const steps = 100;
    let flashes = 0;
    let newGrid = [...grid.map((row) => [...row])];
    for (let i = 0; i < steps; i++) {
      newGrid = step(newGrid);
      flashes += countZeroes(newGrid);
    }
    return flashes;
  };

  const part2 = (grid: number[][]) => {
    let newGrid = [...grid.map((row) => [...row])];
    let steps = 0;
    while (!allZeroes(newGrid)) {
      steps += 1;
      newGrid = step(newGrid);
    }
    return steps;
  };

  const main = () => {
    const grid = stringLinesToNumbers(input, "");

    setAnswer1(part1(grid).toString());
    setAnswer2(part2(grid).toString());
  };
  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default DayX;
