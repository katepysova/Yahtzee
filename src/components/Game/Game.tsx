import { useState } from "react";

import ScoreTable from "@/components/ScoreTable/ScoreTable";
import Dices from "@/components/Dices/Dices";
import { Scores } from "@/components/shared/interfaces/scores.interface";
import { RuleNames, generateRandomNumber, generateDices } from "@/components/Game/rules";
import "./Game.scss";

const NUMBER_OF_ATTEMPTS = 2;
const NUMBER_OF_DICES = 5;
const MAX_SIDE_VALUE = 6;

const initialScore: { [key: string]: number | undefined } = {};

Object.values(RuleNames).forEach((ruleName) => {
  initialScore[ruleName] = undefined;
});

function Game(): JSX.Element {
  const [dices, setDices] = useState<number[]>(generateDices(NUMBER_OF_DICES, MAX_SIDE_VALUE));
  const [locked, setLocked] = useState<boolean[]>(Array(NUMBER_OF_DICES).fill(false));
  const [rollsLeft, setRollsLeft] = useState<number>(NUMBER_OF_ATTEMPTS);
  const [score, setScore] = useState<Scores>(initialScore as unknown as Scores);

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
    setScore(initialScore as unknown as Scores);
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

  const gameOver = Object.values(score).every((item) => item || item === 0);
  const totalScore = Object.values(score)
    .filter((s) => s !== undefined)
    .reduce((acc: number, value: number) => acc + value, 0);

  return (
    <section className="game">
      <h1 className="heading-primary">Yahtzee</h1>
      {gameOver ? (
        <h1>Game Over</h1>
      ) : (
        <>
          <h2>Rolls Left: {rollsLeft}</h2>
          <Dices
            dices={dices}
            locked={locked}
            onDieClick={handleDieClick}
            disabled={rollsLeft === 0}
          />
          <button
            type="button"
            onClick={handleClick}
            disabled={locked.every((x) => x) || rollsLeft === 0}
          >
            New dices
          </button>
        </>
      )}

      <ScoreTable score={score} dices={dices} onScoreRowClick={handleScoreRowClick} />

      <h3>Total Score: {totalScore}</h3>
      <button type="button" onClick={reset}>
        New game
      </button>
    </section>
  );
}

export default Game;
