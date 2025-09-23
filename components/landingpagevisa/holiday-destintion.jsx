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

// Authorization and claims headers
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

// Helper function to get slider settings
function getSliderSettings(windowWidth) {
  let slidesToShow = 4;
  if (windowWidth < 640) {
    slidesToShow = 1;
  } else if (windowWidth < 768) {
    slidesToShow = 2;
  } else if (windowWidth < 1024) {
    slidesToShow = 3;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
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
    getSliderSettings(windowWidth)
  );
  const router = useRouter();

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

      return {
        id: item.holidayCardId,
        holidayId: item.holidayCardId, // Add this line
        image: `/img/general/${item.cardJson.heroImage}`, // Assuming images are stored in public/img/general/
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
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch sections first
        const sections = await fetchSectionsData();

        // Find the holiday destinations section
        const holidaySection = sections.find(
          (section) =>
            section.title === "home-holiday-section" &&
            section.contentType === "HOLIDAY"
        );

        if (!holidaySection) {
          throw new Error("Holiday destinations section not found");
        }

        // Fetch holiday cards for this section
        const holidayCardsData = await fetchHolidayCardsData(
          holidaySection.pageSectionId
        );

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
            duration: "3 Days 4 Nights",
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

  // Existing responsive and UI logic
  useEffect(() => {
    const updateSliderSettings = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setSliderSettings(getSliderSettings(width));
    };

    updateSliderSettings();
    window.addEventListener("resize", updateSliderSettings);
    return () => window.removeEventListener("resize", updateSliderSettings);
  }, []);

  // Loading and error states
  if (loading) {
    return (
      <div className="holiday-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading holiday destinations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="holiday-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Error loading destinations: {error}</p>
          <p>Showing default content...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="holiday-container"
      style={{ padding: `32px ${getContainerPadding(windowWidth)}` }}
    >
      <div
        className={`holiday-header ${
          windowWidth < 640 ? "holiday-header-mobile" : ""
        }`}
      >
        <h1
          className="holiday-title"
          style={{ fontSize: getHeaderSize(windowWidth) }}
        >
          Popular Holiday Destinations
        </h1>
        <div className="holiday-nav">
          <span className="view-all" onClick={() => router.push("/holidays")}>
            View All
          </span>
        </div>
      </div>

      <Slider {...sliderSettings} className="destinations-wrapper">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="destination-card"
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
            <div className="destination-image-wrapper">
              <img
                src={destination.image}
                alt={destination.title}
                className="destination-image"
                style={{ height: getImageHeight(windowWidth) }}
              />
              <button className="heart-btn">
                <Heart
                  size={windowWidth < 768 ? 18 : 20}
                  className="heart-icon"
                />
              </button>
            </div>

            <div className="destination-content">
              <div className="title-rating">
                <h3
                  className="destination-title"
                  style={{ fontSize: getTitleSize(windowWidth) }}
                >
                  {destination.title}
                </h3>
                <div className="rating">
                  <span className="star">★</span>
                  <span className="rating-number">{destination.rating}</span>
                </div>
              </div>

              <p className="duration">{destination.duration}</p>

              <div className="icons-section">
                <div className="icon-item">
                  <Plane size={getIconSize(windowWidth)} className="icon" />
                  <p>{destination.flights}</p>
                </div>
                <div className="icon-item">
                  <Building2 size={getIconSize(windowWidth)} className="icon" />
                  <p>{destination.hotels}</p>
                </div>
                <div className="icon-item">
                  <Car size={getIconSize(windowWidth)} className="icon" />
                  <p>{destination.transfers}</p>
                </div>
                <div className="icon-item">
                  <Users size={getIconSize(windowWidth)} className="icon" />
                  <p>{destination.activities}</p>
                </div>
              </div>

              <ul className="features-list">
                {destination.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    {feature}
                  </li>
                ))}
              </ul>

              <div
                className={`pricing-section ${
                  windowWidth < 640 ? "pricing-column" : "pricing-row"
                }`}
              >
                <span className="original-price">
                  {destination.originalPrice}
                </span>
                <div className="discounted-price-wrapper">
                  <span className="discounted-price">
                    {destination.discountedPrice}
                  </span>
                  <span className="per-person">Per person</span>
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
