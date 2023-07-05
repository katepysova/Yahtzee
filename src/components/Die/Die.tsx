import uuid from "react-uuid";
import cn from "classnames";
import "./Die.scss";

interface DieProps {
  value: number;
  locked: boolean;
  disabled: boolean;
  handleClick: () => void;
}

const generateDots = (value: number) => {
  const dots = [];
  for (let i = 0; i < value; i++) {
    dots.push(<li className="dot" key={uuid()} />);
  }
  return <ul className={`dots dots--${value}`}>{dots}</ul>;
};

function Die({ value, handleClick, locked, disabled }: DieProps): JSX.Element {
  return (
    <button
      className={cn("die", { "die--locked": locked })}
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      {generateDots(value)}
    </button>
  );
}

export default Die;
