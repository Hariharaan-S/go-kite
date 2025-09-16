"use client";
import React, { useRef } from "react";
import "./styles/place.css";

const cardsData = [
  {
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=400&q=80",
    label: "Sunrise Point",
  },
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80",
    label: "Batok Mountain",
  },
  {
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?fit=crop&w=400&q=80",
    label: "Bromo Crater",
  },
  {
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=400&q=80",
    label: "Bromo Savanna",
  },
];

const PlacesCarousel = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const scroller = scrollRef.current;
    if (scroller) {
      const width = scroller.offsetWidth;
      scroller.scrollBy({ left: dir * width * 0.75, behavior: "smooth" });
    }
  };

  return (
    <div className="places-carousel-container">
      <h2 className="places-carousel-title">Place You'll See</h2>
      <div className="places-carousel-wrapper">
        {/* Left Arrow */}
        <button
          aria-label="previous"
          onClick={() => scroll(-1)}
          className="places-carousel-arrow left-arrow"
        >
          &#8592;
        </button>
        {/* Card Container */}
        <div className="places-carousel-cards" ref={scrollRef}>
          {cardsData.map((card, idx) => (
            <div key={idx} className="places-carousel-card">
              <img
                src={card.img}
                alt={card.label}
                className="places-carousel-card-img"
              />
              <div className="places-carousel-card-label">{card.label}</div>
            </div>
          ))}
        </div>
        {/* Right Arrow */}
        <button
          aria-label="next"
          onClick={() => scroll(1)}
          className="places-carousel-arrow right-arrow"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default PlacesCarousel;
