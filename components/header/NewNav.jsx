import React from "react";
import './styles/new-nav.styles.css'

const Navbar = () => {
  return (
    <nav className="navbar"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "18px 32px 18px 32px", // Explicit padding top/right/bottom/left
        margin: 0, // Remove default margin
        background: "#fcfcfc",
        justifyContent: "space-between",
        boxSizing: "border-box",
        lineHeight: 1, // Tight line height to reduce vertical space
      }}
    >
      {/* Left: Logo image */}
      <div style={{ height: 50, display: "flex", alignItems: "center" }}>
        <img
          src="/img/general/logo.svg"
          alt="Go Kite Logo"
          style={{ height: 50, width: "auto", objectFit: "contain", display: "block" }}
        />
      </div>

      {/* Center: Destination and Date */}
      <div className="destination-date"
        style={{
          display: "flex",
          border: "2px solid #ffe29b",
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "6px 20px",
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            fontSize: 15,
            background: "#fffbe7",
          }}
        >
          <span style={{ fontSize: 18, marginRight: 6 }}>✈️</span> Singapore
        </div>
        <div
          style={{
            padding: "6px 20px",
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            fontSize: 15,
            background: "#fcfcfc",
            borderLeft: "1.5px solid #ffe29b",
          }}
        >
          28th May
        </div>
      </div>

      {/* Right: Buttons */}
      <div className="visa-button-group" style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <button className="visa-application"
          style={{
            background: "#4694a6",
            color: "#fff",
            border: "none",
            padding: "9px 27px",
            borderRadius: 20,
            fontWeight: 500,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          <span className="visa-text">Visa Application</span>
        </button>
        <button className="search-icon">
          <img src="img/apply-visa/glass.svg" width='40px' height='40px' alt="" />
        </button>
        <span className="sign-in"
          style={{
            color: "#222",
            fontSize: 17,
            fontWeight: 500,
            cursor: "pointer",
            marginLeft: 12,
            marginRight: 8,
          }}
        >
          Sign In
        </span>
        <button className="sign-in"
          style={{
            background: "#111",
            color: "#fff",
            border: "none",
            padding: "9px 27px",
            borderRadius: 20,
            fontWeight: 500,
            fontSize: 16,
            marginLeft: 2,
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
