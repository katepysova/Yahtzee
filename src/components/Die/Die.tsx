import uuid from "react-uuid";
import cn from "classnames";
import "./Die.scss";

interface DieProps {
  value: number;
  locked: boolean;
  disabled: boolean;
  isRolling: boolean;
  handleClick: () => void;
}

const generateDots = (value: number) => {
  const dots = [];
  for (let i = 0; i < value; i++) {
    dots.push(<li className="dot" key={uuid()} />);
  }
  return <ul className={`dots dots--${value}`}>{dots}</ul>;
};

function Die({ value, handleClick, isRolling, locked, disabled }: DieProps): JSX.Element {
  const rolling = !locked && isRolling;

  return (
    <button
      className={cn("die", { "die--locked": locked, "die--rolling": rolling })}
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      {generateDots(value)}
    </button>
  );
}

export default Die;
