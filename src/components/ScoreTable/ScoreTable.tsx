import "./ScoreTable.scss";

interface ScoreTableProps {
  children: React.ReactNode;
}

function ScoreTable({ children }: ScoreTableProps): JSX.Element {
  return <div className="table">{children}</div>;
}

export default ScoreTable;
