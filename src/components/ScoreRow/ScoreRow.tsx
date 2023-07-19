import cn from "classnames";
import "./ScoreRow.scss";

interface ScoreRowProps {
  score?: number;
  name: string;
  disabled: boolean;
  generateSuggestedValue: () => number;
  handleClick: () => void;
}

function ScoreRow({
  score,
  name,
  disabled,
  generateSuggestedValue,
  handleClick,
}: ScoreRowProps): JSX.Element {
  const value = score || score === 0 ? score : generateSuggestedValue();
  const isDisabled = score !== undefined || disabled;
  const predictedZero = score === undefined && value === 0;

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={() => null}
      className={cn("row", { "row--disabled": isDisabled })}
      onClick={isDisabled ? () => null : handleClick}
    >
      <div className="row__name">{name}</div>
      <div className={cn("row__value", { "row__value--zero": predictedZero })}>{value}</div>
    </div>
  );
}

export default ScoreRow;
