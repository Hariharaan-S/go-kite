"use client";
import React from "react";

const Navbar = () => {
  const handleLogoClick = () => {
    console.log("Logo clicked");
  };

  return (
    <header className="w-full bg-white">
      <nav
        className="
          mx-auto 
          flex 
          w-full 
          max-w-7xl 
          items-center 
          justify-between   /* spreads logo left & button right */
          px-4 
          py-3
        "
      >
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center space-x-5 focus:outline-none"
          style={{paddingLeft:"15px"}}
        >
          <img
            src="/img/general/logo.svg"
            alt="GoKite Logo"
            width="120"
            height="40"
            className="h-10 w-auto"
          />
        </button>

        {/* Greeting button pinned to far right */}
        <div className="ml-auto pr-5">
          <button
            type="button"
            className="
              bg-black 
             
              text-sm 
              font-medium 
              text-white 
              hover:bg-gray-800 
              transition-colors 
              duration-200
            "
            style={{borderRadius:"8px", padding:"15px"}}
          >
            Hi, Usman
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
