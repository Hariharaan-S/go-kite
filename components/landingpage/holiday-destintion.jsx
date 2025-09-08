"use client";
import {
  Heart,
  Plane,
  Building2,
  Car,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState, useEffect } from "react";

export default function HolidayDestinations() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

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
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      title: "Swiss Alps",
      rating: 4.7,
      duration: "3Days 4 Nights",
      flights: "2 Flights",
      hotels: "1 Hotel",
      transfers: "2 Transfers",
      activities: "4 Activities",
      features: [
        "Tour combo with return airport transfer",
        "City Tour",
        "Curious Corner",
      ],
      originalPrice: "₹98,952",
      discountedPrice: "₹88,952",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop",
      title: "Hallstatt",
      rating: 4.9,
      duration: "3Days 4 Nights",
      flights: "2 Flights",
      hotels: "1 Hotel",
      transfers: "2 Transfers",
      activities: "4 Activities",
      features: [
        "Tour combo with return airport transfer",
        "City Tour",
        "Curious Corner",
      ],
      originalPrice: "₹98,952",
      discountedPrice: "₹88,952",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      title: "Faroe Island",
      rating: 4.5,
      duration: "3Days 4 Nights",
      flights: "2 Flights",
      hotels: "1 Hotel",
      transfers: "2 Transfers",
      activities: "4 Activities",
      features: [
        "Tour combo with return airport transfer",
        "City Tour",
        "Curious Corner",
      ],
      originalPrice: "₹98,952",
      discountedPrice: "₹88,952",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      title: "Innsbruck",
      rating: 4.8,
      duration: "3Days 4 Nights",
      flights: "2 Flights",
      hotels: "1 Hotel",
      transfers: "2 Transfers",
      activities: "4 Activities",
      features: [
        "Tour combo with return airport transfer",
        "City Tour",
        "Curious Corner",
      ],
      originalPrice: "₹98,952",
      discountedPrice: "₹88,952",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=250&fit=crop",
      title: "Another Destination",
      rating: 4.6,
      duration: "3Days 4 Nights",
      flights: "2 Flights",
      hotels: "1 Hotel",
      transfers: "2 Transfers",
      activities: "4 Activities",
      features: [
        "Tour combo with return airport transfer",
        "City Tour",
        "Curious Corner",
      ],
      originalPrice: "₹98,952",
      discountedPrice: "₹88,952",
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

  // Responsive helper functions
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

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
    return "240px";
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
      style={{
        padding: `32px ${getContainerPadding()}`,
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Section header with navigation */}
      <div
        style={{
          display: "flex",
          flexDirection: windowWidth < 640 ? "column" : "row",
          justifyContent: "space-between",
          alignItems: windowWidth < 640 ? "flex-start" : "center",
          marginBottom: windowWidth < 640 ? "16px" : "32px",
          gap: windowWidth < 640 ? "16px" : "0",
        }}
      >
        <h1
          style={{
            fontSize: getHeaderSize(),
            fontWeight: "700",
            color: "#1e293b",
            margin: 0,
            lineHeight: "1.2",
          }}
        >
          Popular Holiday Destinations
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "#666",
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#1e293b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#666";
            }}
          >
            View All
          </span>
          <button
            onClick={prevSlide}
            style={{
              width: windowWidth < 768 ? "36px" : "40px",
              height: windowWidth < 768 ? "36px" : "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "#000",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#374151";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#000";
            }}
          >
            <ChevronLeft size={windowWidth < 768 ? 16 : 18} />
          </button>
          <button
            onClick={nextSlide}
            style={{
              width: windowWidth < 768 ? "36px" : "40px",
              height: windowWidth < 768 ? "36px" : "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "#000",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#374151";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#000";
            }}
          >
            <ChevronRight size={windowWidth < 768 ? 16 : 18} />
          </button>
        </div>
      </div>

      {/* Destinations Container */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: windowWidth < 640 ? "16px" : "24px",
          justifyContent: windowWidth < 640 ? "center" : "flex-start",
          alignItems: "stretch",
          paddingBottom: windowWidth < 640 ? "0" : "10px",
          maxWidth: "100%",
        }}
      >
        {visibleDestinations.map((destination) => (
          <div
            key={destination.id}
            style={{
              width: getCardWidth(),
              minWidth: windowWidth < 640 ? "280px" : "250px",
              maxWidth: windowWidth < 640 ? "400px" : "none",
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
            }}
          >
            {/* Image Section */}
            <div style={{ position: "relative" }}>
              <img
                src={destination.image}
                alt={destination.title}
                style={{
                  width: "100%",
                  height: getImageHeight(),
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <button
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "50%",
                  width: windowWidth < 768 ? "36px" : "40px",
                  height: windowWidth < 768 ? "36px" : "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.9)";
                }}
              >
                <Heart
                  size={windowWidth < 768 ? 18 : 20}
                  style={{ color: "#64748b" }}
                />
              </button>
            </div>

            {/* Content Section */}
            <div
              style={{
                padding: windowWidth < 640 ? "16px" : "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              {/* Title and Rating */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "8px",
                  gap: "12px",
                }}
              >
                <h3
                  style={{
                    fontSize: getTitleSize(),
                    fontWeight: "600",
                    color: "#1e293b",
                    margin: "0",
                    lineHeight: "1.3",
                    flex: 1,
                  }}
                >
                  {destination.title}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: "#fbbf24", fontSize: "18px" }}>★</span>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#1e293b",
                    }}
                  >
                    {destination.rating}
                  </span>
                </div>
              </div>

              {/* Duration */}
              <p
                style={{
                  color: "#64748b",
                  fontSize: "14px",
                  margin: "0 0 16px 0",
                }}
              >
                {destination.duration}
              </p>

              {/* Icons Section */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: windowWidth < 640 ? "8px" : "16px",
                  marginBottom: "16px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <Plane
                    size={windowWidth < 640 ? 20 : 24}
                    style={{
                      color: "#64748b",
                      marginBottom: "8px",
                      display: "block",
                      margin: "0 auto 8px auto",
                    }}
                  />
                  <p
                    style={{
                      fontSize: windowWidth < 640 ? "11px" : "12px",
                      color: "#64748b",
                      margin: "0",
                      fontWeight: "500",
                      lineHeight: "1.2",
                    }}
                  >
                    {destination.flights}
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Building2
                    size={windowWidth < 640 ? 20 : 24}
                    style={{
                      color: "#64748b",
                      marginBottom: "8px",
                      display: "block",
                      margin: "0 auto 8px auto",
                    }}
                  />
                  <p
                    style={{
                      fontSize: windowWidth < 640 ? "11px" : "12px",
                      color: "#64748b",
                      margin: "0",
                      fontWeight: "500",
                      lineHeight: "1.2",
                    }}
                  >
                    {destination.hotels}
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Car
                    size={windowWidth < 640 ? 20 : 24}
                    style={{
                      color: "#64748b",
                      marginBottom: "8px",
                      display: "block",
                      margin: "0 auto 8px auto",
                    }}
                  />
                  <p
                    style={{
                      fontSize: windowWidth < 640 ? "11px" : "12px",
                      color: "#64748b",
                      margin: "0",
                      fontWeight: "500",
                      lineHeight: "1.2",
                    }}
                  >
                    {destination.transfers}
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Users
                    size={windowWidth < 640 ? 20 : 24}
                    style={{
                      color: "#64748b",
                      marginBottom: "8px",
                      display: "block",
                      margin: "0 auto 8px auto",
                    }}
                  />
                  <p
                    style={{
                      fontSize: windowWidth < 640 ? "11px" : "12px",
                      color: "#64748b",
                      margin: "0",
                      fontWeight: "500",
                      lineHeight: "1.2",
                    }}
                  >
                    {destination.activities}
                  </p>
                </div>
              </div>

              {/* Features List */}
              <ul
                style={{
                  listStyle: "none",
                  padding: "0",
                  margin: "0 0 20px 0",
                }}
              >
                {destination.features.map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      marginBottom: "6px",
                      paddingLeft: "12px",
                      position: "relative",
                      lineHeight: "1.4",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: "0",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "4px",
                        height: "4px",
                        backgroundColor: "#64748b",
                        borderRadius: "50%",
                      }}
                    ></span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Pricing */}
              <div
                style={{
                  display: "flex",
                  flexDirection: windowWidth < 640 ? "column" : "row",
                  alignItems: windowWidth < 640 ? "flex-start" : "center",
                  gap: windowWidth < 640 ? "8px" : "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    color: "#94a3b8",
                    textDecoration: "line-through",
                  }}
                >
                  {destination.originalPrice}
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: windowWidth < 640 ? "20px" : "24px",
                      fontWeight: "700",
                      color: "#1e293b",
                    }}
                  >
                    {destination.discountedPrice}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    Per person
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
