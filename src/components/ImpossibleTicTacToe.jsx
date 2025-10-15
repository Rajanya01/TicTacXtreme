import React, { useState } from "react";
import Navbar from "./Navbar";

const ImpossibleTicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); 
  const [isPlayerNext, setIsPlayerNext] = useState(true); 
  const [gameOver, setGameOver] = useState(false);

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
    if (board.every((cell) => cell !== null)) return "draw"; 
    return null; 
  };

  const handleClick = (index) => {
    if (board[index] || gameOver) return; 

    const newBoard = board.slice();
    newBoard[index] = "X"; 
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameOver(true); 
    } else {
      setIsPlayerNext(false); 
      setTimeout(() => makeAIMove(newBoard), 500); 
    }
  };

  const makeAIMove = (currentBoard) => {
    const emptyCells = currentBoard
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null); 
    let bestMove = null;

    for (let cell of emptyCells) {
      const newBoard = currentBoard.slice();
      newBoard[cell] = "O"; 
      if (calculateWinner(newBoard) === "O") {
        bestMove = cell;
        break;
      }
    }

    if (bestMove === null) {
      for (let cell of emptyCells) {
        const newBoard = currentBoard.slice();
        newBoard[cell] = "X"; 
        if (calculateWinner(newBoard) === "X") {
          bestMove = cell;
          break;
        }
      }
    }

    if (bestMove === null) {
      bestMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    const newBoard = currentBoard.slice();
    newBoard[bestMove] = "O";
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameOver(true); 
    } else {
      setIsPlayerNext(true);
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerNext(true);
    setGameOver(false);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? winner === "draw"
      ? "It's a Draw!"
      : `Winner: ${winner}`
    : `Next player: ${isPlayerNext ? "You (X)" : "AI (O)"}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#000000] text-white flex flex-col items-center justify-center p-4 overflow-hidden pt-[80px]">
      <Navbar />

      <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#69ffe6] to-[#00deb9] text-transparent bg-clip-text">
        AI Tic Tac Toe
      </h1>

      <div className="text-5xl mb-8 font-semibold bg-gradient-to-r from-[#69ffe6] to-[#00deb9] text-transparent bg-clip-text">
        {status}
      </div>

      <div className="grid grid-cols-3 gap-4 border-[#262626] border-[12px] p-8 rounded-[12px] shadow-2xl">
        {board.map((value, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 sm:w-32 sm:h-32 border-[#262626] border-[6px] rounded-[10px] 
                       flex justify-center items-center hover:cursor-pointer"
          >
            {value === "X" ? (
              <svg
                className="w-16 h-16 sm:w-20 sm:h-20 text-[#12b8ff]"
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
                className="w-16 h-16 sm:w-20 sm:h-20 text-[#69ffe6] animate-spin"
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

      {gameOver && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80">
          <button
            onClick={restartGame}
            className="text-2xl px-8 py-4 bg-gradient-to-r from-[#69ffe6] to-[#00deb9] text-white font-semibold 
                       rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
          >
            Restart Game
          </button>
        </div>
      )}

      <div className="mt-20 bottom-0 left-0 w-full bg-[#121212] p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#69ffe6] to-[#00deb9] text-transparent bg-clip-text">
          Game Rules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#69ffe6] to-[#00deb9] text-transparent bg-clip-text">
              AI Tic Tac Toe
            </h3>
            <ul className="list-disc list-inside text-gray-300">
              <li>Play against a highly skilled AI.</li>
              <li>You are <strong>X</strong>, and the AI is <strong>O</strong>.</li>
              <li>Win by aligning 3 symbols in a row, column, or diagonal.</li>
              <li>The AI will try to block you and win at every opportunity.</li>
              <li>Can you outsmart the AI and claim victory?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpossibleTicTacToe;