import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import TicTacToeGame from "./components/TicTacToeGame"; 
import ExclusiveTicTacToe from "./components/ExclusiveTicTacToe";
import ImpossibleTicTacToe from "./components/ImpossibleTicTacToe"; 

const App = () => {
  return (
    <div className="m-0 p-0 min-h-screen w-full bg-[#0b0b0b] text-white overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tic-tac-toe" element={<TicTacToeGame />} />
        <Route path="/exclusive-tic-tac-toe" element={<ExclusiveTicTacToe />} />
        <Route path="/impossible-tic-tac-toe" element={<ImpossibleTicTacToe />} />
      </Routes>
    </div>
  );
};

const Home = () => {
  return (
    <main className="h-screen flex flex-col sm:flex-row justify-center items-center gap-8 px-6">
      <GameCard
        title="Normal Tic Tac Toe"
        description="A classic 3x3 grid Tic Tac Toe game where two players take turns placing Xs and Os."
        gradient="from-[#7e33ff] to-[#c664fb]"
        link="/tic-tac-toe"
      />
      <GameCard
        title="Exclusive Tic Tac Toe"
        description="A unique twist with power-ups, larger grids, and custom rules!"
        gradient="from-[#ff8a00] to-[#ff3d00]"
        link="/exclusive-tic-tac-toe"
      />
      <GameCard
        title="AI Tic Tac Toe"
        description="Face off against a highly skilled AI in this challenging variant of Tic Tac Toe!"
        gradient="from-[#69ffe6] to-[#00deb9]"
        link="/impossible-tic-tac-toe"
      />
    </main>
  );
};

const GameCard = ({ title, description, gradient, link }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group relative text-white border-[2px] border-gray-500 rounded-[12px] h-[200px] w-full sm:w-[380px] 
                 bg-[#1a1a1a] bg-opacity-50 backdrop-blur-lg shadow-lg transition-transform transform hover:scale-105">
      <h1 className={`text-[22px] font-bold ml-5 mt-4 bg-gradient-to-r ${gradient} text-transparent bg-clip-text`}>
        {title}
      </h1>
      <p className="text-gray-300 text-[15px] ml-5 mt-2 pr-5">{description}</p>
      <button
        onClick={() => navigate(link)}
        className={`absolute bottom-4 right-4 text-white bg-gradient-to-r ${gradient} px-4 py-2 rounded-lg 
                   font-semibold transition-transform transform hover:scale-105 cursor-pointer`}>
        Play Now
      </button>
    </div>
  );
};

export default App;
