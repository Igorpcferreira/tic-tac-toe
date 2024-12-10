import React, { useState, useEffect } from 'react';
import { Board } from './components/Board';
import { checkWinner, findBestMove } from './utils/ai';
import { Brain } from 'lucide-react';

function App() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [isPlayerNext, setIsPlayerNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  useEffect(() => {
    if (!isPlayerNext && !gameOver) {
      const timer = setTimeout(() => {
        const aiMove = findBestMove(board);
        handleMove(aiMove);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerNext, gameOver, board]);

  const handleMove = (i: number) => {
    if (board[i] || gameOver) return;

    const newBoard = [...board];
    newBoard[i] = isPlayerNext ? 'X' : 'O';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameOver(true);
      findWinningLine(newBoard);
    } else if (newBoard.every(square => square)) {
      setGameOver(true);
    } else {
      setIsPlayerNext(!isPlayerNext);
    }
  };

  const findWinningLine = (squares: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinningLine([a, b, c]);
        return;
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setIsPlayerNext(true);
    setGameOver(false);
    setWinningLine(null);
  };

  const getGameStatus = () => {
    const winner = checkWinner(board);
    if (winner) {
      return `Winner: ${winner === 'X' ? 'Player' : 'AI'}`;
    }
    if (board.every(square => square)) {
      return "It's a draw!";
    }
    return `Next player: ${isPlayerNext ? 'Player (X)' : 'AI (O)'}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <div className="flex items-center justify-center mb-6">
          <Brain className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Tic Tac Toe vs AI</h1>
        </div>
        
        <div className="mb-6">
          <Board
            squares={board}
            onClick={isPlayerNext ? handleMove : () => {}}
            winningLine={winningLine}
          />
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold mb-4 text-gray-700">
            {getGameStatus()}
          </p>
          <button
            onClick={resetGame}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;