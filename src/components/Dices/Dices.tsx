import Die from "@/components/Die/Die";
import uuid from "react-uuid";
import "./Dices.scss";

interface DicesProps {
  dices: number[];
  locked: boolean[];
  disabled: boolean;
  isRolling: boolean;
  onDieClick: (index: number) => void;
}

function Dices({ dices, locked, disabled, isRolling, onDieClick }: DicesProps): JSX.Element {
  return (
    <div className="dices">
      {dices.map((value, index) => (
        <Die
          key={uuid()}
          value={value}
          handleClick={() => onDieClick(index)}
          locked={locked[index]}
          isRolling={isRolling}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export default Dices;
