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
import React, { useState, useEffect } from "react";
import "../landingpage/styles/holiday-destination.css";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePageContext } from "../common/PageContext";

const FALLBACK_IMAGE = "/img/general/fallback-image.jpg";

// Helper to read cookie on client
function getCookie(name) {
  if (typeof document === "undefined") return "";
  console.log("document.cookie");
  console.log(document.cookie);
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : "";
}

// Helper function to get slider settings
function getSliderSettings(windowWidth, itemCount = 1) {
  let slidesToShow = 4;
  if (windowWidth < 640) {
    slidesToShow = 1;
  } else if (windowWidth < 768) {
    slidesToShow = 2;
  } else if (windowWidth < 1024) {
    slidesToShow = 3;
  }

  const count = Math.max(1, itemCount);
  const normalizedSlidesToShow = Math.min(slidesToShow, count);
  const shouldLoop = count > normalizedSlidesToShow;
  const shouldAutoplay = count > 1;
  const isSingle = count === 1;

  const settings = {
    dots: false,
    infinite: shouldLoop,
    speed: 500,
    slidesToShow: normalizedSlidesToShow,
    slidesToScroll: 1,
    autoplay: shouldAutoplay,
    autoplaySpeed: 3000,
    centerPadding: isSingle ? "0px" : "0px",
    variableWidth: isSingle ? true : false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, count),
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, count),
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: Math.min(1, count),
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return settings;
}

export default function HolidayDestinations() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [windowWidth, setWindowWidth] = useState(1024);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sliderSettings, setSliderSettings] = useState(
    getSliderSettings(windowWidth, 1)
  );
  const router = useRouter();
  const { getPageIdWithFallback, loading: pageLoading } = usePageContext();



  const getAuthHeaders = () => {
    const token = getCookie("accesstoken");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    console.log(`Bearer ${token}`);
    return headers;
  };

  // Fetch sections data
  const fetchSectionsData = async () => {
    console.log("Landing Page ID: ", getPageIdWithFallback("landing"));
    try {
      const sectionsResponse = await fetch("/api/cms/pages-sections", {
        method: "POST",
        // headers: getAuthHeaders(),
        body: JSON.stringify({
          pageId: getPageIdWithFallback("landing"), // Use dynamic page ID with fallback
        }),
      });

      if (!sectionsResponse.ok) {
        throw new Error("Failed to fetch sections data");
      }

      const sectionsData = await sectionsResponse.json();
      console.log("Landing page Section data ", sectionsData);

      return sectionsData.data || [];
    } catch (err) {
      console.error("Error fetching sections:", err);
      throw err;
    }
  };

  // Fetch holiday cards data for a specific section
  const fetchHolidayCardsData = async (sectionId) => {
    try {
      const response = await fetch("/api/cms/sections-holiday-cards", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          pageSectionId: sectionId,
          limitValue: 10,
        }),
      });

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

  // Currency conversion and formatting
  const convertAndFormatCurrency = (amount, currency) => {
    const exchangeRates = {
      AED: 20, // 1 AED = 20 INR (example rate)
      USD: 80, // 1 USD = 80 INR (example rate)
      INR: 1, // 1 INR = 1 INR
    };

    const rate = exchangeRates[currency] || 1;
    const convertedAmount = Math.round(parseFloat(amount) * rate);

    // Format price based on currency
    switch (currency) {
      case "AED":
        return `${convertedAmount.toFixed(2)} ${currency}`;
      case "INR":
      default:
        return `₹${convertedAmount.toFixed(2)}`;
    }
  };

  // Transform holiday card data
  const transformHolidayData = (apiData) => {
    return apiData.map((item) => {
      // Convert prices
      const oldPrice = parseFloat(item.oldPrice);
      const newPrice = parseFloat(item.newPrice);

      // Generate image URL using the proxy endpoint
      const getImageUrl = (imageName) => {
        if (!imageName) return FALLBACK_IMAGE;
        return `/api/cms/file-download?image=${encodeURIComponent(imageName)}`;
      };

      return {
        id: item.holidayCardId,
        holidayId: item.holidayCardId, // Add this line
        image: getImageUrl(item?.cardJson?.heroImage),
        title: item.title,
        rating: parseFloat(item.packageRating),
        duration: `${item.noOfDays} Days ${item.noOfNights} Nights`,
        flights:
          item.cardJson.itineraryIcons.find((icon) =>
            icon.text.includes("Flight")
          )?.text || "2 Flights",
        hotels:
          item.cardJson.itineraryIcons.find(
            (icon) =>
              icon.text.includes("Hotel") || icon.text.includes("Accomodation")
          )?.text || "1 Hotel",
        transfers:
          item.cardJson.itineraryIcons.find(
            (icon) =>
              icon.text.includes("Transfer") || icon.text.includes("Cars")
          )?.text || "2 Transfers",
        activities:
          item.cardJson.itineraryIcons.find((icon) =>
            icon.text.includes("Activities")
          )?.text || "4 Activities",
        features: item.cardJson.inclusions || [],
        originalPrice: convertAndFormatCurrency(oldPrice, item.currency),
        discountedPrice: convertAndFormatCurrency(newPrice, item.currency),
        currency: item.currency,
        cityName: item.cityName,
        categoryName: item.categoryName,
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
        console.log("holidays sections");
        console.log(sections);

        // Find the holiday destinations section
        const holidaySection = sections.find(
          (section) =>
            section.title === "Popular Holiday Destination" &&
            section.contentType === "HOLIDAY"
        );

        if (!holidaySection) {
          throw new Error("Holiday destinations section not found");
        }

        // Fetch holiday cards for this section
        const holidayCardsData = await fetchHolidayCardsData(
          holidaySection.pageSectionId
        );

        console.log("holidays cards data");
        console.log(holidayCardsData);

        // Transform and set destinations
        const transformedDestinations = transformHolidayData(holidayCardsData);
        setDestinations(transformedDestinations);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);
        setDestinations([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [pageLoading, getPageIdWithFallback]); // Re-run when page context loads

  // Existing responsive and UI logic
  useEffect(() => {
    const updateSliderSettings = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setSliderSettings(getSliderSettings(width, destinations.length));
    };

    updateSliderSettings();
    window.addEventListener("resize", updateSliderSettings);
    return () => window.removeEventListener("resize", updateSliderSettings);
  }, [destinations.length]);

  // Don't render the component if loading, has error, or no data
  if (loading || error || destinations.length === 0) {
    return null;
  }

  const isSingle = destinations.length === 1;

  return (
    <div
      className="holiday-container-wrapper holiday-container"
      style={{ padding: `32px ${getContainerPadding(windowWidth)}` }}
    >
      <div
        className={`holiday-header ${windowWidth < 640 ? "holiday-header-mobile" : ""
          }`}
      >
        <h1
          className="holiday-title-text holiday-title"
          style={{ fontSize: getHeaderSize(windowWidth) }}
        >
          Popular Holiday Destinations
        </h1>
        <div className="holiday-nav-wrapper holiday-nav">
          <span
            className="holiday-view-all view-all"
            onClick={() => router.push("/holiday_list")}
          >
            View All
          </span>
        </div>
      </div>

      <Slider
        {...sliderSettings}
        className={`holiday-destinations-wrapper destinations-wrapper ${isSingle ? "single-slide" : ""
          }`}
      >
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="holiday-destination-card destination-card"
            onClick={() => {
              if (typeof window !== "undefined") {
                try {
                  window.sessionStorage.setItem(
                    "holidayId",
                    String(destination.id)
                  );
                } catch (e) {
                  // ignore storage errors
                }
              }
              const slug = encodeURIComponent(
                String(destination.title || "trip")
                  .toLowerCase()
                  .replace(/\s+/g, "-")
              );
              router.push(`/trip-details/${slug}`);
            }}
          >
            <div className="holiday-destination-image-wrapper destination-image-wrapper">
              <img
                src={destination.image}
                alt={destination.title}
                className="holiday-destination-image destination-image"
                style={{ height: getImageHeight(windowWidth) }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                onLoad={(e) => {
                  // Image loaded successfully
                  console.log(`Image loaded for ${destination.title}`);
                }}
              />
              <button className="holiday-heart-btn heart-btn">
                <Heart
                  size={windowWidth < 768 ? 18 : 20}
                  className="holiday-heart-icon heart-icon"
                />
              </button>
            </div>

            <div className="holiday-destination-content destination-content">
              <div className="holiday-title-rating title-rating">
                <h3
                  className="holiday-destination-title destination-title"
                  style={{ fontSize: getTitleSize(windowWidth) }}
                >
                  {destination.title}
                </h3>
                <div className="holiday-rating rating">
                  <span className="holiday-star star">★</span>
                  <span className="holiday-rating-number rating-number">
                    {destination.rating}
                  </span>
                </div>
              </div>

              <p className="holiday-duration duration">
                {destination.duration}
              </p>

              <div className="holiday-icons-section icons-section">
                <div className="holiday-icon-item icon-item">
                  <Plane
                    size={getIconSize(windowWidth)}
                    className="holiday-icon icon"
                  />
                  <p>{destination.flights}</p>
                </div>
                <div className="holiday-icon-item icon-item">
                  <Building2
                    size={getIconSize(windowWidth)}
                    className="holiday-icon icon"
                  />
                  <p>{destination.hotels}</p>
                </div>
                <div className="holiday-icon-item icon-item">
                  <Car
                    size={getIconSize(windowWidth)}
                    className="holiday-icon icon"
                  />
                  <p>{destination.transfers}</p>
                </div>
                <div className="holiday-icon-item icon-item">
                  <Users
                    size={getIconSize(windowWidth)}
                    className="holiday-icon icon"
                  />
                  <p>{destination.activities}</p>
                </div>
              </div>

              <ul className="holiday-features-list features-list">
                {destination.features.map((feature, index) => (
                  <li key={index} className="holiday-feature-item feature-item">
                    {feature}
                  </li>
                ))}
              </ul>

              <div
                className={`pricing-section ${windowWidth < 640 ? "pricing-column" : "pricing-row"
                  }`}
              >
                <span className="holiday-original-price original-price">
                  {destination.originalPrice}
                </span>
                <div className="holiday-discounted-price-wrapper discounted-price-wrapper">
                  <span className="holiday-discounted-price discounted-price">
                    {destination.discountedPrice}
                  </span>
                  <span className="holiday-per-person per-person">
                    Per person
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

// Helper functions to compute styles dynamically
function getContainerPadding(width) {
  if (width < 640) return "16px";
  if (width < 768) return "24px";
  if (width < 1024) return "32px";
  if (width < 1280) return "48px";
  return "96px";
}

function getImageHeight(width) {
  if (width < 640) return "200px";
  if (width < 768) return "220px";
  return "240px";
}

function getTitleSize(width) {
  if (width < 640) return "20px";
  if (width < 768) return "22px";
  return "24px";
}

function getHeaderSize(width) {
  if (width < 640) return "28px";
  if (width < 768) return "32px";
  return "36px";
}

function getIconSize(width) {
  if (width < 640) return 20;
  if (width < 1024) return 22;
  return 24;
}
