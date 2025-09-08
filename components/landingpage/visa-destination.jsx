"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./styles/visa-destination.css";

const VisaDestinationCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [windowWidth, setWindowWidth] = useState(1024);

  // Update visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1); // Mobile: 1 card
      } else if (width < 768) {
        setVisibleCards(2); // Small tablet: 2 cards
      } else if (width < 1024) {
        setVisibleCards(3); // Tablet: 3 cards
      } else {
        setVisibleCards(4); // Desktop: 4 cards
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const destinations = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&crop=center",
      country: "United Arab Emirates",
      fastTrack: {
        date: "26 Mar, 11:03PM",
        originalPrice: "₹6,500",
        discountPrice: "₹8,500",
        totalPrice: "₹15,000",
      },
      getOn: {
        date: "25 Mar, 11:02PM",
        price: "₹6,500",
      },
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=300&fit=crop&crop=center",
      country: "United Arab Emirates",
      fastTrack: {
        date: "26 Mar, 11:03PM",
        originalPrice: "₹6,500",
        discountPrice: "₹8,500",
        totalPrice: "₹15,000",
      },
      getOn: {
        date: "25 Mar, 11:02PM",
        price: "₹3,500",
      },
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop&crop=center",
      country: "Singapore",
      fastTrack: {
        date: "26 Mar, 11:03PM",
        originalPrice: "₹6,500",
        discountPrice: "₹8,500",
        totalPrice: "₹15,000",
      },
      getOn: {
        date: "25 Mar, 11:02PM",
        price: "₹6,500",
      },
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&crop=center",
      country: "Egypt",
      fastTrack: {
        date: "26 Mar, 11:03PM",
        originalPrice: "₹6,500",
        discountPrice: "₹8,500",
        totalPrice: "₹15,000",
      },
      getOn: {
        date: "25 Mar, 11:02PM",
        price: "₹6,500",
      },
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      country: "Japan",
      fastTrack: {
        date: "26 Mar, 11:03PM",
        originalPrice: "₹6,500",
        discountPrice: "₹8,500",
        totalPrice: "₹15,000",
      },
      getOn: {
        date: "25 Mar, 11:02PM",
        price: "₹6,500",
      },
    },
  ];

  const totalSlides = destinations.length;

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

  // Compute the visible cards window with wrapping
  const getVisibleDestinations = () => {
    if (totalSlides <= visibleCards) return destinations;
    if (currentSlide + visibleCards <= totalSlides) {
      return destinations.slice(currentSlide, currentSlide + visibleCards);
    } else {
      return [
        ...destinations.slice(currentSlide),
        ...destinations.slice(0, (currentSlide + visibleCards) % totalSlides),
      ];
    }
  };

  const visibleDestinations = getVisibleDestinations();

  // Responsive window width update
  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  // Helper functions for responsive styles
  const getContainerPadding = () => {
    if (windowWidth < 640) return "16px";
    if (windowWidth < 768) return "24px";
    if (windowWidth < 1024) return "32px";
    if (windowWidth < 1280) return "48px";
    return "96px";
  };

  const getCardWidth = () => {
    if (visibleCards === 1) return "100%";
    if (visibleCards === 2) return "calc(50% - 12px)";
    if (visibleCards === 3) return "calc(33.333% - 16px)";
    return "calc(25% - 18px)";
  };

  const getImageHeight = () => {
    if (windowWidth < 640) return "200px";
    if (windowWidth < 768) return "220px";
    return "250px";
  };

  const getCardHeight = () => {
    if (windowWidth < 640) return "auto";
    return "500px";
  };

  const getTitleSize = () => {
    if (windowWidth < 640) return "20px";
    if (windowWidth < 768) return "22px";
    return "24px";
  };

  const getHeaderSize = () => {
    if (windowWidth < 640) return "28px";
    if (windowWidth < 768) return "32px";
    return "36px";
  };

  return (
    <div
      className="visa-container"
      style={{
        padding: `32px ${getContainerPadding()}`,
      }}
    >
      {/* Section header with navigation */}
      <div
        className="visa-header"
        style={{
          flexDirection: windowWidth < 640 ? "column" : "row",
          marginBottom: windowWidth < 640 ? "16px" : "32px",
          gap: windowWidth < 640 ? "16px" : "0",
          alignItems: windowWidth < 640 ? "flex-start" : "center",
        }}
      >
        <h1
          className="visa-header-title"
          style={{
            fontSize: getHeaderSize(),
          }}
        >
          Top Visa Destination
        </h1>
        <div className="visa-nav">
          <span className="visa-view-all">View All</span>
          <button
            className="visa-nav-button"
            style={{
              width: windowWidth < 768 ? "36px" : "40px",
              height: windowWidth < 768 ? "36px" : "40px",
            }}
            onClick={prevSlide}
          >
            <ChevronLeft size={windowWidth < 768 ? 16 : 18} />
          </button>
          <button
            className="visa-nav-button"
            style={{
              width: windowWidth < 768 ? "36px" : "40px",
              height: windowWidth < 768 ? "36px" : "40px",
            }}
            onClick={nextSlide}
          >
            <ChevronRight size={windowWidth < 768 ? 16 : 18} />
          </button>
        </div>
      </div>

      {/* Destinations Container */}
      <div
        className="visa-destinations-container"
        style={{
          gap: windowWidth < 640 ? "16px" : "24px",
          justifyContent: windowWidth < 640 ? "center" : "flex-start",
          paddingBottom: windowWidth < 640 ? "0" : "10px",
        }}
      >
        {visibleDestinations.map((destination) => (
          <div
            key={destination.id}
            className="visa-card"
            style={{
              width: getCardWidth(),
              minWidth: windowWidth < 640 ? "280px" : "250px",
              maxWidth: windowWidth < 640 ? "400px" : "300px",
              height: getCardHeight(),
            }}
          >
            {/* Image Container */}
            <div
              className="visa-card-image"
              style={{
                height: getImageHeight(),
                backgroundImage: `url(${destination.image})`,
              }}
            >
              {/* Fast track overlay */}
              <div className="fast-track-overlay">
                Fast track{" "}
                {windowWidth < 640
                  ? destination.fastTrack.date.split(",")[0]
                  : destination.fastTrack.date}
              </div>

              {/* Price overlay */}
              <div className="price-overlay" style={{ flexDirection: windowWidth < 640 ? "column" : "row" }}>
                {windowWidth < 640 ? (
                  <>
                    <div>
                      <span className="original-price">
                        {destination.fastTrack.originalPrice}
                      </span>
                      <span className="discount-price">
                        + {destination.fastTrack.discountPrice}
                      </span>
                    </div>
                    <span className="total-price">
                      = {destination.fastTrack.totalPrice}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="original-price">
                      {destination.fastTrack.originalPrice}
                    </span>
                    <span className="discount-price">
                      + {destination.fastTrack.discountPrice}
                    </span>
                    <span className="total-price">
                      = {destination.fastTrack.totalPrice}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Card Content */}
            <div className="visa-card-content">
              {/* Country Name */}
              <h3
                className="visa-card-title"
                style={{ fontSize: getTitleSize() }}
              >
                {destination.country}
              </h3>

              {/* Get On Info */}
              <div className="get-on-info">
                <div className="get-on-date">
                  Get on{" "}
                  <span className="get-on-date-highlight">
                    {windowWidth < 640
                      ? destination.getOn.date.split(",")[0]
                      : destination.getOn.date}
                  </span>
                </div>
                <div className="get-on-price">{destination.getOn.price}</div>
              </div>

              {/* Flight Info (only for some cards) */}
              {destination.flightInfo && (
                <div className="flight-info">
                  {windowWidth < 640
                    ? "30 Flights available"
                    : destination.flightInfo}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisaDestinationCards;
