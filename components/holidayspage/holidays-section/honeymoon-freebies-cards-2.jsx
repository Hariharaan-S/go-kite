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

 

// Authorization and claims headers (similar to recommendation-dest-2.jsx)
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

export default function HoneymoonFreebiesCards2({ customStyle }) {
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
            pageId: 11, // Same page ID as recommendation-dest-2.jsx
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

  // Fetch holiday cards data for a specific section
  const fetchHolidayCardsData = async (sectionId) => {
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
        throw new Error("Failed to fetch holiday cards data");
      }

      const data = await response.json();
      return Array.isArray(data?.data) ? data.data : [];
    } catch (err) {
      console.error("Error fetching holiday cards:", err);
      throw err;
    }
  };

  // Transform holiday data
  const transformHolidayData = (apiData) => {
    // Fallback images from the original destinations array
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

      // Use fallback image based on index
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

        // Find the third section (you may need to adjust this based on your API structure)
        const thirdSection = sections.find(
          (section) =>
            section.title === "Holiday-section-2" &&
            section.contentType === "HOLIDAY"
        );

        console.log(thirdSection);

        if (!thirdSection) {
          throw new Error("Holiday section 3 not found");
        }

        // Fetch holiday cards for this section
        const holidayCardsData = await fetchHolidayCardsData(
          thirdSection.pageSectionId
        );

        console.log(holidayCardsData);

        // Transform and set destinations
        const transformedDestinations = transformHolidayData(holidayCardsData);
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
  const router = useRouter();

  // Loading and error states
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Loading holiday destinations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Error loading holiday destinations: {error}</p>
        <p>Showing default content...</p>
      </div>
    );
  }

  const styles = `
        .recommendation-slider-section-3 {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 5rem;
}

/* 1440px */
@media screen and (max-width: 1440px) {
  .rec-slide-subsec-3 {
    margin-left: -8rem !important;
    column-gap: 18rem !important;
  }
  .dest2 {
    gap: 1.5rem !important;
  }
}

/* 1280px */
@media screen and (max-width: 1280px) {
  .rec-slide-subsec-3 {
    margin-left: 0 !important;
    column-gap: 0rem !important;
  }
  .rec-slide-subsec-3 h2 {
    margin-left: 4rem !important;
  }
  .button-group2 {
    margin-left: 10rem !important;
  }
  .dest2 {
    margin: 0 1rem 3rem 1rem !important;
    gap: 1.2rem !important;
  }
}

/* 1024px */
@media screen and (max-width: 1024px) {
  .dest2 {
    flex-direction: row !important;
    flex-wrap: wrap !important;
    gap: 1rem !important;
    margin: 2rem 4rem !important;
    align-items: center !important;
  }
}

/* 768px */
@media screen and (max-width: 768px) {
  .dest2 {
    flex-direction: row !important;
    flex-wrap: wrap !important;
    margin: 0 !important;
    gap: 2rem !important;
    align-items: start !important;
  }
}

/* 480px */
@media screen and (max-width: 480px) {
  .recommendation-slider-section-3 {
  display: none;
    margin-top: 1.2rem;
  }
  .dest2 {
    display: grid !important;
    grid-template-columns: repeat(1, 1fr) !important;
    align-items: center !important;
    justify-items: center !important;
    gap: 0.5rem !important;
    margin: 0 0 1rem 0 !important;
    overflow-x: visible !important;
  }
  .dest2 .card {
    width: 99vw !important;
    min-width: 100px !important;
    max-width: 99vw !important;
    padding: 0.3rem !important;
    font-size: 0.95rem !important;
  }
}
    `;

  return (
    <>
      <style>{styles}</style>
      {/* Section header with navigation */}
      <div className="recommendation-slider-section-3">
        {/* Destinations Container */}
        <div
          className="dest2"
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            alignItems: "stretch",
            paddingBottom: "10px",
            maxWidth: "100%",
            overflowX: "hidden",
            marginLeft: "0rem",
            marginBottom: "3rem",
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
                    height: "150px",
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
