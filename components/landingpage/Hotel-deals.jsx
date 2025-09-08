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

const HotelDealsCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [windowWidth, setWindowWidth] = useState(1024);

  // Update visible cards and window width based on screen size
  useEffect(() => {
    const updateResponsiveSettings = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

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

  // Compute the visible cards window with wrapping
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

  // Responsive helper functions
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
    if (windowWidth < 640) return "180px";
    if (windowWidth < 768) return "200px";
    return "220px";
  };

  const getCardHeight = () => {
    if (windowWidth < 640) return "auto";
    return "400px";
  };

  const getHeaderSize = () => {
    if (windowWidth < 640) return "28px";
    if (windowWidth < 768) return "32px";
    return "36px";
  };

  const getTitleSize = () => {
    if (windowWidth < 640) return "18px";
    if (windowWidth < 768) return "20px";
    return "20px";
  };

  const getCardPadding = () => {
    if (windowWidth < 640) return "16px";
    return "20px";
  };

  const HotelCard = ({ hotel }) => (
    <div
      style={{
        width: getCardWidth(),
        minWidth: windowWidth < 640 ? "280px" : "300px",
        maxWidth: windowWidth < 640 ? "400px" : "320px",
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
        height: getCardHeight(),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
      }}
    >
      {/* Image Container */}
      <div style={{ position: "relative", height: getImageHeight() }}>
        <img
          src={hotel.image}
          alt="Hotel Room"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: windowWidth < 640 ? "12px" : "16px",
            left: windowWidth < 640 ? "12px" : "16px",
            backgroundColor: "#ffffff",
            color: "#333333",
            fontSize: windowWidth < 640 ? "11px" : "12px",
            fontWeight: "600",
            padding: windowWidth < 640 ? "4px 8px" : "6px 12px",
            borderRadius: "20px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          Featured
        </div>
      </div>

      {/* Content Container */}
      <div
        style={{
          padding: getCardPadding(),
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        {/* Hotel Name */}
        <h3
          style={{
            fontSize: getTitleSize(),
            fontWeight: "700",
            color: "#1a1a1a",
            margin: "0 0 8px 0",
            lineHeight: "1.3",
          }}
        >
          {hotel.name}
        </h3>

        {/* Location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: windowWidth < 640 ? "12px" : "16px",
          }}
        >
          <MapPin
            size={windowWidth < 640 ? 14 : 16}
            style={{ color: "#10b981", marginRight: "6px" }}
          />
          <span
            style={{
              fontSize: windowWidth < 640 ? "13px" : "14px",
              color: "#10b981",
              fontWeight: "500",
            }}
          >
            {hotel.location}
          </span>
        </div>

        {/* Duration and Persons */}
        <div
          style={{
            display: "flex",
            flexDirection: windowWidth < 640 ? "column" : "row",
            gap: windowWidth < 640 ? "8px" : "24px",
            marginBottom: windowWidth < 640 ? "12px" : "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Clock
              size={windowWidth < 640 ? 14 : 16}
              style={{ color: "#6b7280", marginRight: "8px" }}
            />
            <span
              style={{
                fontSize: windowWidth < 640 ? "13px" : "14px",
                color: "#6b7280",
                fontWeight: "500",
              }}
            >
              {windowWidth < 640
                ? hotel.duration.replace(" Night", "N").replace(" Days", "D")
                : hotel.duration}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Users
              size={windowWidth < 640 ? 14 : 16}
              style={{ color: "#6b7280", marginRight: "8px" }}
            />
            <span
              style={{
                fontSize: windowWidth < 640 ? "13px" : "14px",
                color: "#6b7280",
                fontWeight: "500",
              }}
            >
              {hotel.persons}
            </span>
          </div>
        </div>

        {/* Price and Rating */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: windowWidth < 640 ? "flex-start" : "center",
            flexDirection: windowWidth < 480 ? "column" : "row",
            gap: windowWidth < 480 ? "8px" : "0",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
            <span
              style={{
                fontSize: windowWidth < 640 ? "11px" : "12px",
                color: "#9ca3af",
                fontWeight: "500",
              }}
            >
              From
            </span>
            <span
              style={{
                fontSize: windowWidth < 640 ? "20px" : "24px",
                fontWeight: "700",
                color: "#1a1a1a",
              }}
            >
              {hotel.price}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Star
              size={windowWidth < 640 ? 12 : 14}
              style={{ color: "#fbbf24", fill: "#fbbf24" }}
            />
            <span
              style={{
                fontSize: windowWidth < 640 ? "13px" : "14px",
                fontWeight: "600",
                color: "#1a1a1a",
              }}
            >
              {hotel.rating}
            </span>
            <span
              style={{
                fontSize: windowWidth < 640 ? "11px" : "12px",
                color: "#6b7280",
              }}
            >
              ({hotel.reviews}
              {windowWidth < 480 ? "" : " Reviews"})
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        padding: `32px ${getContainerPadding()}`,
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
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
            color: "#1a1a1a",
            margin: "0",
            lineHeight: "1.2",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Hotel Deals
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            flexShrink: 0,
          }}
        >
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              fontSize: "14px",
              color: "#666",
              cursor: "pointer",
              fontWeight: "500",
              transition: "color 0.2s ease",
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#1e293b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#666";
            }}
          >
            View All
          </button>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={prevSlide}
              style={{
                width: windowWidth < 768 ? "36px" : "40px",
                height: windowWidth < 768 ? "36px" : "40px",
                borderRadius: "50%",
                backgroundColor: "#000",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#374151";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#000";
              }}
            >
              <ChevronLeft
                size={windowWidth < 768 ? 16 : 18}
                style={{ color: "#ffffff" }}
              />
            </button>
            <button
              onClick={nextSlide}
              style={{
                width: windowWidth < 768 ? "36px" : "40px",
                height: windowWidth < 768 ? "36px" : "40px",
                borderRadius: "50%",
                backgroundColor: "#000",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#374151";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#000";
              }}
            >
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
        {visibleHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelDealsCards;
