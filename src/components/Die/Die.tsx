/* eslint-disable react/no-array-index-key */
import "./Die.scss";

interface DieProps {
  value: number;
}

const generateDots = (value: number) => {
  const dots = [];
  for (let i = 0; i < value; i++) {
    dots.push(<li className="dot" key={i} />);
  }
  return dots;
};

function Die({ value }: DieProps): JSX.Element {
  return (
    <ul
      className={`die die--${value}`}
      role="button"
      tabIndex={0}
      onClick={() => null}
      onKeyDown={() => null}
      aria-label="click"
    >
      {generateDots(value)}
    </ul>
  );
}

export default Die;
