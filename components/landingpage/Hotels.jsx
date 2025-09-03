"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";

const VISIBLE_CARDS = 4;

const PopularActivities = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const activitiesData = [
    {
      id: 1,
      slideImg: [
        "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      ],
      img: "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
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
        "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      ],
      img: "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      title: "Experience the elegance of Paris Activity and Visit's",
      location: "Paris, France",
      country: "France",
      countryFlag: "🇫🇷",
      ratings: "4.8",
      numberOfReviews: "2345",
      price: "1,900",
      duration: "10 days tour",
      tag: "4 DAYS / 5 NIGHT",
    },
    {
      id: 3,
      slideImg: [
        "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      ],
      img: "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      title: "Great Pyramid of",
      location: "Egypt",
      country: "Egypt",
      countryFlag: "🇪🇬",
      ratings: "4.7",
      numberOfReviews: "1852",
      price: "1,500",
      duration: "10 days tour",
      tag: "4 DAYS / 5 NIGHT",
    },
    {
      id: 4,
      slideImg: [
        "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      ],
      img: "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      title: "Great Pyramid of",
      location: "Egypt",
      country: "Egypt",
      countryFlag: "🇪🇬",
      ratings: "4.7",
      numberOfReviews: "1852",
      price: "1,500",
      duration: "10 days tour",
      tag: "4 DAYS / 5 NIGHT",
    },
    {
      id: 5,
      slideImg: [
        "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      ],
      img: "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      title: "Great Pyramid of",
      location: "Egypt",
      country: "Egypt",
      countryFlag: "🇪🇬",
      ratings: "4.7",
      numberOfReviews: "1852",
      price: "1,500",
      duration: "10 days tour",
      tag: "4 DAYS / 5 NIGHT",
    },
  ];

  const totalSlides = activitiesData.length;

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
  const getVisibleActivities = () => {
    if (totalSlides <= VISIBLE_CARDS) return activitiesData;
    if (currentSlide + VISIBLE_CARDS <= totalSlides) {
      return activitiesData.slice(currentSlide, currentSlide + VISIBLE_CARDS);
    } else {
      return [
        ...activitiesData.slice(currentSlide),
        ...activitiesData.slice(
          0,
          (currentSlide + VISIBLE_CARDS) % totalSlides
        ),
      ];
    }
  };

  const visibleActivities = getVisibleActivities();

  return (
    <div
      style={{
        padding: "40px 20px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#1a1a1a",
            margin: 0,
          }}
        >
          Popular Activities
        </h2>
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

      {/* Cards Container */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center", // Center the cards
          alignItems: "stretch",
          paddingBottom: "10px",
          maxWidth: "100%", // Ensure full width usage
          overflowX: "hidden", // Prevent horizontal scrolling
        }}
      >
        {visibleActivities.map((item) => (
          <div
            key={item.id}
            style={{
              width: "calc(25% - 15px)", // Adjust width for 4 cards with gap
              minWidth: "250px", // Minimum width to prevent overcrowding
              maxWidth: "280px", // Maximum width to maintain consistency
              height: "450px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              position: "relative",
              justifyContent: "space-between",
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
                height: "200px",
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
                  top: "15px",
                  left: "15px",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span style={{ fontSize: "14px" }}>{item.countryFlag}</span>
              </div>

              {/* Duration Tag */}
              <div
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  color: "#666",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  fontSize: "10px",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                }}
              >
                {item.tag}
              </div>

              {/* Heart Icon */}
              <button
                style={{
                  position: "absolute",
                  bottom: "15px",
                  right: "15px",
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  zIndex: 10,
                }}
              >
                <Heart size={16} color="#666" />
              </button>
            </div>

            {/* Content */}
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#1a1a1a",
                    margin: "0 0 8px 0",
                    lineHeight: "1.4",
                    height: "44px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                    wordBreak: "break-word",
                    lineClamp: 2,
                    maxHeight: "44px",
                    whiteSpace: "normal",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    margin: "0 0 15px 0",
                    height: "20px",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    wordBreak: "break-word",
                    lineClamp: 1,
                    maxHeight: "20px",
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
                    marginBottom: "15px",
                    height: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
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
                </div>
              </div>
              {/* Price and Duration */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "auto",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#2196f3",
                    }}
                  >
                    ${item.price}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  {item.duration}
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
