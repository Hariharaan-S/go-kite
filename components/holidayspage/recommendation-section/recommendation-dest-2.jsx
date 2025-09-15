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
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const VISIBLE_CARDS = 4;

export default function RecommendationDestinations2() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    {
      id: 6,
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
    {
      id: 7,
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
  const router = useRouter();
  const styles = `
  .recommendation-slider-section-2 {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 20rem;
  }
  .rec-slide-subsec-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-left: -8rem;
    margin-top: 20rem;
    column-gap: 42rem;
    margin-bottom: 2rem;
  }
  .heading1 {
    color: #000;
    position: relative;
    font-size: 2.2rem;
  }
  .button-group1 {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .dest1 {
    display: flex;
    gap: 24px;
    justify-content: center;
    align-items: stretch;
    padding-bottom: 10px;
    max-width: 100%;
    overflow-x: hidden;
    margin-left: -1rem;
  }
  .card {
    width: calc(25% - 16px);
    min-width: 250px;
    max-width: 300px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  /* 1440px */
  @media screen and (max-width: 1440px) {
    .recommendation-slider-section-2 {
      margin-top: 5rem;
    }
    .rec-slide-subsec-2 {
      margin-left: -4rem;
      column-gap: 18rem;
      margin-top: 10rem;
    }
    .dest1 {
      gap: 18px;
      margin-left: 0;
    }
    .card {
      width: calc(25% - 12px);
      min-width: 220px;
      max-width: 260px;
    }
    .heading1 {
      font-size: 2rem;
    }
  }

  /* 1280px */
  @media screen and (max-width: 1280px) {
    .recommendation-slider-section-2 {
      margin-top: 12rem;
    }
    .rec-slide-subsec-2 {
      margin-left: 0;
      column-gap: 39rem !important;
    }
    .dest1 {
      column-gap: 14px;
      flex-wrap: wrap;
      margin-left: .5rem !important;
    }
    .card {
      width: calc(33.33% - 10px);
      min-width: 200px;
      max-width: 220px;
    }
    .heading1 {
      font-size: 1.7rem;
    }
  }

  /* 1024px */
  @media screen and (max-width: 1024px) {
    .recommendation-slider-section-2 {
      margin-top: 60rem;
    }
    .rec-slide-subsec-2 {
      flex-direction: row;
      column-gap: 20rem !important;
    }
    .heading1 {
      font-size: 1.7rem;
      margin-left: 5rem;
    }
    .button-group1 {
      margin-left: 0;
      margin-top: 0.5rem;
    }
    .dest1 {
      gap: 10px;
      margin-left: 0;
      flex-wrap: wrap;
    }
    .card {
      width: calc(50% - 10px);
      min-width: 160px;
      max-width: 98vw;
    }
  }

  /* 768px */
  @media screen and (max-width: 768px) {
    .recommendation-slider-section-2 {
      margin-top: 50rem;
    }
    .rec-slide-subsec-2 {
      column-gap: 12rem !important;
      flex-direction: row;
      margin-left: 0rem !important;
    }
    .heading1 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    .button-group1 {
      margin-left: 0;
      margin-top: 0.5rem;
    }
    .dest1 {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 8px;
      margin-left: 1rem !important;
      align-items: center;
    }
    .card {
      width: 95vw !important;
      min-width: 120px;
      max-width: 98vw;
      padding: 0;
    }
  }

  /* 480px */
  @media screen and (max-width: 480px) {
    .recommendation-slider-section-2 {
      margin-top: 1rem;
    }
    .rec-slide-subsec-2 {
      flex-direction: column;
      align-items: flex-start;
      margin-left: 0;
      column-gap: 0;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .heading1 {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    .button-group1 {
      margin-left: 0;
      margin-top: 0.5rem;
    }
    .dest1 {
      flex-direction: column;
      gap: 6px;
      margin-left: 0;
      align-items: center;
    }
    .card {
      width: 98vw !important;
      min-width: 100px;
      max-width: 99vw;
      padding: 0;
    }
  }
`;

  return (
    <>
      <style>{styles}</style>
      {/* Section header with navigation */}
      <div className="recommendation-slider-section-2">
        <div
          className="rec-slide-subsec-2"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            marginLeft: "-8rem",
            marginTop: "20rem",
            columnGap: "42rem",
            marginBottom: "2rem",
          }}
        >
          <h2
            className="heading1"
            style={{ color: "#000", position: "relative" }}
          >
            Honeymoon Freebies Special
          </h2>
          <div
            className="button-group1"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <button
              className="prev-btn1"
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
              className="next-btn1"
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
          className="dest1"
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            alignItems: "stretch",
            paddingBottom: "10px",
            maxWidth: "100%",
            overflowX: "hidden",
            marginLeft: "-1rem",
          }}
        >
          {visibleDestinations.map((destination) => (
            <div
              className="card"
              key={destination.id}
              style={{
                width: "calc(25% - 16px)", // Changed from calc(33.33% - 16px)
                minWidth: "250px", // Reduced from 320px
                maxWidth: "300px", // Added max-width for consistency
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                position: "relative",
                display: "flex",
                flexDirection: "column",
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
              onClick={() => router.push("/trip-details")}
            >
              {/* Image Section */}
              <div style={{ position: "relative" }}>
                <img
                  src={destination.image}
                  alt={destination.title}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
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
                    width: "40px",
                    height: "40px",
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
                  <Heart size={20} style={{ color: "#64748b" }} />
                </button>
              </div>

              {/* Content Section */}
              <div
                style={{
                  padding: "20px",
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
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#1e293b",
                      margin: "0",
                    }}
                  >
                    {destination.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span style={{ color: "#fbbf24", fontSize: "18px" }}>
                      ★
                    </span>
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
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "16px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Plane
                      size={24}
                      style={{
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "#64748b",
                        margin: 0,
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {destination.flights}
                    </p>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Building2
                      size={24}
                      style={{
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "#64748b",
                        margin: 0,
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {destination.hotels}
                    </p>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Car
                      size={24}
                      style={{
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "#64748b",
                        margin: 0,
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {destination.transfers}
                    </p>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Users
                      size={24}
                      style={{
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "#64748b",
                        margin: 0,
                        fontWeight: "500",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
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
                    alignItems: "center",
                    gap: "12px",
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
                  <span
                    style={{
                      fontSize: "24px",
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
          ))}
        </div>
      </div>
    </>
  );
}
