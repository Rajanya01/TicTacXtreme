import React, { useState } from "react";
import Navbar from "./Navbar";

const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false); // New state to track if game is over

  const handleClick = (index) => {
    if (board[index] || gameOver) return; // Prevent clicks after game ends
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    if (calculateWinner(newBoard) || newBoard.every((cell) => cell !== null)) {
      setGameOver(true); // Set gameOver to true if there's a winner or draw
    }
  };

  const winner = calculateWinner(board);
  const isDraw = board.every((cell) => cell !== null) && !winner;
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? "It's a Draw!"
      : `Next player: ${isXNext ? "X" : "O"}`;

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false); // Reset game over state
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#000000] text-white flex flex-col items-center justify-center p-4 overflow-hidden pt-[80px]">

      <Navbar />

      <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#7e33ff] to-[#b731ff] text-transparent bg-clip-text">
        Normal Tic Tac Toe
      </h1>

      {/* Status Message (Always Visible) */}
      <div className="text-5xl mb-8 font-semibold bg-gradient-to-r from-[#7e33ff] to-[#c664fb] text-transparent bg-clip-text">
        {status}
      </div>

      {/* Game Board */}
      <div className="relative">
        <div className="grid grid-cols-3 gap-4 border-[#262626] border-[12px] p-8 rounded-[12px] shadow-2xl relative">
          {board.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="w-[110px] h-[110px] border-[#262626] border-[6px] rounded-[10px] flex justify-center items-center hover:cursor-pointer"
            >
              {value === "X" ? (
                <svg
                  className="w-20 h-20 sm:w-20 sm:h-22 text-[#7e33ff]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : value === "O" ? (
                <svg
                  className="w-20 h-20 sm:w-20 sm:h-22 text-[#ff8a00] animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"
                  />
                </svg>
              ) : null}
            </div>
          ))}
        </div>

        {/* Show Restart Button & Winner Message in Center if Game Ends */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 w-full h-full rounded-[12px]">
            <button
              onClick={restartGame}
              className="text-2xl px-8 py-4 bg-gradient-to-r from-[#7e33ff] to-[#c664fb] text-white font-semibold 
                         rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              Restart Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Function to Calculate Winner
const calculateWinner = (board) => {
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
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default TicTacToeGame;
