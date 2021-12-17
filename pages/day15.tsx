import React, { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day15";
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
    // cells.push([x + 1, y + 1]);
    // cells.push([x - 1, y - 1]);
    // cells.push([x + 1, y - 1]);
    // cells.push([x - 1, y + 1]);
    return cells.filter(([x, y]) => x >= 0 && y >= 0 && x < maxX && y < maxY);
  };

  interface Route {
    history: [number, number][];
    risk: number;
  }

  const run = (grid: number[][]) => {
    const maxX = grid[0].length;
    const maxY = grid.length;
    const shortestDistances: number[][] = new Array(maxY)
      .fill(null)
      .map(() => new Array(maxX).fill(Infinity));
    shortestDistances[0][0] = 0;
    const visited = new Set<string>();
    const queue: [number, number][] = [[0, 0]];

    while (queue.length > 0) {
      const q = queue.shift();
      if (!q) return 0;

      const [x, y] = q;

      if (x === maxX - 1 && y === maxY - 1) {
        return shortestDistances[y][x];
      }
      if (visited.has(`${x},${y}`)) {
        continue;
      }
      visited.add(`${x},${y}`);

      const adjacent = adjacentCells(x, y, maxX, maxY);
      for (let i = 0; i < adjacent.length; i++) {
        const [adjX, adjY] = adjacent[i];
        if (visited.has(`${adjX},${adjY}`)) {
          continue;
        }
        const newMin = shortestDistances[y][x] + grid[adjY][adjX];
        shortestDistances[adjY][adjX] = Math.min(
          shortestDistances[adjY][adjX],
          newMin
        );
        queue.push([adjX, adjY]);
      }

      // sort queue
      queue.sort(
        ([aX, aY], [bX, bY]) =>
          shortestDistances[aY][aX] - shortestDistances[bY][bX]
      );
    }
    return shortestDistances[maxY - 1][maxX - 1];
  };

  const generateFullGrid = (grid: number[][]) => {
    const lengthX = grid[0].length;
    const lengthY = grid.length;
    const maxX = grid[0].length * 5;
    const maxY = grid.length * 5;
    const fullGrid: number[][] = new Array(maxY)
      .fill(0)
      .map(() => new Array(maxX).fill(0));

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        for (let y = 0; y < lengthY; y++) {
          for (let x = 0; x < lengthX; x++) {
            let newRisk = ((grid[y][x] + i + j - 1) % 9) + 1;
            fullGrid[i * lengthY + y][j * lengthX + x] = newRisk;
          }
        }
      }
    }
    return fullGrid;
  };

  const main = () => {
    const grid = stringLinesToNumbers(input, "");

    setAnswer1(run(grid).toString());
    setAnswer2(run(generateFullGrid(grid)).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default DayX;
