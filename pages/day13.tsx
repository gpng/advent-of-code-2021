import React, { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day13";
import { stringLinesToString } from "../utils";

const DayX = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const printGrid = (grid: boolean[][]) => {
    let str = "";
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        str += grid[y][x] ? "#" : ".";
      }
      str += "\n";
    }
    return str;
  };

  const formGrid = (lines: string[]) => {
    let maxX = 0;
    let maxY = 0;
    const dots: number[][] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const [x, y] = line.split(",").map((n) => parseInt(n, 10));
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      dots.push([x, y]);
    }

    const grid: boolean[][] = new Array(maxY + 1)
      .fill(null)
      .map(() => new Array(maxX + 1).fill(false));

    dots.forEach(([x, y]) => {
      grid[y][x] = true;
    });

    return grid;
  };

  const countTrue = (grid: boolean[][]) => {
    let count = 0;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x]) count++;
      }
    }
    return count;
  };

  const foldAlongY = (grid: boolean[][], fold: number) => {
    const newGrid = [...grid.map((row) => [...row])];
    let top = newGrid.slice(0, fold);
    let bottom = newGrid.slice(fold + 1);

    const newTopRows: boolean[][] = [];
    bottom.forEach((row, i) => {
      const topIndex = top.length - 1 - i;
      if (topIndex >= 0) {
        const newRow = top[topIndex].map((cell, j) => cell || row[j]);
        top[topIndex] = newRow;
      } else {
        newTopRows.unshift(row);
      }
    });
    return [...newTopRows, ...top];
  };

  const foldAlongX = (grid: boolean[][], fold: number) => {
    const newGrid = [...grid.map((row) => [...row])];
    newGrid.forEach((row, i) => {
      const left = row.slice(0, fold);
      const right = row.slice(fold + 1);

      const newCells: boolean[] = [];
      right.forEach((cell, j) => {
        const leftIndex = left.length - 1 - j;
        if (leftIndex >= 0) {
          newCells.unshift(left[leftIndex] || cell);
        } else {
          newCells.unshift(cell);
        }
      });
      newGrid[i] = newCells;
    });
    return newGrid;
  };

  const run = (currGrid: boolean[][], folds: string[]) => {
    let grid = [...currGrid.map((row) => [...row])];
    folds.forEach((fold, i) => {
      const split = fold.split(" ");
      const [along, num] = split[split.length - 1].split("=");
      if (along === "y") {
        grid = foldAlongY(grid, parseInt(num, 10));
      } else {
        grid = foldAlongX(grid, parseInt(num, 10));
      }
      if (i === 0) {
        setAnswer1(countTrue(grid).toString());
      }
    });
    return grid;
  };

  const main = () => {
    const lines = stringLinesToString(input);
    const lineBreak = lines.findIndex((line) => line === "");
    const dots = lines.slice(0, lineBreak);
    const folds = lines.slice(lineBreak + 1);

    const grid = formGrid(dots);
    const afterFolds = run(grid, folds);
    console.log(printGrid(afterFolds));
    setAnswer1(printGrid(afterFolds));
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default DayX;
