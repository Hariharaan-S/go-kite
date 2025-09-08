"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VisaDestinationCards = () => {
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
      // flightInfo: "30 Flight available starting at ₹29,000",
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
          Top Visa Destination
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
              maxWidth: windowWidth < 640 ? "400px" : "300px",
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              display: "flex",
              flexDirection: "column",
              height: getCardHeight(),
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
            {/* Image Container */}
            <div
              style={{
                position: "relative",
                height: getImageHeight(),
                backgroundImage: `url(${destination.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            >
              {/* Fast track overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  padding: windowWidth < 640 ? "4px 8px" : "6px 12px",
                  borderRadius: "20px",
                  fontSize: windowWidth < 640 ? "10px" : "12px",
                  fontWeight: "500",
                  color: "#333",
                  maxWidth: windowWidth < 640 ? "calc(100% - 100px)" : "auto",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Fast track{" "}
                {windowWidth < 640
                  ? destination.fastTrack.date.split(",")[0]
                  : destination.fastTrack.date}
              </div>

              {/* Price overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  padding: windowWidth < 640 ? "4px 8px" : "6px 12px",
                  borderRadius: "20px",
                  fontSize: windowWidth < 640 ? "11px" : "14px",
                  fontWeight: "bold",
                  color: "#333",
                  display: "flex",
                  flexDirection: windowWidth < 640 ? "column" : "row",
                  alignItems: windowWidth < 640 ? "flex-end" : "center",
                  gap: windowWidth < 640 ? "2px" : "4px",
                  lineHeight: windowWidth < 640 ? "1.2" : "normal",
                }}
              >
                {windowWidth < 640 ? (
                  <>
                    <div>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#999",
                          marginRight: "2px",
                        }}
                      >
                        {destination.fastTrack.originalPrice}
                      </span>
                      <span style={{ color: "#666" }}>
                        + {destination.fastTrack.discountPrice}
                      </span>
                    </div>
                    <span style={{ color: "#333", fontWeight: "bold" }}>
                      = {destination.fastTrack.totalPrice}
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "#999",
                        marginRight: "4px",
                      }}
                    >
                      {destination.fastTrack.originalPrice}
                    </span>
                    <span style={{ color: "#666", marginRight: "4px" }}>
                      + {destination.fastTrack.discountPrice}
                    </span>
                    <span style={{ color: "#333" }}>
                      = {destination.fastTrack.totalPrice}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Card Content */}
            <div
              style={{
                padding: windowWidth < 640 ? "16px" : "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              {/* Country Name */}
              <h3
                style={{
                  fontSize: getTitleSize(),
                  fontWeight: "bold",
                  color: "#333",
                  margin: "0 0 8px 0",
                  lineHeight: "1.3",
                }}
              >
                {destination.country}
              </h3>

              {/* Get On Info */}
              <div
                style={{
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    fontSize: windowWidth < 640 ? "14px" : "16px",
                    color: "#666",
                    lineHeight: "1.4",
                    marginBottom: "4px",
                  }}
                >
                  Get on{" "}
                  <span style={{ color: "#4FC3F7", fontWeight: "500" }}>
                    {windowWidth < 640
                      ? destination.getOn.date.split(",")[0]
                      : destination.getOn.date}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: windowWidth < 640 ? "18px" : "20px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {destination.getOn.price}
                </div>
              </div>

              {/* Flight Info (only for some cards) */}
              {destination.flightInfo && (
                <div
                  style={{
                    fontSize: windowWidth < 640 ? "12px" : "14px",
                    color: "#999",
                    marginTop: "8px",
                    lineHeight: "1.4",
                  }}
                >
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
