import React, { FC, useEffect, useState } from "react";
import Display from "../components/Display";
import data from "../data/day4";
import { stringLinesToStrings } from "../utils";

const Day4: FC = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const getBoards = (lines: string[]) => {
    const boards: number[][][] = [];
    let board: number[][] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === "") {
        boards.push(board);
        board = [];
        continue;
      }
      board.push(
        line
          .split(" ")
          .filter((x) => x !== "")
          .map((n) => parseInt(n, 10))
      );
    }
    boards.push(board);
    return boards;
  };

  // board wins if it has 1 row of -1's or 1 column of -1's
  const boardWon = (board: number[][]) => {
    if (!board.length) return false;
    const row = board.some((row) => row.every((n) => n === -1));
    if (row) return true;
    for (let i = 0; i < board[0].length; i++) {
      const col = board.every((row) => row[i] === -1);
      if (col) return true;
    }
    return false;
  };

  // replaces the element with the same value with -1
  const playBoard = (board: number[][], num: number) => {
    const newBoard = board.map((row) => row.map((n) => (n === num ? -1 : n)));
    return newBoard;
  };

  // returns sum of all positive numbers
  const boardScore = (board: number[][]): number => {
    return board.reduce((acc, row) => {
      return acc + row.reduce((acc, n) => (n > 0 ? acc + n : acc), 0);
    }, 0);
  };

  const play = (originBoards: number[][][], instrs: number[]) => {
    const boards = [...originBoards];
    for (let i = 0; i < instrs.length; i++) {
      const inst = instrs[i];

      for (let j = 0; j < boards.length; j++) {
        const board = boards[j];
        const newBoard = playBoard(board, inst);
        boards[j] = newBoard;
        if (boardWon(newBoard)) {
          return boardScore(newBoard) * inst;
        }
      }
    }
    return 0;
  };

  const play2 = (originBoards: number[][][], instrs: number[]) => {
    const boards = [...originBoards];
    let lastWinner: number[][] = [];
    let lastWinnerInst = -1;
    for (let i = 0; i < instrs.length; i++) {
      const inst = instrs[i];

      for (let j = 0; j < boards.length; j++) {
        const board = boards[j];
        const newBoard = playBoard(board, inst);
        boards[j] = newBoard;
        if (boardWon(newBoard)) {
          lastWinner = [...newBoard];
          lastWinnerInst = inst;
          boards[j] = [];
        }
      }
    }
    return boardScore(lastWinner) * lastWinnerInst;
  };

  const main = () => {
    const lines = stringLinesToStrings(data).map((x) => x[0]);
    const instrs = lines[0].split(",").map((n) => parseInt(n, 10));
    const boards = getBoards(lines.splice(2));

    setAnswer1(play(boards, instrs).toString());
    setAnswer2(play2(boards, instrs).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default Day4;
