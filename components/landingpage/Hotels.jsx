"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import "./styles/hotels.css";
import { useRouter } from "next/navigation";
const PopularActivities = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [windowWidth, setWindowWidth] = useState(1024);

  const handleCardClick = (activityId) => {
    router.push(`/details-page?id=${activityId}`);
  };

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
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGE9Wo7WGtMH4f4c3FRNyBy0S1gLOCapfnnQ&s",
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
        "https://afar.brightspotcdn.com/dims4/default/e48cec9/2147483647/strip/true/crop/2294x1529+102+0/resize/900x600!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2F50%2F79%2F0aecc26b4af2919c8908975d30b8%2Fsource-dargent-at-la-digue-island-seychelles-zoltan-benyei-shutterstock.jpg",
      ],
      img: "https://afar.brightspotcdn.com/dims4/default/e48cec9/2147483647/strip/true/crop/2294x1529+102+0/resize/900x600!/quality/90/?url=https%3A%2F%2Fk3-prod-afar-media.s3.us-west-2.amazonaws.com%2Fbrightspot%2F50%2F79%2F0aecc26b4af2919c8908975d30b8%2Fsource-dargent-at-la-digue-island-seychelles-zoltan-benyei-shutterstock.jpg",
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

  // Helpers for dynamic class assignments based on window width
  const isMobile = windowWidth < 640;
  const isSmallTablet = windowWidth >= 640 && windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <div
      className="popular-activities-container"
      style={{
        paddingLeft: isMobile
          ? "16px"
          : isSmallTablet
          ? "24px"
          : isTablet
          ? "32px"
          : windowWidth < 1280
          ? "48px"
          : "96px",
      }}
    >
      {/* Header */}
      <div className={`header-container ${isMobile ? "header-mobile" : ""}`}>
        <h2 className="header-title">Popular Activities</h2>

        <div className="header-actions">
          <span
            className="view-all-text"
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1a1a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
          >
            View All
          </span>

          <button
            className="nav-button"
            onClick={prevSlide}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#374151")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#000")
            }
            style={{
              width: windowWidth < 768 ? "36px" : "40px",
              height: windowWidth < 768 ? "36px" : "40px",
            }}
          >
            <ChevronLeft size={windowWidth < 768 ? 16 : 18} />
          </button>

          <button
            className="nav-button"
            onClick={nextSlide}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#374151")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#000")
            }
            style={{
              width: windowWidth < 768 ? "36px" : "40px",
              height: windowWidth < 768 ? "36px" : "40px",
            }}
          >
            <ChevronRight size={windowWidth < 768 ? 16 : 18} />
          </button>
        </div>
      </div>

      {/* Cards Container */}
      <div
        className={`cards-container ${
          isMobile ? "cards-mobile" : "cards-desktop"
        }`}
      >
        {visibleActivities.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{
              minWidth: isMobile ? "280px" : "250px",
              maxWidth: isMobile ? "400px" : "300px",
              height: isMobile ? "auto" : isSmallTablet ? "420px" : "450px",
              width:
                visibleCards === 1
                  ? "100%"
                  : visibleCards === 2
                  ? "calc(50% - 12px)"
                  : visibleCards === 3
                  ? "calc(33.333% - 16px)"
                  : "calc(25% - 18px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
            onClick={() => handleCardClick(item.id)}
          >
            {/* Image Container */}
            <div
              className="image-container"
              style={{
                height: isMobile ? "180px" : isSmallTablet ? "190px" : "200px",
              }}
            >
              <img src={item.img} alt={item.title} className="activity-image" />

              {/* Country Flag */}
              <div
                className="country-flag"
                style={{
                  top: isMobile ? "12px" : "15px",
                  left: isMobile ? "12px" : "15px",
                }}
              >
                <span style={{ fontSize: isMobile ? "12px" : "14px" }}>
                  {item.countryFlag}
                </span>
              </div>

              {/* Duration Tag */}
              <div
                className="duration-tag"
                style={{
                  top: isMobile ? "12px" : "15px",
                  right: isMobile ? "12px" : "15px",
                  maxWidth: isMobile ? "80px" : "auto",
                  fontSize: isMobile ? "9px" : "10px",
                }}
              >
                {windowWidth < 480
                  ? item.tag.replace(" DAYS", "D").replace(" NIGHT", "N")
                  : item.tag}
              </div>

              {/* Heart Icon */}
              <button
                className="heart-button"
                style={{
                  bottom: isMobile ? "12px" : "15px",
                  right: isMobile ? "12px" : "15px",
                  width: isMobile ? "30px" : "35px",
                  height: isMobile ? "30px" : "35px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Heart size={isMobile ? 14 : 16} color="#666" />
              </button>
            </div>

            {/* Content */}
            <div
              className="card-content"
              style={{ padding: isMobile ? "16px" : "20px" }}
            >
              <div>
                <h4
                  className="card-title"
                  style={{
                    fontSize: isMobile
                      ? "14px"
                      : isSmallTablet
                      ? "15px"
                      : "16px",
                    height: isMobile ? "36px" : "44px",
                  }}
                >
                  {item.title}
                </h4>
                <p
                  className="card-location"
                  style={{
                    fontSize: isMobile ? "13px" : "14px",
                    height: "20px",
                  }}
                >
                  {item.location}
                </p>
                {/* Rating */}
                <div className="rating-container">
                  <div className="stars-container">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={isMobile ? 10 : 12}
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
                    className="review-count"
                    style={{ fontSize: isMobile ? "12px" : "13px" }}
                  >
                    ({item.numberOfReviews})
                  </span>
                </div>
              </div>

              {/* Price and Duration */}
              <div
                className="price-duration"
                style={{
                  flexDirection: windowWidth < 480 ? "column" : "row",
                  gap: windowWidth < 480 ? "8px" : "0",
                }}
              >
                <div
                  className="price"
                  style={{ fontSize: isMobile ? "18px" : "20px" }}
                >
                  ${item.price}
                </div>
                <div
                  className="duration"
                  style={{
                    fontSize: isMobile ? "11px" : "12px",
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
