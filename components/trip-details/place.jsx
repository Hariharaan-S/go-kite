"use client";
import React, { useRef } from "react";
import "./styles/place.css";

const FALLBACK_IMAGE = "/img/general/fallback-image.jpg";

// Helper function to get image URL using the proxy endpoint
const getImageUrl = (imageName) => {
  if (!imageName) return FALLBACK_IMAGE;
  return `/api/cms/file-download?image=${encodeURIComponent(imageName)}`;
};

const PlacesCarousel = ({ holidaysDetails }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const scroller = scrollRef.current;
    if (scroller) {
      const width = scroller.offsetWidth;
      scroller.scrollBy({ left: dir * width * 0.75, behavior: "smooth" });
    }
  };

  // Get thumbnail data from holidaysDetails
  const getThumbnailData = () => {
    if (!holidaysDetails?.cardJson?.thumbnail || !Array.isArray(holidaysDetails.cardJson.thumbnail)) {
      return [];
    }

    return holidaysDetails.cardJson.thumbnail.map((item, index) => ({
      img: getImageUrl(item.image),
      label: item.title || `Place ${index + 1}`,
      originalImage: item.image
    }));
  };

  const thumbnailData = getThumbnailData();

  // Don't render if no thumbnail data
  if (thumbnailData.length === 0) {
    return null;
  }

  return (
    <div className="places-carousel-container">
      <h2 className="places-carousel-title">Places You'll Visit</h2>
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
          {thumbnailData.map((card, idx) => (
            <div key={idx} className="places-carousel-card">
              <img
                src={card.img}
                alt={card.label}
                className="places-carousel-card-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                onLoad={(e) => {
                  console.log(`Thumbnail image loaded: ${card.label}`);
                }}
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
