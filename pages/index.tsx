import range from "lodash/range";
import Link from "next/link";

const Day1 = () => {
  return (
    <div className="root">
      <div className="content">
        {range(1, 25).map((i) => (
          <Link key={i} href={`/day${i}`} passHref>
            <a>Day {i}</a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .root {
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

        a {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default Day1;
