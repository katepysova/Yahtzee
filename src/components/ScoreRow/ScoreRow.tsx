/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

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
  const value = score || generateSuggestedValue();

  return (
    <li onClick={handleClick}>
      {name}: {value}
    </li>
  );
}

export default ScoreRow;
