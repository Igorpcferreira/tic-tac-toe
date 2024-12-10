// AI logic for making moves
export const findBestMove = (board: string[]): number => {
  // Check for winning move
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const testBoard = [...board];
      testBoard[i] = 'O';
      if (checkWinner(testBoard) === 'O') {
        return i;
      }
    }
  }

  // Block player's winning move
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      const testBoard = [...board];
      testBoard[i] = 'X';
      if (checkWinner(testBoard) === 'X') {
        return i;
      }
    }
  }

  // Take center if available
  if (!board[4]) return 4;

  // Take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => !board[i]);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any available space
  const availableSpaces = board.map((cell, index) => !cell ? index : -1).filter(i => i !== -1);
  return availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
};

export const checkWinner = (squares: string[]): string | null => {
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
      return squares[a];
    }
  }

  return null;
};