import Link from "next/link";
import range from "lodash/range";

const Day1 = () => {
  return (
    <div className="root">
      {range(1, 25).map((i) => (
        <Link key={i} href={`/day${i}`} passHref>
          <a>Day {i}</a>
        </Link>
      ))}
      <style jsx>{`
        a {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default Day1;
