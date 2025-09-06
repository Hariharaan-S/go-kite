"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VacationDestinations = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const destinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      image:
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop&auto=format",
    },
    {
      id: 2,
      name: "Kerry, Ireland",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgUjxvWErjoVJLh8lnlxkyPz6bBWoFRQfsw&s",
    },
    {
      id: 3,
      name: "Sydney, Australia",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format",
    },
    {
      id: 4,
      name: "Paris, France",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJQXdiYNU9JGaDeM1Sk7Mmx4xjfn6mdIomsQ&s",
    },
    {
      id: 5,
      name: "Tokyo, Japan",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4debd8826?w=400&h=300&fit=crop&auto=format",
    },
  ];

  const VISIBLE_CARDS = 4;
  const totalDestinations = destinations.length;

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev + VISIBLE_CARDS >= totalDestinations ? 0 : prev + VISIBLE_CARDS
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev - VISIBLE_CARDS < 0
        ? totalDestinations -
          (totalDestinations % VISIBLE_CARDS || VISIBLE_CARDS)
        : prev - VISIBLE_CARDS
    );
  };

  const getVisibleDestinations = () => {
    if (totalDestinations <= VISIBLE_CARDS) return destinations;

    const visibleCards = [];
    for (let i = 0; i < VISIBLE_CARDS; i++) {
      const index = (currentSlide + i) % totalDestinations;
      visibleCards.push(destinations[index]);
    }

    return visibleCards;
  };

  const visibleDestinations = getVisibleDestinations();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1440px",
        margin: "0 auto",
        padding: "40px 120px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: "#f8f9fa",
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
        <h2
          style={{
            fontSize: "32px",
            fontWeight: "700",
            margin: "0",
            color: "#1a1a1a",
          }}
        >
          Top Vacation Destinations
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "#666",
              marginRight: "8px",
              cursor: "pointer",
            }}
          >
            View All
          </span>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#000",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <ChevronLeft size={18} color="white" />
          </button>

          <button
            onClick={nextSlide}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#000",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <ChevronRight size={18} color="white" />
          </button>
        </div>
      </div>

      {/* Cards Container */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "stretch",
          overflowX: "hidden",
        }}
      >
        {visibleDestinations.map((destination) => (
          <div
            key={destination.id}
            style={{
              position: "relative",
              width: "280px",
              height: "360px",
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            {/* Background Image */}
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                backgroundImage: `url(${destination.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Dark Overlay */}
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%)",
              }}
            />

            {/* Destination Name */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                right: "20px",
              }}
            >
              <h3
                style={{
                  color: "white",
                  fontSize: "22px",
                  fontWeight: "600",
                  margin: "0",
                  textShadow: "0 2px 4px rgba(0,0,0,0.4)",
                  lineHeight: "1.2",
                }}
              >
                {destination.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VacationDestinations;
