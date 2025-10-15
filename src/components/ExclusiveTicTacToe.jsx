import React, { useState } from "react";
import Navbar from "./Navbar";

const ExclusiveTicTacToe = () => {
    const [board, setBoard] = useState(Array(25).fill(null)); // 5x5 grid
    const [isXNext, setIsXNext] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [powerUps, setPowerUps] = useState({ bomb: true, swap: true }); // Track power-up usage
    const [lastClickedIndex, setLastClickedIndex] = useState(null); // Track the last clicked cell

    const handleClick = (index) => {
        if (board[index] || gameOver) return; // Prevent clicks after game ends
        const newBoard = board.slice();
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
        setLastClickedIndex(index); // Update the last clicked cell

        if (calculateWinner(newBoard) || newBoard.every((cell) => cell !== null)) {
            setGameOver(true); // Set gameOver to true if there's a winner or draw
        }
    };

    const handleBomb = () => {
        if (!powerUps.bomb || lastClickedIndex === null) return; // Prevent using bomb if already used or no cell clicked
        const newBoard = board.slice();
        const row = Math.floor(lastClickedIndex / 5);
        const col = lastClickedIndex % 5;

        // Clear a 3x3 area around the last clicked cell
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i >= 0 && i < 5 && j >= 0 && j < 5) {
                    newBoard[i * 5 + j] = null;
                }
            }
        }

        setBoard(newBoard);
        setPowerUps({ ...powerUps, bomb: false }); // Disable bomb after use
    };

    const handleSwap = () => {
        if (!powerUps.swap) return; // Prevent using swap if already used

        const newBoard = [...board]; // Create a copy of the board

        // Find two occupied cells (one with "X" and one with "O")
        const occupiedCells = newBoard
            .map((cell, index) => (cell !== null ? index : null)) // Map occupied cells to their indices
            .filter((index) => index !== null); // Filter out empty cells

        console.log("Occupied Cells:", occupiedCells); // Debug: Check occupied cells

        if (occupiedCells.length >= 2) {
            // Select the first two occupied cells
            const [first, second] = occupiedCells.slice(0, 2);

            console.log("Swapping Cells:", first, second); // Debug: Check cells being swapped

            // Swap their values
            [newBoard[first], newBoard[second]] = [newBoard[second], newBoard[first]];

            console.log("New Board After Swap:", newBoard); // Debug: Check updated board

            // Update the board state
            setBoard(newBoard);

            // Disable the swap power-up after use
            setPowerUps({ ...powerUps, swap: false });
        } else {
            console.log("Not enough occupied cells to swap."); // Debug: Check if there are enough occupied cells
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
        setBoard(Array(25).fill(null));
        setIsXNext(true);
        setGameOver(false);
        setPowerUps({ bomb: true, swap: true }); // Reset power-ups
        setLastClickedIndex(null); // Reset last clicked cell
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#000000] text-white flex flex-col items-center justify-center p-4 overflow-hidden pt-[80px]">
            <Navbar />

            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#ff8a00] to-[#ff3d00] text-transparent bg-clip-text">
                Exclusive Tic Tac Toe
            </h1>

            {/* Status Message */}
            <div className="text-5xl mb-8 font-semibold bg-gradient-to-r from-[#ff8a00] to-[#ff3d00] text-transparent bg-clip-text">
                {status}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={handleBomb}
                    disabled={!powerUps.bomb || lastClickedIndex === null} // Disable if bomb is used or no cell clicked
                    className="px-6 py-3 bg-gradient-to-r from-[#ff8a00] to-[#ff3d00] text-white font-semibold 
                       rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out 
                       transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Use Bomb
                </button>
                <button
                    onClick={handleSwap}
                    disabled={!powerUps.swap}
                    className="px-6 py-3 bg-gradient-to-r from-[#ff8a00] to-[#ff3d00] text-white font-semibold 
                       rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out 
                       transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Use Swap
                </button>
            </div>

            {/* Game Board and Power-Up Buttons */}
            <div className="flex items-center justify-center gap-8 mt-4">
                {/* Game Board (Centered) */}
                <div className="flex justify-center">
                    <div className="grid grid-cols-5 gap-4 border-[#262626] border-[12px] p-4 rounded-[12px] shadow-2xl">
                        {board.map((value, index) => (
                            <div
                                key={index}
                                onClick={() => handleClick(index)}
                                className="w-16 h-16  border-[#262626] border-[6px] rounded-[10px] 
                           flex justify-center items-center hover:cursor-pointer"
                            >
                                {value === "X" ? (
                                    <svg
                                        className="w-12 h-12 sm:w-16 sm:h-16 text-[#ff8a00]"
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
                                        className="w-11 h-11 sm:w-15 sm:h-15 text-[#ff3d00] animate-spin"
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
                </div>
            </div>

            {gameOver && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80">
                    <button
                        onClick={restartGame}
                        className="text-2xl px-8 py-4 bg-gradient-to-r from-[#ff8a00] to-[#ff3d00] text-white font-semibold 
                       rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
                    >
                        Restart Game
                    </button>
                </div>
            )}

            {/* Rules Section */}
            <div className="mt-20 bottom-0 left-0 w-full bg-[#121212] p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#ff8a00] to-[#ff3d00] text-transparent bg-clip-text">
                    Game Rules
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#ff8a00] to-[#ff3d00] text-transparent bg-clip-text">
                            Exclusive Tic Tac Toe
                        </h3>
                        <ul className="list-disc list-inside text-gray-300">
                            <li>Play on a 5x5 grid.</li>
                            <li>Win by aligning 4 symbols in a row, column, or diagonal.</li>
                            <li>Use the <strong>Bomb</strong> power-up to clear a 3x3 area around the last clicked cell.</li>
                            <li>Use the <strong>Swap</strong> power-up to swap the positions of two occupied cells.</li>
                            <li>Each power-up can be used only once per game.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Function to Calculate Winner (4 in a row for 5x5 grid)
const calculateWinner = (board) => {
    const lines = [
        // Rows
        [0, 1, 2, 3],
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [6, 7, 8, 9],
        [10, 11, 12, 13],
        [11, 12, 13, 14],
        [15, 16, 17, 18],
        [16, 17, 18, 19],
        [20, 21, 22, 23],
        [21, 22, 23, 24],
        // Columns
        [0, 5, 10, 15],
        [1, 6, 11, 16],
        [2, 7, 12, 17],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 11, 16, 21],
        [7, 12, 17, 22],
        [8, 13, 18, 23],
        [9, 14, 19, 24],
        // Diagonals
        [0, 6, 12, 18],
        [1, 7, 13, 19],
        [4, 8, 12, 16],
        [5, 11, 17, 23],
    ];
    for (let line of lines) {
        const [a, b, c, d] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d]) {
            return board[a];
        }
    }
    return null;
};

export default ExclusiveTicTacToe;