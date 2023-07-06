/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import cn from "classnames";
import "./ScoreRow.scss";

interface ScoreRowProps {
  score?: number;
  name: string;
  generateSuggestedValue: () => number;
  handleClick: () => void;
}

function ScoreRow({
  score,
  name,
  generateSuggestedValue,
  handleClick,
}: ScoreRowProps): JSX.Element {
  const value = score || score === 0 ? score : generateSuggestedValue();
  const disabled = score !== undefined;

  return (
    <div
      className={cn("row", { "row--disabled": disabled })}
      onClick={disabled ? () => null : handleClick}
    >
      <div>{name}</div>
      <div>{value}</div>
    </div>
  );
}

export default ScoreRow;
