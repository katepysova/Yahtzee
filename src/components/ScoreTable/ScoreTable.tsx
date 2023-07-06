interface ScoreTableProps {
  children: React.ReactNode;
}

function ScoreTable({ children }: ScoreTableProps): JSX.Element {
  return <ul>{children}</ul>;
}

export default ScoreTable;
