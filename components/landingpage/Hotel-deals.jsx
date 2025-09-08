"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./styles/hotel-deals.css";

const HotelDeals = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    const updateResponsiveSettings = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 768) {
        setVisibleCards(2);
      } else if (width < 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    updateResponsiveSettings();
    window.addEventListener("resize", updateResponsiveSettings);
    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);

  const hotelData = [
    {
      id: 1,
      name: "Wotel Calangute",
      location: "Goa, India",
      duration: "3 Days 2 Night",
      persons: "2 Person",
      price: "$328",
      rating: 4.7,
      reviews: 20,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Ocean View Resort",
      location: "Maldives",
      duration: "4 Days 3 Night",
      persons: "2 Person",
      price: "$450",
      rating: 4.9,
      reviews: 35,
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 3,
      name: "Mountain Lodge",
      location: "Switzerland",
      duration: "5 Days 4 Night",
      persons: "4 Person",
      price: "$680",
      rating: 4.8,
      reviews: 42,
      image:
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 4,
      name: "Desert Oasis",
      location: "Dubai, UAE",
      duration: "3 Days 2 Night",
      persons: "2 Person",
      price: "$520",
      rating: 4.6,
      reviews: 28,
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop&crop=center",
    },
    {
      id: 5,
      name: "City Center Hotel",
      location: "Tokyo, Japan",
      duration: "2 Days 1 Night",
      persons: "1 Person",
      price: "$280",
      rating: 4.5,
      reviews: 18,
      image:
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop&crop=center",
    },
  ];

  const totalSlides = hotelData.length;

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev + visibleCards >= totalSlides ? 0 : prev + visibleCards
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev - visibleCards < 0
        ? totalSlides - (totalSlides % visibleCards || visibleCards)
        : prev - visibleCards
    );
  };

  const getVisibleHotels = () => {
    if (totalSlides <= visibleCards) return hotelData;
    if (currentSlide + visibleCards <= totalSlides) {
      return hotelData.slice(currentSlide, currentSlide + visibleCards);
    } else {
      return [
        ...hotelData.slice(currentSlide),
        ...hotelData.slice(0, (currentSlide + visibleCards) % totalSlides),
      ];
    }
  };

  const visibleHotels = getVisibleHotels();

  // Dynamic CSS variables for responsive container padding and card width
  const containerPadding =
    windowWidth < 640
      ? "16px"
      : windowWidth < 768
      ? "24px"
      : windowWidth < 1024
      ? "32px"
      : windowWidth < 1280
      ? "48px"
      : "96px";

  const cardWidthValue =
    visibleCards === 1
      ? "100%"
      : visibleCards === 2
      ? "calc(50% - 12px)"
      : visibleCards === 3
      ? "calc(33.333% - 16px)"
      : "calc(25% - 18px)";

  return (
    <div
      className="hotel-deals-container"
      style={{ padding: `32px ${containerPadding}` }}
    >
      {/* Header */}
      <div
        className={`hotel-deals-header ${
          windowWidth < 640 ? "header-column" : "header-row"
        }`}
      >
        <h1
          className="hotel-deals-title"
          style={{
            fontSize:
              windowWidth < 640 ? "28px" : windowWidth < 768 ? "32px" : "36px",
          }}
        >
          Hotel Deals
        </h1>
        <div className="hotel-deals-controls">
          <button className="view-all-btn">View All</button>
          <div className="carousel-buttons">
            <button className="arrow-btn" onClick={prevSlide} aria-label="Previous">
              <ChevronLeft
                size={windowWidth < 768 ? 16 : 18}
                style={{ color: "#ffffff" }}
              />
            </button>
            <button className="arrow-btn" onClick={nextSlide} aria-label="Next">
              <ChevronRight
                size={windowWidth < 768 ? 16 : 18}
                style={{ color: "#ffffff" }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <div
        className="hotel-cards-wrapper"
        style={{ gap: windowWidth < 640 ? "16px" : "24px" }}
      >
        {visibleHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="hotel-card"
            style={{
              width: cardWidthValue,
              minWidth: windowWidth < 640 ? "280px" : "300px",
              maxWidth: windowWidth < 640 ? "400px" : "320px",
              height: windowWidth < 640 ? "auto" : "440px",
            }}
          >
            {/* Image */}
            <div
              className="hotel-image-wrapper"
              style={{
                height:
                  windowWidth < 640
                    ? "180px"
                    : windowWidth < 768
                    ? "200px"
                    : "220px",
              }}
            >
              <img src={hotel.image} alt="Hotel Room" className="hotel-image" />
              <div className="hotel-featured-label">Featured</div>
            </div>

            {/* Content */}
            <div
              className="hotel-content"
              style={{
                padding: windowWidth < 640 ? "16px" : "20px",
              }}
            >
              <h3
                className="hotel-name"
                style={{
                  fontSize:
                    windowWidth < 640
                      ? "18px"
                      : windowWidth < 768
                      ? "20px"
                      : "20px",
                }}
              >
                {hotel.name}
              </h3>

              {/* Location */}
              <div className="hotel-location">
                <MapPin
                  size={windowWidth < 640 ? 14 : 16}
                  className="location-icon"
                />
                <span className="location-text">{hotel.location}</span>
              </div>

              {/* Duration and Persons */}
              <div
                className={`duration-persons ${
                  windowWidth < 640 ? "column-layout" : "row-layout"
                }`}
                style={{
                  gap: windowWidth < 640 ? "8px" : "24px",
                }}
              >
                <div className="duration">
                  <Clock
                    size={windowWidth < 640 ? 14 : 16}
                    className="duration-icon"
                  />
                  <span className="duration-text">
                    {windowWidth < 640
                      ? hotel.duration.replace(" Night", "N").replace(" Days", "D")
                      : hotel.duration}
                  </span>
                </div>
                <div className="persons">
                  <Users
                    size={windowWidth < 640 ? 14 : 16}
                    className="persons-icon"
                  />
                  <span className="persons-text">{hotel.persons}</span>
                </div>
              </div>

              {/* Price and Rating */}
              <div
                className={`price-rating ${
                  windowWidth < 480 ? "column-layout" : "row-layout"
                }`}
                style={{ gap: windowWidth < 480 ? "8px" : 0 }}
              >
                <div className="price">
                  <span className="price-prefix">From</span>
                  <span className="price-value">{hotel.price}</span>
                </div>
                <div className="rating">
                  <Star
                    size={windowWidth < 640 ? 12 : 14}
                    className="star-icon"
                  />
                  <span className="rating-value">{hotel.rating}</span>
                  <span className="reviews-text">
                    ({hotel.reviews}
                    {windowWidth < 480 ? "" : " Reviews"})
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelDeals;
