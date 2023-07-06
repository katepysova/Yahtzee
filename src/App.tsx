import "@/styles/main.scss";
import { useState } from "react";
import ScoreTable from "@/components/ScoreTable/ScoreTable";
import Dices from "@/components/Dices/Dices";

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

const NUMBER_OF_ATTEMPTS = 2;
const NUMBER_OF_DICES = 5;
const MAX_SIDE_VALUE = 6;

const generateRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max) + 1;
};

const generateDices = (n: number, max: number): number[] => {
  const dices = [];
  for (let i = 0; i < n; i++) {
    const randomNumber = generateRandomNumber(max);
    dices.push(randomNumber);
  }
  return dices;
};

function App() {
  const [dices, setDices] = useState<number[]>(generateDices(NUMBER_OF_DICES, MAX_SIDE_VALUE));
  const [locked, setLocked] = useState<boolean[]>(Array(NUMBER_OF_DICES).fill(false));
  const [rollsLeft, setRollsLeft] = useState<number>(NUMBER_OF_ATTEMPTS);
  const [score, setScore] = useState<ScoreState>({
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
        item ? previousState[index] : generateRandomNumber(MAX_SIDE_VALUE)
      );
      return currentState;
    });
    setRollsLeft((previousState) => previousState - 1);
  };

  const handleDieClick = (index: number) => {
    setLocked((currentState: boolean[]): boolean[] => {
      const newState = [...currentState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const reset = () => {
    setDices(generateDices(NUMBER_OF_DICES, MAX_SIDE_VALUE));
    setLocked(Array(NUMBER_OF_DICES).fill(false));
    setRollsLeft(NUMBER_OF_ATTEMPTS);
    setScore((previousState: ScoreState): ScoreState => {
      const currentState: ScoreState = { ...previousState };
      const keys = Object.keys(currentState);
      keys.forEach((key) => {
        currentState[key as keyof ScoreState] = undefined;
      });
      return currentState;
    });
  };

  const handleScoreRowClick = (name: string, func: () => number) => {
    return () => {
      setScore((previousState) => {
        return { ...previousState, [name]: func() };
      });
      setDices(generateDices(NUMBER_OF_DICES, MAX_SIDE_VALUE));
      setLocked(Array(NUMBER_OF_DICES).fill(false));
      setRollsLeft(NUMBER_OF_ATTEMPTS);
    };
  };

  return (
    <div>
      <h2>Rolls Left: {rollsLeft}</h2>
      <Dices dices={dices} locked={locked} onDieClick={handleDieClick} disabled={rollsLeft === 0} />
      <button
        type="button"
        onClick={handleClick}
        disabled={locked.every((x) => x) || rollsLeft === 0}
      >
        New dices
      </button>
      <ScoreTable score={score} dices={dices} onScoreRowClick={handleScoreRowClick} />

      <h3>
        Total Score:{" "}
        {Object.values(score)
          .filter((s) => s !== undefined)
          .reduce((a: number, c: number) => a + c, 0)}
      </h3>
      <button type="button" onClick={reset}>
        New game
      </button>
    </div>
  );
}

export default App;
