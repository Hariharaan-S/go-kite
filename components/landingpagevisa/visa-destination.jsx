"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../landingpage/styles/visa-destination.css";
import { useRouter } from "next/navigation";

const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds

// Authorization and claims headers (similar to popularvisa-card.jsx)
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

const VisaDestinationCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            pageId: 9, // Hardcoded page ID from the example
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

  // Fetch visa cards data for a specific section
  const fetchVisaCardsData = async (sectionId) => {
    try {
      const response = await fetch(
        "https://gokite-sit-b2c.convergentechnologies.com/api/cms/api/v2/list/custom/data/sections-visa-cards",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            pageSectionId: sectionId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch visa cards data");
      }

      const data = await response.json();
      return Array.isArray(data?.data) ? data.data : [];
    } catch (err) {
      console.error("Error fetching visa cards:", err);
      throw err;
    }
  };

  // Currency conversion (basic implementation, you might want to use a more robust solution)
  const convertCurrency = (amount, currency) => {
    // This is a placeholder. In a real app, you'd use a currency conversion API
    const exchangeRates = {
      AED: 20, // 1 AED = 20 INR (example rate)
      USD: 80, // 1 USD = 80 INR (example rate)
      // Add more currencies as needed
    };

    const rate = exchangeRates[currency] || 1;
    return Math.round(parseFloat(amount) * rate);
  };

  // Transform visa card data
  const transformVisaData = (apiData) => {
    const EXTRA_CHARGES = 8500; // Fixed extra charges

    return apiData.map((item) => {
      // Calculate get on date based on processing days
      const getOnDate = new Date();
      getOnDate.setDate(
        getOnDate.getDate() + parseInt(item.visaCardJson.processing_days || 10)
      );

      // Calculate total price
      const basePrice = parseFloat(item.newPrice);
      const totalPrice = basePrice + EXTRA_CHARGES;

      // Convert currency
      const convertedPrice = convertCurrency(totalPrice, item.currency);

      return {
        id: item.visaCardId,
        image: `/img/general/${item.visaCardJson.image}`, // Assuming images are stored in public/img/general/
        country: item.visaCardTitle,
        fastTrack: {
          originalPrice: `₹${basePrice.toFixed(2)}`,
          extraCharges: `₹${EXTRA_CHARGES}`,
          totalPrice: `₹${totalPrice.toFixed(2)}`,
          date: getOnDate.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        getOn: {
          date: getOnDate.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          price: `₹${basePrice.toFixed(2)}`, // Show only the original price
        },
        currency: item.currency,
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

        // Find the home visa section
        const homeVisaSection = sections.find(
          (section) =>
            section.title === "home-Visa-section" &&
            section.contentType === "VISA"
        );

        if (!homeVisaSection) {
          throw new Error("Home Visa section not found");
        }

        // Fetch visa cards for this section
        const visaCardsData = await fetchVisaCardsData(
          homeVisaSection.pageSectionId
        );

        // Transform and set destinations
        const transformedDestinations = transformVisaData(visaCardsData);
        setDestinations(transformedDestinations);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);

        // Fallback to default data if API fails
        setDestinations([
          {
            id: 1,
            image:
              "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop&crop=center",
            country: "United Arab Emirates",
            fastTrack: {
              originalPrice: "₹6500",
              extraCharges: "₹8500",
              totalPrice: "₹15000",
              date: "25 Mar, 11:02PM",
            },
            getOn: {
              date: "25 Mar, 11:02PM",
              price: "₹6,500",
            },
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Responsive window width update for style calculations
  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  // Style helpers
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
    return "400px";
  };

  const getTitleSize = () => {
    if (windowWidth < 640) return "20px";
    if (windowWidth < 768) return "22px";
    return "23px";
  };

  const getHeaderSize = () => {
    if (windowWidth < 640) return "28px";
    if (windowWidth < 768) return "32px";
    return "36px";
  };

  // Existing responsive and UI logic remains the same...
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

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev + visibleCards >= totalSlides ? 0 : prev + visibleCards
      );
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [visibleCards, totalSlides]);

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
  const router = useRouter();

  // Existing responsive style helpers remain the same...
  // (getContainerPadding, getCardWidth, getImageHeight, etc.)

  // Loading and error states
  if (loading) {
    return (
      <div className="visa-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading visa destinations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="visa-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Error loading destinations: {error}</p>
          <p>Showing default content...</p>
        </div>
      </div>
    );
  }

  // Render method remains mostly the same, with minor adjustments to use transformed data
  return (
    <div
      className="visa-container"
      style={{
        padding: `32px ${getContainerPadding()}`,
      }}
    >
      {/* Section header with navigation */}
      <div
        className="visa-header"
        style={{
          flexDirection: windowWidth < 640 ? "column" : "row",
          marginBottom: windowWidth < 640 ? "16px" : "32px",
          gap: windowWidth < 640 ? "16px" : "0",
          alignItems: windowWidth < 640 ? "flex-start" : "center",
        }}
      >
        <h1
          className="visa-header-title"
          style={{
            fontSize: getHeaderSize(),
          }}
        >
          Top Visa Destination
        </h1>
        <div className="visa-nav">
          <span
            className="visa-view-all"
            onClick={() => router.push("/visa-destinations")}
          >
            View All
          </span>
          <button
            className="visa-nav-button"
            style={{
              width: windowWidth < 768 ? "36px" : "40px",
              height: windowWidth < 768 ? "36px" : "40px",
            }}
            onClick={prevSlide}
          >
            <ChevronLeft size={windowWidth < 768 ? 16 : 18} />
          </button>
          <button
            className="visa-nav-button"
            style={{
              width: windowWidth < 768 ? "36px" : "40px",
              height: windowWidth < 768 ? "36px" : "40px",
            }}
            onClick={nextSlide}
          >
            <ChevronRight size={windowWidth < 768 ? 16 : 18} />
          </button>
        </div>
      </div>

      {/* Destinations Container */}
      <div
        className="visa-destinations-container"
        style={{
          gap: windowWidth < 640 ? "16px" : "24px",
          justifyContent: windowWidth < 640 ? "center" : "flex-start",
          paddingBottom: windowWidth < 640 ? "0" : "10px",
        }}
      >
        {visibleDestinations.map((destination) => (
          <div
            key={destination.id}
            className="visa-card"
            style={{
              width: getCardWidth(),
              minWidth: windowWidth < 640 ? "280px" : "250px",
              maxWidth: windowWidth < 640 ? "400px" : "300px",
              height: getCardHeight(),
              cursor: "pointer",
            }}
            onClick={() => router.push("/details-page")}
          >
            {/* Image Container */}
            <div
              className="visa-card-image"
              style={{
                height: getImageHeight(),
                backgroundImage: `url(${destination.image})`,
              }}
            >
              {/* Fast track overlay */}
              <div className="fast-track-overlay">
                Fast track{" "}
                {windowWidth < 640
                  ? destination.fastTrack.date.split(",")[0]
                  : destination.fastTrack.date}
                {windowWidth < 640 ? (
                  <div className="price-overlay">
                    <div>
                      <span className="extra-charges">
                        {destination.fastTrack.originalPrice}
                      </span>
                      <span className="extra-charges">
                        + {destination.fastTrack.extraCharges}
                      </span>
                    </div>
                    <span className="total-price">
                      = {destination.fastTrack.totalPrice}
                    </span>
                  </div>
                ) : (
                  <div className="price-overlay">
                    <span className="extra-charges">
                      {destination.fastTrack.originalPrice}
                    </span>
                    <span className="extra-charges">
                      + {destination.fastTrack.extraCharges}
                    </span>
                    <span className="total-price">
                      = {destination.fastTrack.totalPrice}
                    </span>
                  </div>
                )}
              </div>
              {/* Price overlay */}
            </div>

            {/* Card Content */}
            <div className="visa-card-content">
              {/* Country Name */}
              <h3
                className="visa-card-title"
                style={{ fontSize: getTitleSize(), marginBottom: "8px" }}
              >
                {destination.country}
              </h3>

              {/* Get On Info */}
              <div className="get-on-info">
                <div className="get-on-date">
                  Get on{" "}
                  <span className="get-on-date-highlight">
                    {windowWidth < 640
                      ? destination.getOn.date.split(",")[0]
                      : destination.getOn.date}
                  </span>
                </div>
                <div className="get-on-price">{destination.getOn.price}</div>
              </div>

              {/* Flight Info (only for some cards) */}
              {destination.flightInfo && (
                <div className="flight-info">
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
