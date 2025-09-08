"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";

const PopularActivities = () => {
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

  const activitiesData = [
    {
      id: 1,
      slideImg: [
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&crop=center",
      ],
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&crop=center",
      title: "The unique character as a symbol of taste of Turkey",
      location: "Istanbul, Turkey",
      country: "Turkey",
      countryFlag: "🇹🇷",
      ratings: "4.5",
      numberOfReviews: "3014",
      price: "1,500",
      duration: "7 days tour",
      tag: "4 DAYS / 5 NIGHT",
    },
    {
      id: 2,
      slideImg: [
        "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop&crop=center",
      ],
      img: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop&crop=center",
      title: "Experience the elegance of Paris Activity and Visit's",
      location: "Paris, France",
      country: "France",
      countryFlag: "🇫🇷",
      ratings: "4.8",
      numberOfReviews: "2345",
      price: "1,900",
      duration: "10 days tour",
      tag: "5 DAYS / 6 NIGHT",
    },
    {
      id: 3,
      slideImg: [
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop&crop=center",
      ],
      img: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop&crop=center",
      title: "Great Pyramid of Giza Adventure",
      location: "Cairo, Egypt",
      country: "Egypt",
      countryFlag: "🇪🇬",
      ratings: "4.7",
      numberOfReviews: "1852",
      price: "1,200",
      duration: "6 days tour",
      tag: "3 DAYS / 4 NIGHT",
    },
    {
      id: 4,
      slideImg: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
      ],
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
      title: "Tropical Paradise Island Getaway",
      location: "Maldives",
      country: "Maldives",
      countryFlag: "🇲🇻",
      ratings: "4.9",
      numberOfReviews: "2876",
      price: "2,200",
      duration: "8 days tour",
      tag: "6 DAYS / 7 NIGHT",
    },
    {
      id: 5,
      slideImg: [
        "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&h=300&fit=crop&crop=center",
      ],
      img: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&h=300&fit=crop&crop=center",
      title: "Ancient Temples and Cultural Heritage",
      location: "Kyoto, Japan",
      country: "Japan",
      countryFlag: "🇯🇵",
      ratings: "4.6",
      numberOfReviews: "1964",
      price: "1,650",
      duration: "9 days tour",
      tag: "4 DAYS / 5 NIGHT",
    },
  ];

  const totalSlides = activitiesData.length;

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
  const getVisibleActivities = () => {
    if (totalSlides <= visibleCards) return activitiesData;
    if (currentSlide + visibleCards <= totalSlides) {
      return activitiesData.slice(currentSlide, currentSlide + visibleCards);
    } else {
      return [
        ...activitiesData.slice(currentSlide),
        ...activitiesData.slice(0, (currentSlide + visibleCards) % totalSlides),
      ];
    }
  };

  const visibleActivities = getVisibleActivities();

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
    if (windowWidth < 768) return "190px";
    return "200px";
  };

  const getCardHeight = () => {
    if (windowWidth < 640) return "auto";
    if (windowWidth < 768) return "420px";
    return "450px";
  };

  const getHeaderSize = () => {
    if (windowWidth < 640) return "24px";
    if (windowWidth < 768) return "26px";
    return "28px";
  };

  const getTitleSize = () => {
    if (windowWidth < 640) return "14px";
    if (windowWidth < 768) return "15px";
    return "16px";
  };

  const getCardPadding = () => {
    if (windowWidth < 640) return "16px";
    return "20px";
  };

  const getPriceSize = () => {
    if (windowWidth < 640) return "18px";
    return "20px";
  };

  return (
    <div
      style={{
        padding: `32px ${getContainerPadding()}`,
        backgroundColor: "#f8f9fa",
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
          marginBottom: windowWidth < 640 ? "16px" : "30px",
          gap: windowWidth < 640 ? "16px" : "0",
        }}
      >
        <h2
          style={{
            fontSize: getHeaderSize(),
            fontWeight: "600",
            color: "#1a1a1a",
            margin: 0,
            lineHeight: "1.2",
          }}
        >
          Popular Activities
        </h2>
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
              e.currentTarget.style.color = "#1a1a1a";
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

      {/* Cards Container */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: windowWidth < 640 ? "16px" : "20px",
          justifyContent: windowWidth < 640 ? "center" : "flex-start",
          alignItems: "stretch",
          paddingBottom: windowWidth < 640 ? "0" : "10px",
          maxWidth: "100%",
        }}
      >
        {visibleActivities.map((item) => (
          <div
            key={item.id}
            style={{
              width: getCardWidth(),
              minWidth: windowWidth < 640 ? "280px" : "250px",
              maxWidth: windowWidth < 640 ? "400px" : "300px",
              height: getCardHeight(),
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            {/* Image Container */}
            <div
              style={{
                position: "relative",
                height: getImageHeight(),
                width: "100%",
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Country Flag */}
              <div
                style={{
                  position: "absolute",
                  top: windowWidth < 640 ? "12px" : "15px",
                  left: windowWidth < 640 ? "12px" : "15px",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  color: "white",
                  padding: windowWidth < 640 ? "4px 8px" : "5px 10px",
                  borderRadius: "15px",
                  fontSize: windowWidth < 640 ? "11px" : "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span style={{ fontSize: windowWidth < 640 ? "12px" : "14px" }}>
                  {item.countryFlag}
                </span>
              </div>

              {/* Duration Tag */}
              <div
                style={{
                  position: "absolute",
                  top: windowWidth < 640 ? "12px" : "15px",
                  right: windowWidth < 640 ? "12px" : "15px",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  color: "#666",
                  padding: windowWidth < 640 ? "4px 8px" : "5px 10px",
                  borderRadius: "4px",
                  fontSize: windowWidth < 640 ? "9px" : "10px",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                  maxWidth: windowWidth < 640 ? "80px" : "auto",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {windowWidth < 480
                  ? item.tag.replace(" DAYS", "D").replace(" NIGHT", "N")
                  : item.tag}
              </div>

              {/* Heart Icon */}
              <button
                style={{
                  position: "absolute",
                  bottom: windowWidth < 640 ? "12px" : "15px",
                  right: windowWidth < 640 ? "12px" : "15px",
                  width: windowWidth < 640 ? "30px" : "35px",
                  height: windowWidth < 640 ? "30px" : "35px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  zIndex: 10,
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Heart size={windowWidth < 640 ? 14 : 16} color="#666" />
              </button>
            </div>

            {/* Content */}
            <div
              style={{
                padding: getCardPadding(),
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: getTitleSize(),
                    fontWeight: "600",
                    color: "#1a1a1a",
                    margin: "0 0 8px 0",
                    lineHeight: "1.4",
                    height: windowWidth < 640 ? "36px" : "44px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: windowWidth < 640 ? "13px" : "14px",
                    color: "#666",
                    margin: "0 0 12px 0",
                    height: "20px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.location}
                </p>
                {/* Rating */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginBottom: windowWidth < 640 ? "12px" : "15px",
                    height: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={windowWidth < 640 ? 10 : 12}
                        fill={
                          star <= Math.floor(Number(item.ratings))
                            ? "#ffc107"
                            : "#e9ecef"
                        }
                        color={
                          star <= Math.floor(Number(item.ratings))
                            ? "#ffc107"
                            : "#e9ecef"
                        }
                      />
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: windowWidth < 640 ? "12px" : "13px",
                      color: "#666",
                      marginLeft: "4px",
                    }}
                  >
                    ({item.numberOfReviews})
                  </span>
                </div>
              </div>
              {/* Price and Duration */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: windowWidth < 480 ? "flex-start" : "center",
                  marginTop: "auto",
                  flexDirection: windowWidth < 480 ? "column" : "row",
                  gap: windowWidth < 480 ? "8px" : "0",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: getPriceSize(),
                      fontWeight: "700",
                      color: "#2196f3",
                    }}
                  >
                    ${item.price}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: windowWidth < 640 ? "11px" : "12px",
                    color: "#666",
                    textAlign: windowWidth < 480 ? "left" : "right",
                  }}
                >
                  {windowWidth < 640
                    ? item.duration.replace(" days", "d")
                    : item.duration}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularActivities;
