/* eslint-disable react/no-array-index-key */
import Die from "@/components/Die/Die";
import uuid from "react-uuid";
import "./Dices.scss";

interface DicesProps {
  dices: number[];
}

function Dices({ dices }: DicesProps): JSX.Element {
  return (
    <ul className="dices">
      {dices.map((value) => (
        <Die key={uuid()} value={value} />
      ))}
    </ul>
  );
}

export default Dices;
