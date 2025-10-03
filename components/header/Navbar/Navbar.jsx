"use client";
import React from "react";

const Navbar = () => {
  const handleLogoClick = () => {
    console.log("Logo clicked");
  };

  return (
    <header className="w-full bg-white">
      <nav
        className="mx-auto w-full max-w-7xl"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
        }}
      >
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center space-x-5 focus:outline-none"
          style={{ paddingLeft: "15px" }}
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
        <div style={{ marginLeft: "auto", paddingRight: "20px" }}>
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
            style={{ borderRadius: "8px", padding: "15px" }}
          >
            Hi, Usman
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
