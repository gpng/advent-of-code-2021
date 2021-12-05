import React, { FC, useEffect, useState } from "react";
import Display from "../components/Display";
import data from "../data/day5";

const Day5: FC = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const scanStringToStrings = (str: string) => str.split("\n");

  const generateBoard = (instrs: number[][][]) => {
    let rows = 0;
    let cols = 0;
    instrs.forEach(([start, end]) => {
      if (start[0] > cols) {
        cols = start[0];
      }
      if (end[0] > cols) {
        cols = end[0];
      }
      if (start[1] > rows) {
        rows = start[1];
      }
      if (end[1] > rows) {
        rows = end[1];
      }
    });
    return new Array(rows + 1).fill(0).map(() => new Array(cols + 1).fill(0));
  };

  // coordinates between start and end
  const getCoordinates = (start: number[], end: number[]) => {
    const coords = [];
    let i = start[1] === end[1] ? 0 : 1;
    const oppI = i === 0 ? 1 : 0;
    for (
      let j = Math.min(start[i], end[i]);
      j <= Math.max(start[i], end[i]);
      j++
    ) {
      const newCoord = new Array(2).fill(0);
      newCoord[i] = j;
      newCoord[oppI] = start[oppI];
      coords.push(newCoord);
    }
    return coords;
  };

  const getCoordinatesDiagonal = (start: number[], end: number[]) => {
    let incr0 = start[0] < end[0] ? 1 : -1;
    let incr1 = start[1] < end[1] ? 1 : -1;
    const coords = [];
    let i = start[0];
    let j = start[1];
    while (i !== end[0] || j !== end[1]) {
      coords.push([i, j]);
      i += incr0;
      j += incr1;
    }
    coords.push(end);
    return coords;
  };

  const updateBoard = (board: number[][], start: number[], end: number[]) => {
    const newBoard = [...board.map((row) => [...row])];
    const coords = getCoordinates(start, end);
    coords.forEach((coord) => {
      newBoard[coord[0]][coord[1]] += 1;
    });
    return newBoard;
  };

  const updateBoardWithDiagonal = (
    board: number[][],
    start: number[],
    end: number[]
  ) => {
    const newBoard = [...board.map((row) => [...row])];
    const coords =
      start[0] !== end[0] && start[1] !== end[1]
        ? getCoordinatesDiagonal(start, end)
        : getCoordinates(start, end);
    coords.forEach((coord) => {
      newBoard[coord[0]][coord[1]] += 1;
    });
    return newBoard;
  };

  const part1 = (instrs: number[][][]) => {
    let board = generateBoard(instrs);
    for (let i = 0; i < instrs.length; i++) {
      const [start, end] = instrs[i];
      if (start[0] !== end[0] && start[1] !== end[1]) {
        continue;
      }
      board = updateBoard(board, start, end);
    }

    let count = 0;
    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell > 1) {
          count++;
        }
      });
    });
    return count;
  };

  const part2 = (instrs: number[][][]) => {
    let board = generateBoard(instrs);
    for (let i = 0; i < instrs.length; i++) {
      const [start, end] = instrs[i];
      board = updateBoardWithDiagonal(board, start, end);
    }

    let count = 0;
    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell > 1) {
          count++;
        }
      });
    });
    return count;
  };

  const main = () => {
    const lines = scanStringToStrings(data);
    const instrs = lines.map((line) =>
      line.split(" -> ").map((x) => x.split(",").map((x) => parseInt(x, 10)))
    );
    setAnswer1(part1(instrs).toString());
    setAnswer2(part2(instrs).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default Day5;
