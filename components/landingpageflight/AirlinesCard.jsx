"use client";
import React, { useState } from "react";
import "./styles/AirlinesCard.css";

const AirlineCard = ({
  logoUrl,
  airlineName,
  price,
  bgColor,
  textColor = "white",
  logoStyle = {},
}) => {
  return (
    <div
      className="airline-card"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Logo Container */}
      <div className="logo-container" style={logoStyle}>
        <img
          src={logoUrl}
          alt={`${airlineName} logo`}
          className="airline-logo"
        />
      </div>
      {/* Airline Name */}
      <div className="airline-name">{airlineName}</div>
      {/* Price */}
      <div className="airline-price">{price}</div>
    </div>
  );
};

const AirlineBookingCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const airlinesData = [
    {
      id: 1,
      logoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1HV1QjNWog1I0OK-NzcaMDAiVe7RbScZFtw&s",
      airlineName: "Fly Dubai",
      price: "$100 - 800",
      bgColor: "#1e7a8c",
    },
    {
      id: 2,
      logoUrl:
        "https://images.seeklogo.com/logo-png/0/2/air-asia-logo-png_seeklogo-5027.png",
      airlineName: "Air Asia",
      price: "$100 - 800",
      bgColor: "#e53e3e",
    },
    {
      id: 3,
      logoUrl:
        "https://www.logo.wine/a/logo/British_Airways/British_Airways-Logo.wine.svg",
      airlineName: "British Airway",
      price: "$100 - 800",
      bgColor: "#4a90e2",
    },
    {
      id: 4,
      logoUrl:
        "https://download.logo.wine/logo/Air_Malawi/Air_Malawi-Logo.wine.png",
      airlineName: "Air Malawai",
      price: "$100 - 800",
      bgColor: "#f5f5f5",
      textColor: "#333",
      logoStyle: { backgroundColor: "transparent", padding: "8px" },
    },
    {
      id: 5,
      logoUrl:
        "https://cdn.freebiesupply.com/logos/thumbs/2x/fly-dubai-1-logo.png",
      airlineName: "Fly Dubai",
      price: "$100 - 800",
      bgColor: "#1e7a8c",
    },
  ];

  const VISIBLE_CARDS = 4;
  const totalSlides = airlinesData.length;

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev + VISIBLE_CARDS >= totalSlides ? 0 : prev + VISIBLE_CARDS
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev - VISIBLE_CARDS < 0
        ? totalSlides - (totalSlides % VISIBLE_CARDS || VISIBLE_CARDS)
        : prev - VISIBLE_CARDS
    );
  };

  const getVisibleAirlines = () => {
    if (totalSlides <= VISIBLE_CARDS) return airlinesData;
    const visibleCards = [];
    for (let i = 0; i < VISIBLE_CARDS; i++) {
      const index = (currentSlide + i) % totalSlides;
      visibleCards.push(airlinesData[index]);
    }
    return visibleCards;
  };

  const visibleAirlines = getVisibleAirlines();

  return (
    <div className="airline-booking-wrapper">
      {/* Header */}
      <div className="header-container">
        <h1 className="header-title">Book Based on Airlines</h1>
        <div className="header-actions">
          <span className="view-all">View All</span>
          <div className="buttons-container">
            <button onClick={prevSlide} className="nav-button">
              ‹
            </button>
            <button onClick={nextSlide} className="nav-button">
              ›
            </button>
          </div>
        </div>
      </div>
      {/* Cards Container */}
      <div className="cards-container">
        {visibleAirlines.map((airline) => (
          <AirlineCard
            key={airline.id}
            logoUrl={airline.logoUrl}
            airlineName={airline.airlineName}
            price={airline.price}
            bgColor={airline.bgColor}
            textColor={airline.textColor}
            logoStyle={airline.logoStyle}
          />
        ))}
      </div>
    </div>
  );
};

export default AirlineBookingCards;
