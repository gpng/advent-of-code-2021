import React, { FC } from "react";

interface Props {
  answer1?: string;
  answer2?: string;
}

const Display: FC<Props> = ({ answer1 = "", answer2 = "" }) => {
  return (
    <div className="root">
      <div className="content">
        <div>
          Answer1:
          <br />
          {answer1 === "" ? "Calculating..." : answer1}
        </div>
        <div>
          Answer2:
          <br />
          {answer2 === "" ? "Calculating..." : answer2}
        </div>
      </div>
      <style jsx>{`
        .root {
          height: 100%;
          width: 100vw;
          display: flex;
          justify-content: center;
        }

        .content {
          padding-top: 48px;
          width: 600px;
          margin: 0 24px;
          max-width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Display;
