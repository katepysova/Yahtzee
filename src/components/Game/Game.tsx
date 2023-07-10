import { useState } from "react";
import ScoreTable from "@/components/ScoreTable/ScoreTable";
import Dices from "@/components/Dices/Dices";
import { Scores } from "@/components/shared/interfaces/scores.interface";
import { RuleNames, generateRandomNumber, generateDices } from "@/components/Game/rules";
import Button from "../shared/Button/Button";

import "./Game.scss";

const NUMBER_OF_ATTEMPTS = 2;
const NUMBER_OF_DICES = 5;
const MAX_SIDE_VALUE = 6;
const ROLLING_SPEED = 500;

const initialScore: { [key: string]: number | undefined } = {};

Object.values(RuleNames).forEach((ruleName) => {
  initialScore[ruleName] = undefined;
});

function Game(): JSX.Element {
  const [dices, setDices] = useState<number[]>(generateDices(NUMBER_OF_DICES, MAX_SIDE_VALUE));
  const [locked, setLocked] = useState<boolean[]>(Array(NUMBER_OF_DICES).fill(false));
  const [rollsLeft, setRollsLeft] = useState<number>(NUMBER_OF_ATTEMPTS);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [score, setScore] = useState<Scores>(initialScore as unknown as Scores);

  const animateRoll = (func: () => void) => {
    setIsRolling(true);
    setTimeout(() => {
      setIsRolling(false);
      func();
    }, ROLLING_SPEED);
  };

  const handleClick = () => {
    setRollsLeft((previousState) => previousState - 1);
    animateRoll(() => {
      setDices((previousState: number[]) => {
        const currentState = locked.map((item, index) =>
          item ? previousState[index] : generateRandomNumber(MAX_SIDE_VALUE)
        );
        return currentState;
      });
    });
  };

  const handleDieClick = (index: number) => {
    setLocked((currentState: boolean[]): boolean[] => {
      const newState = [...currentState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const reset = () => {
    setLocked(Array(NUMBER_OF_DICES).fill(false));
    setRollsLeft(NUMBER_OF_ATTEMPTS);
    setScore(initialScore as unknown as Scores);
    animateRoll(() => {
      setDices(generateDices(NUMBER_OF_DICES, MAX_SIDE_VALUE));
    });
  };

  const handleScoreRowClick = (name: string, func: () => number) => {
    return () => {
      setScore((previousState) => {
        return { ...previousState, [name]: func() };
      });
      setLocked(Array(NUMBER_OF_DICES).fill(false));
      setRollsLeft(NUMBER_OF_ATTEMPTS);
      animateRoll(() => {
        setDices(generateDices(NUMBER_OF_DICES, MAX_SIDE_VALUE));
      });
    };
  };

  const gameOver = Object.values(score).every((item) => item || item === 0);
  const totalScore = Object.values(score)
    .filter((s) => s !== undefined)
    .reduce((acc: number, value: number) => acc + value, 0);

  return (
    <section className="game">
      <div className="game__container container">
        <div className="game__content">
          <h1 className="heading-primary u-center u-margin-bottom-small">Yahtzee</h1>
          {gameOver ? (
            <h2 className="heading-secondary u-center">Game Over</h2>
          ) : (
            <>
              <div className="game__line">
                <h2 className="heading-secondary">Rolls Left: {rollsLeft}</h2>
                <Button
                  variant="secondary"
                  type="button"
                  handleClick={handleClick}
                  disabled={locked.every((x) => x) || rollsLeft === 0}
                >
                  New dices
                </Button>
              </div>
              <div className="game__board">
                <Dices
                  dices={dices}
                  locked={locked}
                  isRolling={isRolling}
                  onDieClick={handleDieClick}
                  disabled={rollsLeft === 0}
                />
                <ScoreTable score={score} dices={dices} onScoreRowClick={handleScoreRowClick} />
              </div>
            </>
          )}

          <div className="game__line">
            <h2 className="heading-secondary">Total Score: {totalScore}</h2>
            <Button variant="primary" type="button" handleClick={reset}>
              New game
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Game;
