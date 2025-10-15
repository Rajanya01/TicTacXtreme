import React from 'react';
import TicTacToeLogo from './TicTacToeLogo.svg'; // Import SVG file

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-none shadow-lg flex items-center px-6 z-50 justify-between">
      <div className="bg-none flex space-x-4 cursor-pointer duration-100 ease-in hover:scale-[1.03]">
        <img src={TicTacToeLogo} alt="Tic Tac Toe Logo" className=" h-[50px] w-[50px]" />
        <div className=" text-[32px] font-extrabold bg-gradient-to-r from-[#7e33ff] via-[#ba71ff] to-[#c664fb] 
                      text-transparent bg-clip-text shadow-lg">
          TicTacXtreme
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
