import ScoreRow from "@/components/ScoreRow/ScoreRow";
import { Scores } from "@/components/shared/interfaces/scores.interface";
import calculateScore, { RuleNames } from "@/components/Game/rules";
import "./ScoreTable.scss";

interface ScoreTableProps {
  score: Scores;
  dices: number[];
  disabled: boolean;
  onScoreRowClick: (name: string, func: () => number) => () => void;
}

interface Rule {
  key: string;
  name: string;
}

const rowsData: Rule[] = [];

Object.values(RuleNames).forEach((ruleName) => {
  const ruleObject: Rule = {
    key: "",
    name: "",
  };
  ruleObject.key = ruleName;
  ruleObject.name = ruleName.split("_").join(" ");
  rowsData.push(ruleObject);
});

function ScoreTable({ score, dices, disabled, onScoreRowClick }: ScoreTableProps): JSX.Element {
  return (
    <div className="table">
      {rowsData.map((row) => (
        <ScoreRow
          disabled={disabled}
          key={row.key}
          score={score[row.key as keyof Scores]}
          name={row.name}
          generateSuggestedValue={calculateScore(row.key, dices)}
          handleClick={onScoreRowClick(row.key, calculateScore(row.key as keyof Scores, dices))}
        />
      ))}
    </div>
  );
}

export default ScoreTable;
