import React, { useEffect, useState } from "react";
import Display from "../components/Display";

const DayX = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const part1 = () => {
    const targetMinY = -10;
    const targetMaxY = -5;
    let y = 0;
    let vy = 100;

    const ys = [0];
    while (y >= targetMinY) {
      y += vy;
      ys.push(y);
      vy -= 1;
      console.log("y: ", y);
    }
    console.log("max", Math.max(...ys));
    if (ys.some((y) => y >= targetMinY && y <= targetMaxY)) {
      console.log("passed");
    } else {
    }
  };

  const main = () => {
    // const targetMinX = 20;
    // const targetMaxX = 30;
    // const targetMinY = -10;
    // const targetMaxY = -5;

    const targetMinX = 257;
    const targetMaxX = 286;
    const targetMinY = -101;
    const targetMaxY = -57;

    // let maxY = 0;
    // for (let x = 1; x <= targetMaxX; x++) {
    //   for (let y = 1; y <= targetMaxY; y++) {
    //     console.log(x, y);
    //   }
    // }

    // console.log("i: ", i);
    const possibleVYs: number[] = [];
    for (let vyi = targetMinY; vyi <= 101; vyi++) {
      let y = 0;
      let vy = vyi;
      const ys = [0];
      while (y >= targetMinY) {
        y += vy;
        ys.push(y);
        vy -= 1;
      }
      if (ys.some((y) => y >= targetMinY && y <= targetMaxY)) {
        possibleVYs.push(vyi);
      }
    }
    console.log("possibleVYs: ", possibleVYs);

    const possibleVXYs: [number, number][] = [];
    possibleVYs.forEach((vyi) => {
      for (let vxi = 1; vxi <= targetMaxX; vxi++) {
        let vx = vxi;
        let vy = vyi;
        let x = 0;
        let y = 0;
        const xys: [number, number][] = [[0, 0]];
        while (x <= targetMaxX && y >= targetMinY) {
          x += vx;
          y += vy;
          xys.push([x, y]);
          vy -= 1;
          if (vx > 0) {
            vx -= 1;
          } else if (x < 0) {
            vx += 1;
          }
        }
        if (
          xys.some(
            (xy) =>
              xy[0] >= targetMinX &&
              xy[0] <= targetMaxX &&
              xy[1] >= targetMinY &&
              xy[1] <= targetMaxY
          )
        ) {
          possibleVXYs.push([vxi, vyi]);
        }
      }
    });
    console.log("possibleVXYs: ", possibleVXYs);
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default DayX;
