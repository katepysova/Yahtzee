import { useState } from "react";
import ScoreTable from "@/components/ScoreTable/ScoreTable";
import Dices from "@/components/Dices/Dices";

import "@/styles/main.scss";

import rules from "rules";
import ScoreRow from "./components/ScoreRow/ScoreRow";

const generateRandomNumber = (): number => {
  return Math.floor(Math.random() * 6) + 1;
};

const generateDices = (): number[] => {
  const dices = [];
  for (let i = 0; i < 5; i++) {
    const randomNumber = generateRandomNumber();
    dices.push(randomNumber);
  }
  return dices;
};

function App() {
  const [dices, setDices] = useState(generateDices());
  const [locked, setLocked] = useState(Array(5).fill(false));
  const [score, setScore] = useState({
    ones: undefined,
    twos: undefined,
    threes: undefined,
    fours: undefined,
    fives: undefined,
    sixes: undefined,
    threeOfKind: undefined,
    fourOfKind: undefined,
    fullHouse: undefined,
    smallStraight: undefined,
    largeStraight: undefined,
    yahtzee: undefined,
    chance: undefined,
  });

  const handleClick = () => {
    setDices((previousState: number[]) => {
      const currentState = locked.map((item, index) =>
        item ? previousState[index] : generateRandomNumber()
      );
      return currentState;
    });
  };

  const handleDieClick = (index: number) => {
    setLocked((currentState: boolean[]): boolean[] => {
      const newState = [...currentState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleScoreRowClick = (name: string, func: () => number) => {
    return () => {
      setScore((previousState) => {
        return { ...previousState, [name]: func() };
      });
    };
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        New dices
      </button>
      <Dices dices={dices} locked={locked} onDieClick={handleDieClick} />
      <ScoreTable>
        <ScoreRow
          score={score.ones}
          name="Ones"
          generateSuggestedValue={rules.totalAmount(1, dices)}
          handleClick={handleScoreRowClick("ones", rules.totalAmount(1, dices))}
        />
        <ScoreRow
          score={score.twos}
          name="Twos"
          generateSuggestedValue={rules.totalAmount(2, dices)}
          handleClick={handleScoreRowClick("twos", rules.totalAmount(2, dices))}
        />
        <ScoreRow
          score={score.threes}
          name="Threes"
          generateSuggestedValue={rules.totalAmount(3, dices)}
          handleClick={handleScoreRowClick("threes", rules.totalAmount(3, dices))}
        />
        <ScoreRow
          score={score.fours}
          name="Fours"
          generateSuggestedValue={rules.totalAmount(4, dices)}
          handleClick={handleScoreRowClick("fours", rules.totalAmount(4, dices))}
        />
        <ScoreRow
          score={score.fives}
          name="Fives"
          generateSuggestedValue={rules.totalAmount(5, dices)}
          handleClick={handleScoreRowClick("fives", rules.totalAmount(5, dices))}
        />
        <ScoreRow
          score={score.sixes}
          name="Sixes"
          generateSuggestedValue={rules.totalAmount(6, dices)}
          handleClick={handleScoreRowClick("sixes", rules.totalAmount(6, dices))}
        />
        <ScoreRow
          score={score.threeOfKind}
          name="Three of kind"
          generateSuggestedValue={rules.threeOfKind(dices)}
          handleClick={handleScoreRowClick("threeOfKind", rules.threeOfKind(dices))}
        />
        <ScoreRow
          score={score.fourOfKind}
          name="Four of kind"
          generateSuggestedValue={rules.fourOfKind(dices)}
          handleClick={handleScoreRowClick("fourOfKind", rules.fourOfKind(dices))}
        />
        <ScoreRow
          score={score.fullHouse}
          name="Full House"
          generateSuggestedValue={rules.fullHouse(dices)}
          handleClick={handleScoreRowClick("fullHouse", rules.fullHouse(dices))}
        />
        <ScoreRow
          score={score.smallStraight}
          name="Small Straight"
          generateSuggestedValue={rules.smallStraight(dices)}
          handleClick={handleScoreRowClick("smallStraight", rules.smallStraight(dices))}
        />
        <ScoreRow
          score={score.largeStraight}
          name="Large Straight"
          generateSuggestedValue={rules.largeStraight(dices)}
          handleClick={handleScoreRowClick("largeStraight", rules.largeStraight(dices))}
        />
        <ScoreRow
          score={score.chance}
          name="Chance"
          generateSuggestedValue={rules.chance(dices)}
          handleClick={handleScoreRowClick("chance", rules.chance(dices))}
        />
        <ScoreRow
          score={score.yahtzee}
          name="Yahtzee"
          generateSuggestedValue={rules.yahtzee(dices)}
          handleClick={handleScoreRowClick("yahtzee", rules.yahtzee(dices))}
        />
      </ScoreTable>
    </div>
  );
}

export default App;
