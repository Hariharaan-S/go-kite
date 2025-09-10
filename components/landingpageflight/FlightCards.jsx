"use client";
import React from "react";
import "./styles/FlightCards.css";

const FlightCards = () => {
  const flightData = [
    {
      from: "Dhaka",
      fromSub: "Hazrat Shahjalal...",
      to: "Sylhet",
      toSub: "Osman International...",
    },
    {
      from: "Dhaka",
      fromSub: "Hazrat Shahjalal...",
      to: "Barisal",
      toSub: "Barisal Airport",
      highlighted: true,
    },
    {
      from: "Dhaka",
      fromSub: "Hazrat Shahjalal...",
      to: "Chattogram",
      toSub: "Shah Amanat Inter...",
    },
    {
      from: "Dhaka",
      fromSub: "Hazrat Shahjalal...",
      to: "Chattogram",
      toSub: "Shah Amanat Inter...",
    },
    {
      from: "Dhaka",
      fromSub: "Hazrat Shahjalal...",
      to: "Jashore",
      toSub: "Jashore Airport",
    },
    {
      from: "Dhaka",
      fromSub: "Hazrat Shahjalal...",
      to: "Barisal",
      toSub: "Barisal Airport",
    },
  ];

  return (
    <div className="flightcards-container">
      {/* Header */}
      <div className="flightcards-header">
        <h1 className="flightcards-title">Top Domestic & International Flight</h1>
        <div className="flightcards-toggle">
          <button className="tab-btn active">Domestic</button>
          <button className="tab-btn">International</button>
        </div>
      </div>

      {/* Flight Cards Grid */}
      <div className="flightcards-grid">
        {flightData.map((flight, index) => (
          <div
            key={index}
            className={`flightcard ${flight.highlighted ? "highlighted" : ""}`}
          >
            {/* From Location */}
            <div className="flightcard-location flightcard-from">
              <div className="flightcard-main">{flight.from}</div>
              <div className="flightcard-sub">{flight.fromSub}</div>
            </div>

            {/* Flight Icon */}
            <div className="flightcard-icon">
              <img
                src="/img/general/flight-icon.png"
                alt="Flight"
                className="flight-icon-img"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "inline-block";
                }}
              />
              <span className="flight-icon-fallback">✈️</span>
            </div>

            {/* To Location */}
            <div className="flightcard-location flightcard-to">
              <div className="flightcard-main">{flight.to}</div>
              <div className="flightcard-sub">{flight.toSub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="view-all-link">
        <a href="#">View All →</a>
      </div>
    </div>
  );
};

export default FlightCards;
