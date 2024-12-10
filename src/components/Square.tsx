interface SquareProps {
  value: string;
  onClick: () => void;
  isWinning?: boolean;
}

export function Square({ value, onClick, isWinning }: SquareProps) {
  return (
    <button
      className={`w-20 h-20 border-2 border-gray-300 text-4xl font-bold 
        ${isWinning ? 'bg-green-200' : 'bg-white hover:bg-gray-100'} 
        transition-colors duration-200`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}