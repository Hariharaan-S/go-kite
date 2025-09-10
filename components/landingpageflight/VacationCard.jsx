"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./styles/VacationCard.css";


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
        ? totalDestinations - (totalDestinations % VISIBLE_CARDS || VISIBLE_CARDS)
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
    <div className="vacation-wrapper">
      <div className="vacation-header">
        <h2 className="vacation-title">Top Vacation Destinations</h2>
        <div className="vacation-actions">
          <span className="view-all">View All</span>
          <div className="nav-buttons">
            <button onClick={prevSlide} className="nav-button">
              <ChevronLeft size={18} color="white" />
            </button>
            <button onClick={nextSlide} className="nav-button">
              <ChevronRight size={18} color="white" />
            </button>
          </div>
        </div>
      </div>

      <div className="cards-container">
        {visibleDestinations.map((destination) => (
          <div key={destination.id} className="destination-card">
            <div
              className="card-bg-image"
              style={{ backgroundImage: `url(${destination.image})` }}
            />
            <div className="card-overlay" />
            <div className="destination-name">
              <h3>{destination.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VacationDestinations;
