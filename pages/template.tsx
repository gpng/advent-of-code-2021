import React, { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day1";
import { stringLinesToNumber } from "../utils";

const DayX = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const main = () => {
    const numbers = stringLinesToNumber(input);
    console.log("numbers: ", numbers);
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default DayX;
