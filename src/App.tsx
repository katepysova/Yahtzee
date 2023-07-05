/* eslint-disable react/no-array-index-key */
import { useState } from "react";
import Dices from "@/components/Dices/Dices";
import "@/styles/main.scss";

import rules from "rules";

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
  const handleClick = () => {
    setDices(generateDices());
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        New dices
      </button>
      <Dices dices={dices} />
      <ul>
        <li>totalAmount 1: {rules.totalAmount(1, dices)}</li>
        <li>totalAmount 2: {rules.totalAmount(2, dices)}</li>
        <li>totalAmount 3: {rules.totalAmount(3, dices)}</li>
        <li>totalAmount 4: {rules.totalAmount(4, dices)}</li>
        <li>totalAmount 5: {rules.totalAmount(5, dices)}</li>
        <li>totalAmount 6: {rules.totalAmount(6, dices)}</li>
        <li>threeOfKind: {rules.threeOfKind(dices)}</li>
        <li>fourOfKind: {rules.fourOfKind(dices)}</li>
        <li>fullHouse: {rules.fullHouse(dices)}</li>
        <li>smallStraight: {rules.smallStraight(dices)}</li>
        <li>largeStraight: {rules.largeStraight(dices)}</li>
        <li>Chance: {rules.chance(dices)}</li>
        <li>yahtzee: {rules.yahtzee(dices)}</li>
      </ul>
    </div>
  );
}

export default App;
