import ScoreRow from "@/components/ScoreRow/ScoreRow";
import rules from "@/rules";
import "./ScoreTable.scss";

interface ScoreState {
  ones: number | undefined;
  twos: number | undefined;
  threes: number | undefined;
  fours: number | undefined;
  fives: number | undefined;
  sixes: number | undefined;
  threeOfKind: number | undefined;
  fourOfKind: number | undefined;
  fullHouse: number | undefined;
  smallStraight: number | undefined;
  largeStraight: number | undefined;
  yahtzee: number | undefined;
  chance: number | undefined;
}

interface ScoreTableProps {
  score: ScoreState;
  dices: number[];
  onScoreRowClick: (name: string, func: () => number) => () => void;
}

function ScoreTable({ score, dices, onScoreRowClick }: ScoreTableProps): JSX.Element {
  return (
    <div>
      <h2>Upper</h2>
      <div className="table">
        <ScoreRow
          score={score.ones}
          name="Ones"
          generateSuggestedValue={rules.totalAmount(1, dices)}
          handleClick={onScoreRowClick("ones", rules.totalAmount(1, dices))}
        />
        <ScoreRow
          score={score.twos}
          name="Twos"
          generateSuggestedValue={rules.totalAmount(2, dices)}
          handleClick={onScoreRowClick("twos", rules.totalAmount(2, dices))}
        />
        <ScoreRow
          score={score.threes}
          name="Threes"
          generateSuggestedValue={rules.totalAmount(3, dices)}
          handleClick={onScoreRowClick("threes", rules.totalAmount(3, dices))}
        />
        <ScoreRow
          score={score.fours}
          name="Fours"
          generateSuggestedValue={rules.totalAmount(4, dices)}
          handleClick={onScoreRowClick("fours", rules.totalAmount(4, dices))}
        />
        <ScoreRow
          score={score.fives}
          name="Fives"
          generateSuggestedValue={rules.totalAmount(5, dices)}
          handleClick={onScoreRowClick("fives", rules.totalAmount(5, dices))}
        />
        <ScoreRow
          score={score.sixes}
          name="Sixes"
          generateSuggestedValue={rules.totalAmount(6, dices)}
          handleClick={onScoreRowClick("sixes", rules.totalAmount(6, dices))}
        />
        <ScoreRow
          score={score.threeOfKind}
          name="Three of kind"
          generateSuggestedValue={rules.threeOfKind(dices)}
          handleClick={onScoreRowClick("threeOfKind", rules.threeOfKind(dices))}
        />
        <ScoreRow
          score={score.fourOfKind}
          name="Four of kind"
          generateSuggestedValue={rules.fourOfKind(dices)}
          handleClick={onScoreRowClick("fourOfKind", rules.fourOfKind(dices))}
        />
        <ScoreRow
          score={score.fullHouse}
          name="Full House"
          generateSuggestedValue={rules.fullHouse(dices)}
          handleClick={onScoreRowClick("fullHouse", rules.fullHouse(dices))}
        />
        <ScoreRow
          score={score.smallStraight}
          name="Small Straight"
          generateSuggestedValue={rules.smallStraight(dices)}
          handleClick={onScoreRowClick("smallStraight", rules.smallStraight(dices))}
        />
        <ScoreRow
          score={score.largeStraight}
          name="Large Straight"
          generateSuggestedValue={rules.largeStraight(dices)}
          handleClick={onScoreRowClick("largeStraight", rules.largeStraight(dices))}
        />
        <ScoreRow
          score={score.chance}
          name="Chance"
          generateSuggestedValue={rules.chance(dices)}
          handleClick={onScoreRowClick("chance", rules.chance(dices))}
        />
        <ScoreRow
          score={score.yahtzee}
          name="Yahtzee"
          generateSuggestedValue={rules.yahtzee(dices)}
          handleClick={onScoreRowClick("yahtzee", rules.yahtzee(dices))}
        />
      </div>
      <h2>Lower</h2>
    </div>
  );
}

export default ScoreTable;
