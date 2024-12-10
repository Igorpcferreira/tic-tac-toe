import { Square } from './Square';

interface BoardProps {
  squares: string[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
}

export function Board({ squares, onClick, winningLine }: BoardProps) {
  const renderSquare = (i: number) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={winningLine?.includes(i)}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-1">
      {Array(9).fill(null).map((_, i) => (
        <div key={i}>
          {renderSquare(i)}
        </div>
      ))}
    </div>
  );
}