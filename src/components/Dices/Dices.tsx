/* eslint-disable react/no-array-index-key */
import Die from "@/components/Die/Die";
import uuid from "react-uuid";
import "./Dices.scss";

interface DicesProps {
  dices: number[];
  locked: boolean[];
  disabled: boolean;
  onDieClick: (index: number) => void;
}

function Dices({ dices, locked, disabled, onDieClick }: DicesProps): JSX.Element {
  return (
    <div className="dices">
      {dices.map((value, index) => (
        <Die
          key={uuid()}
          value={value}
          handleClick={() => onDieClick(index)}
          locked={locked[index]}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export default Dices;
