"use client";
import React, { useState } from "react";

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
      style={{
        backgroundColor: bgColor,
        borderRadius: "16px",
        padding: "24px",
        width: "280px",
        height: "220px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: textColor,
        fontFamily: "Arial, sans-serif",
        position: "relative",
        boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Logo Container */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "12px 16px",
          alignSelf: "flex-start",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
          ...logoStyle,
        }}
      >
        <img
          src={logoUrl}
          alt={`${airlineName} logo`}
          style={{
            maxWidth: "120px",
            maxHeight: "50px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Airline Name */}
      <div
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "12px",
          lineHeight: "1.2",
        }}
      >
        {airlineName}
      </div>

      {/* Price */}
      <div
        style={{
          fontSize: "18px",
          fontWeight: "600",
          opacity: "0.9",
        }}
      >
        {price}
      </div>
    </div>
  );
};

const AirlineBookingCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const airlinesData = [
    {
      id: 1,
      logoUrl:
        "https://cdn.freebiesupply.com/logos/thumbs/2x/fly-dubai-1-logo.png",
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
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "40px 120px",
        minHeight: "50vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#333",
            margin: "0",
          }}
        >
          Book Based on Airlines
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <span
            style={{
              color: "#666",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            View All
          </span>
          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            <button
              onClick={prevSlide}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#333",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#333",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "stretch",
          overflowX: "auto",
          paddingBottom: "10px",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // Internet Explorer and Edge
        }}
      >
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
