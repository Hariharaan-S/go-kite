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
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VISIBLE_CARDS = 4;

// Authorization and claims headers (similar to visa-destination.jsx)
const CLAIMS = {
  AUTHENTICATED: "true",
  org_id: "0631f265-d8de-4608-9622-6b4e148793c4",
  OTP_VERFICATION_REQD: "false",
  USER_ID: "0af402d1-98f0-18ae-8198-f493454d0001",
  refreshtoken: "false",
  client_ip: "14.99.174.62",
  USER_ID_LONG: "563",
  USER_NAME: "codetezteam@gmail.com",
  "authorized-domains":
    "b603f35d-9242-11f0-b493-fea20be86931, b603edb7-9242-11f0-b493-fea20be86931, b603e748-9242-11f0-b493-fea20be86931, b603d5d9-9242-11f0-b493-fea20be86931",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
};

export default function HolidaysSectionCards() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  const getAuthHeaders = () => {
    return {
      "Content-Type": "application/json",
      claims: JSON.stringify(CLAIMS),
    };
  };

  // Fetch sections data
  const fetchSectionsData = async () => {
    try {
      const sectionsResponse = await fetch(
        "https://gokite-sit-b2c.convergentechnologies.com/api/cms/api/v2/list/custom/data/pages-sections",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            pageId: 11, // Different page ID for holidays/recommendations
          }),
        }
      );

      if (!sectionsResponse.ok) {
        throw new Error("Failed to fetch sections data");
      }

      const sectionsData = await sectionsResponse.json();
      return sectionsData.data || [];
    } catch (err) {
      console.error("Error fetching sections:", err);
      throw err;
    }
  };

  // Fetch recommendation cards data for a specific section
  const fetchRecommendationCardsData = async (sectionId) => {
    try {
      const response = await fetch(
        "https://gokite-sit-b2c.convergentechnologies.com/api/cms/api/v2/list/custom/data/sections-holiday-cards",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            pageSectionId: sectionId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendation cards data");
      }

      const data = await response.json();
      return Array.isArray(data?.data) ? data.data : [];
    } catch (err) {
      console.error("Error fetching recommendation cards:", err);
      throw err;
    }
  };

  // Transform recommendation data
  const transformRecommendationData = (apiData) => {
    // Fallback images from recommendation-dest-2.jsx
    const fallbackImages = [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=250&fit=crop",
    ];

    return apiData.map((item, index) => {
      // Extract itinerary icons text safely
      const itineraryIcons = item.itineraryIcons || [];
      const flights = itineraryIcons[0]?.text || "2 Flights";
      const hotels = itineraryIcons[1]?.text || "1 Hotel";
      const transfers = itineraryIcons[2]?.text || "2 Transfers";
      const activities = itineraryIcons[3]?.text || "4 Activities";

      // Use heroImage if available, otherwise use fallback image based on index
      const imageUrl = fallbackImages[index % fallbackImages.length];

      return {
        id: item.sectionHolidayCardId,
        image: imageUrl,
        title: item.cardJson.packageName,
        rating: parseFloat(item.cardJson.packageRating || 4.5),
        duration: `${item.cardJson.days} Days ${item.cardJson.nights} Nights` || "3Days 4 Nights",
        flights: flights,
        hotels: hotels,
        transfers: transfers,
        activities: activities,
        features: item.cardJson.inclusions || [
          "Tour combo with return airport transfer",
          "City Tour",
          "Curious Corner",
        ],
        originalPrice: `${item.currency} ${parseFloat(item.oldPrice || 98952).toLocaleString()}`,
        discountedPrice: `${item.currency} ${parseFloat(item.newPrice || 88952).toLocaleString()}`,
        priceContent: item.cardJson.priceContent
      };
    });
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch sections first
        const sections = await fetchSectionsData();
        console.log(sections);


        // Find the beaches/recommendation section
        const holidaysSection = sections.find(
          (section) =>
            section.title === "Holiday-section-2" &&
            section.contentType === "HOLIDAY"
        );

        console.log(holidaysSection);


        if (!holidaysSection) {
          throw new Error("Holidays-section-2 section not found");
        }

        // Fetch recommendation cards for this section
        const recommendationCardsData = await fetchRecommendationCardsData(
          holidaysSection.pageSectionId
        );

        console.log(recommendationCardsData);

        // Transform and set destinations
        const transformedDestinations = transformRecommendationData(recommendationCardsData);
        setDestinations(transformedDestinations);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);

        // Fallback to default data if API fails
        setDestinations([
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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

  // Loading and error states
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Loading recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Error loading recommendations: {error}</p>
        <p>Showing default content...</p>
      </div>
    );
  }

  const styles = `
  .recommendation-slider-section-1 {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: -15rem;
  }

  .dest {
    display: flex;
    gap: 24px;
    justify-content: center;
    align-items: stretch;
    padding-bottom: 10px;
    max-width: 100%;
    overflow-x: hidden;
  }

  .card {
    width: calc(25% - 16px);
    min-width: 250px;
    max-width: 300px;
  }

  @media screen and (max-width: 1500px) {
      .recom-slid-section-1 {
        margin-top: 2rem !important;
        margin-left: 0 !important;
        column-gap: 60rem !important;
    }

  }

  /* 1440px */
  @media screen and (max-width: 1440px) {
    .recommendation-slider-section-1 {
      margin-top: 13rem;
    }
    .dest {
      gap: 18px;
      margin-left: 0 !important;
    }
    .card {
      width: calc(25% - 12px);
      min-width: 220px;
      max-width: 260px;
    }
  }

  /* 1280px */
  @media screen and (max-width: 1280px) {
    .recommendation-slider-section-1 {
      margin-top: -20rem;
    }

    .recom-slid-section-1 {
      margin-top: 5rem !important;
      margin-left: 0 !important;
      column-gap: 50rem !important;
    }

    .dest {
      gap: 14px;
      max-width: 90% !important;
    }
    .card {
      width: calc(33.33% - 10px);
      min-width: 200px;
      max-width: 240px;
    }
  }

  /* 1024px */
  @media screen and (max-width: 1024px) {
    .recommendation-slider-section-1 {
      margin-top: -15rem;
    }

    .recom-slid-section-1 {
      margin-top: 5rem !important;
      margin-left: 0 !important;
      column-gap: 40rem !important;
    }

    .dest {
      flex-wrap: wrap;
      gap: 8px;
      margin-left: 0;
      justify-content: center;
    }
    .card {
      width: 90vw;
      min-width: 150px;
      max-width: 98vw;
    }
  }

  /* 768px */
  @media screen and (max-width: 768px) {
    .recommendation-slider-section-1 {
      margin-top: -18rem;
    }

    .recom-slid-section-1 {
    margin-top: 5rem !important;
      margin-left: 0 !important;
      column-gap: 27rem !important;
    }
    .dest {
      flex-wrap: wrap;
      gap: 8px;
      margin-left: 0;
      justify-content: center;
    }
    .card {
      width: 90vw;
      min-width: 150px;
      max-width: 98vw;
    }
    .heading {
      font-size: 1.6rem;
    }
    .prev-btn, .next-btn {
      width: 35px !important;
      height: 30px !important;
    }
  }

  /* 400px */
  @media screen and (max-width: 400px) {
    .recommendation-slider-section-1 {
      margin-top: -16rem;
      height: auto;
    }

      .recom-slid-section-1 {
    margin-top: 7rem !important;
      margin-left: 0 !important;
      column-gap: 12rem !important;
    }
    .dest {
      display: grid !important;
      grid-template-columns: 1fr !important;
      gap: 6px !important;
      margin-left: 3rem !important;
    }
    .card {
      width: 98vw !important;
      min-width: 120px;
      max-width: 99vw;
      padding: 0;
    }
    .heading {
      font-size: 1.5rem;
    }
    .button-group {
      gap: 1px;
    }
    .view-all-btn {
      display: none !important;
    }
    .prev-btn, .next-btn {
      width: 32px !important;
      height: 32px !important;
    }
  }
`;
  const router = useRouter();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <style>{styles}</style>
      {/* Section header with navigation */}
      <div className="recommendation-slider-section-1">
        <div
          className="recom-slid-section-1"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            marginLeft: "2rem",
            marginTop: "3rem",
            columnGap: "67rem",
            marginBottom: "2rem",
          }}
        >
          <h2
            className="heading"
            style={{
              color: "#FFFFFF",
              position: "relative",
              marginLeft: "1.2rem",
            }}
          >
            Beaches
          </h2>
          <div
            className="button-group"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <button
              className="view-all-btn"
              style={{
                width: "100%",
                height: "60%",
                borderRadius: "20px",
                border: "none",
                backgroundColor: "#FFFFFF",
                color: "black",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 22px",
                fontSize: ".8rem",
              }}
              onClick={() => router.push("/holiday_list_grid_new")}
            >
              View All
            </button>

          </div>
        </div>

        {/* Destinations Container */}
        <div
          className="dest"
          style={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Slider ref={sliderRef} {...sliderSettings} style={{ width: "90%" }}>
          {destinations.map((destination) => (
            <div
              className="card"
              key={destination.id}
              style={{
                width: "calc(25% - 16px)", // Changed from calc(33.33% - 16px)
                minWidth: "330px", // Reduced from 320px
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
              <div style={{ position: "relative", padding: '16px' }}>
                <img
                  src={destination.image}
                  alt={destination.title}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    borderRadius: "16px",
                  }}
                />
                <button
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
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
                    height: "150px"
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
                      fontSize: "18px",
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
                    {destination.priceContent}
                  </span>
                </div>
              </div>
            </div>
          ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
