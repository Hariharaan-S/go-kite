"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VISIBLE_CARDS = 4;

const VisaDestinationCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
      flightInfo: "30 Flight available starting at ₹29,000",
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

  // Compute the visible cards window with wrapping
  const getVisibleDestinations = () => {
    if (totalSlides <= VISIBLE_CARDS) return destinations;
    if (currentSlide + VISIBLE_CARDS <= totalSlides) {
      return destinations.slice(currentSlide, currentSlide + VISIBLE_CARDS);
    } else {
      return [
        ...destinations.slice(currentSlide),
        ...destinations.slice(0, (currentSlide + VISIBLE_CARDS) % totalSlides),
      ];
    }
  };

  const visibleDestinations = getVisibleDestinations();

  return (
    <div
      style={{
        padding: "40px 120px", // Increased horizontal padding
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Section header with navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#1e293b",
            margin: 0,
          }}
        >
          Top Visa Destination
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
              fontSize: "14px",
              color: "#666",
              cursor: "pointer",
            }}
          >
            View All
          </span>
          <button
            onClick={prevSlide}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "#000",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "#000",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Destinations Container */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          justifyContent: "center",
          alignItems: "stretch",
          paddingBottom: "10px",
          maxWidth: "100%",
          overflowX: "hidden",
        }}
      >
        {visibleDestinations.map((destination) => (
          <div
            key={destination.id}
            style={{
              width: "calc(25% - 18px)", // Ensure 4 cards per row
              minWidth: "250px", // Reduced from 280px
              maxWidth: "300px", // Added max-width for consistency
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              display: "flex",
              flexDirection: "column",
              height: "500px", // Kept original height
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
                height: "250px", // Increased image height
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
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Fast track {destination.fastTrack.date}
              </div>

              {/* Price overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
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
              </div>
            </div>

            {/* Card Content */}
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              {/* Country Name */}
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#333",
                  margin: "0 0 16px 0",
                }}
              >
                {destination.country}
              </h3>

              {/* Get On Info */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    color: "#666",
                  }}
                >
                  Get on{" "}
                  <span style={{ color: "#4FC3F7", fontWeight: "500" }}>
                    {destination.getOn.date}
                  </span>
                </span>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {destination.getOn.price}
                </span>
              </div>

              {/* Flight Info (only for some cards) */}
              {destination.flightInfo && (
                <div
                  style={{
                    fontSize: "14px",
                    color: "#999",
                    marginTop: "8px",
                  }}
                >
                  {destination.flightInfo}
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
