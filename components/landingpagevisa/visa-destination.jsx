"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../landingpage/styles/visa-destination.css";
import { useRouter } from "next/navigation";
import { usePageContext } from "../common/PageContext";

const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds

const FALLBACK_IMAGE = "/img/general/fallback-image.jpg";

// Helper to read cookie on client
function getCookie(name) {
  if (typeof document === "undefined") return "";
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : "";
}

const VisaDestinationCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getPageIdWithFallback, loading: pageLoading } = usePageContext();
  const getAuthHeaders = () => {
    const token = getCookie("accesstoken");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  // Fetch sections data (replicating token-based sections flow)
  const fetchSectionsData = async () => {
    console.log("VISA destination page landing page id", getPageIdWithFallback("landing"));

    try {
      const sectionsResponse = await fetch("/api/cms/pages-sections", {
        method: "POST",
        // headers: getAuthHeaders(),
        body: JSON.stringify({
          pageId: getPageIdWithFallback("landing"),
        }),
      });

      if (!sectionsResponse.ok) {
        throw new Error("Failed to fetch sections data");
      }

      const sectionsData = await sectionsResponse.json();
      console.log("VISA Destination section data", sectionsData);

      return sectionsData.data || [];
    } catch (err) {
      console.error("Error fetching sections:", err);
      throw err;
    }
  };

  // Fetch visa cards data for a specific section
  const fetchVisaCardsData = async (sectionId) => {
    console.log("VISA Section id", sectionId);

    try {
      const response = await fetch("/api/cms/sections-visa-cards", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          pageSectionId: sectionId,
          limitValue: 10,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch visa cards data");
      }

      const data = await response.json();
      console.log("data");
      console.log(data);
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
      const oldPrice = parseFloat(item.oldPrice);
      const totalPrice = basePrice + EXTRA_CHARGES;

      // Convert currency
      const convertedPrice = convertCurrency(totalPrice, item.currency);

      // Generate image URL using the proxy endpoint
      const getImageUrl = (imageName) => {
        if (!imageName) return FALLBACK_IMAGE;
        return `/api/cms/file-download?image=${encodeURIComponent(imageName)}`;
      };

      return {
        id: item.visaCardId,
        image: getImageUrl(item?.visaCardJson?.image),
        country: item.visaCardTitle,
        fastTrack: {
          originalPrice: `₹${Math.round(oldPrice)}`, // Remove decimal places
          extraCharges: `₹${EXTRA_CHARGES}`,
          totalPrice: `₹${Math.round(totalPrice)}`, // Remove decimal places
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
          price: `₹${Math.round(basePrice)}`, // Remove decimal places
        },
        currency: item.currency,
        expiryDate: item.expiryDate,
      };
    });
  };

  // Load data on component mount
  useEffect(() => {
    // Wait for page context to load before fetching data
    if (pageLoading) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch sections first
        const sections = await fetchSectionsData();
        console.log(sections);

        // Find a relevant VISA section (prefer "popular-visa", else first VISA section)
        const preferredVisaSection =
          sections.find(
            (section) =>
              section.title === "home-Visa-section" &&
              section.contentType === "VISA"
          ) || sections.find((section) => section.contentType === "VISA");

        if (!preferredVisaSection) {
          throw new Error("Visa destination section not found");
        }
        console.log("preferredVisaSection");
        console.log(preferredVisaSection);

        // Fetch visa cards for this section
        const visaCardsData = await fetchVisaCardsData(
          preferredVisaSection.pageSectionId
        );
        console.log(visaCardsData);
        // Transform and set destinations
        const transformedDestinations = transformVisaData(visaCardsData);
        setDestinations(transformedDestinations);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);


      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [pageLoading, getPageIdWithFallback]); // Re-run when page context loads

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
    if (visibleCards === 1) return "95%";
    if (visibleCards === 2) return "calc(50% - 12px)";
    if (visibleCards === 3) return "calc(33.333% - 16px)";
    return "calc(22% - 18px)";
  };

  const getImageHeight = () => {
    if (windowWidth < 640) return "200px";
    if (windowWidth < 768) return "220px";
    return "320px";
  };

  const getCardHeight = () => {
    if (windowWidth < 640) return "auto";
    return "450px";
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
      <div className="landing-visa-dest-container landing-visa-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading visa destinations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="landing-visa-dest-container landing-visa-container">
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
      className="landing-visa-dest-container landing-visa-container"
      style={{
        padding: `12px ${getContainerPadding()}`,
        paddingBottom: 8,
        marginBottom: 8,
      }}
    >
      {/* Section header with navigation */}
      <div
        className="landing-visa-dest-header landing-visa-header"
        style={{
          flexDirection: windowWidth < 640 ? "column" : "row",
          marginBottom: windowWidth < 640 ? "16px" : "32px",
          gap: windowWidth < 640 ? "16px" : "0",
          alignItems: windowWidth < 640 ? "flex-start" : "center",
        }}
      >
        <h1
          className="landing-visa-dest-header-title landing-visa-header-title"
          style={{
            fontSize: getHeaderSize(),
          }}
        >
          Top Visa Destination
        </h1>
        <div className="landing-visa-dest-nav landing-visa-nav">
          <span
            className="landing-visa-dest-view-all landing-visa-view-all"
            onClick={() => router.push("/visa-destinations")}
          >
            View All
          </span>
          <button
            className="landing-visa-dest-nav-button landing-visa-nav-button"
            style={{
              width: windowWidth < 768 ? "36px" : "40px",
              height: windowWidth < 768 ? "36px" : "40px",
            }}
            onClick={prevSlide}
          >
            <ChevronLeft size={windowWidth < 768 ? 16 : 18} />
          </button>
          <button
            className="landing-visa-dest-nav-button landing-visa-nav-button"
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
        className="landing-visa-dest-destinations-container landing-visa-destinations-container"
        style={{
          gap: windowWidth < 640 ? "16px" : "24px",
          justifyContent: windowWidth < 640 ? "center" : "flex-start",
          paddingBottom: windowWidth < 640 ? "0" : "10px",
        }}
      >
        {visibleDestinations.map((destination) => (
          <div
            key={destination.id}
            className="landing-visa-dest-card landing-visa-card"
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
              className="landing-visa-dest-card-image landing-visa-card-image"
              style={{
                height: getImageHeight(),
                overflow: "hidden",
              }}
            >
              <img
                src={destination.image}
                alt={destination.country}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                onLoad={(e) => {
                  // Image loaded successfully
                  console.log(`Image loaded for ${destination.country}`);
                }}
              />
              {/* Fast track overlay */}
              <div className="landing-visa-dest-fast-track-overlay fast-track-overlay">
                Fast track{" "}
                {windowWidth < 640
                  ? destination.fastTrack.date.split(",")[0]
                  : destination.fastTrack.date}
                {windowWidth < 640 ? (
                  <div className="landing-visa-dest-price-overlay price-overlay">
                    <div>
                      <span className="landing-visa-dest-extra-charges extra-charges">
                        {destination.fastTrack.originalPrice}
                      </span>
                      <span className="landing-visa-dest-extra-charges extra-charges">
                        + {destination.fastTrack.extraCharges}
                      </span>
                    </div>
                    <span className="landing-visa-dest-total-price total-price">
                      = {destination.fastTrack.totalPrice}
                    </span>
                  </div>
                ) : (
                  <div className="landing-visa-dest-price-overlay price-overlay">
                    <span className="landing-visa-dest-extra-charges extra-charges">
                      {destination.fastTrack.originalPrice}
                    </span>
                    <span className="landing-visa-dest-extra-charges extra-charges">
                      + {destination.fastTrack.extraCharges}
                    </span>
                    <span className="landing-visa-dest-total-price total-price">
                      = {destination.fastTrack.totalPrice}
                    </span>
                  </div>
                )}
              </div>
              {/* Price overlay */}
            </div>

            {/* Card Content */}
            <div className="landing-visa-dest-card-content landing-visa-card-content">
              {/* Country Name */}
              <h3
                className="landing-visa-dest-card-title landing-visa-card-title"
                style={{ fontSize: getTitleSize(), marginBottom: "8px" }}
              >
                {destination.country}
              </h3>

              {/* Get On Info */}
              <div className="landing-visa-dest-get-on-info get-on-info">
                <div className="landing-visa-dest-get-on-date get-on-date">
                  Get on{" "}
                  <span className="landing-visa-dest-get-on-date-highlight get-on-date-highlight">
                    {windowWidth < 640
                      ? destination.getOn.date.split(",")[0]
                      : destination.getOn.date}
                  </span>
                </div>
                <div className="landing-visa-dest-get-on-price get-on-price">{destination.getOn.price}</div>
              </div>

              {/* Flight Info (only for some cards) */}
              {destination.flightInfo && (
                <div className="landing-visa-dest-flight-info flight-info">
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