"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronRight as DetailsIcon,
} from "lucide-react";
import {
  US,
  IN,
  SG,
  CH,
  ES,
  TR,
  LK,
  AU,
  BD,
} from "country-flag-icons/react/3x2";

const VISIBLE_CARDS = 5;

const VisaCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const popularVisas = [
    {
      Flag: US,
      country: "US Visa",
      type: "Green card visa",
      price: "₹1,60,500",
      priceText: "per adult",
    },
    {
      Flag: IN,
      country: "India",
      type: "Tourist visa",
      price: "₹1,60,500",
      priceText: "per adult",
    },
    {
      Flag: SG,
      country: "Singapore",
      type: "Business visa",
      price: "₹1,60,500",
      priceText: "per adult",
    },
    {
      Flag: CH,
      country: "Switzerland",
      type: "Business visa",
      price: "₹1,60,500",
      priceText: "per adult",
    },
    {
      Flag: ES,
      country: "Spain",
      type: "Tourist visa",
      price: "₹1,60,500",
      priceText: "per adult",
    },
    {
      Flag: TR,
      country: "Turkey",
      type: "Business visa",
      price: "₹1,60,500",
      priceText: "per adult",
    },
  ];

  const vaccinationCountries = [
    {
      Flag: LK,
      country: "Sri Lanka",
      subtitle: "Get your Visa by 24hours",
      price: "₹6,500",
      priceText: "per adult",
      hasVisaIcon: true,
    },
    {
      Flag: SG,
      country: "Singapore",
      subtitle: "Get your Visa by 24hours",
      price: "₹6,500",
      priceText: "per adult",
      hasVisaIcon: true,
    },
    {
      Flag: AU,
      country: "Australia",
      subtitle: "Get your Visa by 24hours",
      price: "₹6,500",
      priceText: "per adult",
      hasVisaIcon: true,
    },
    {
      Flag: BD,
      country: "Bangladesh",
      subtitle: "Get your Visa by 24hours",
      price: "₹6,500",
      priceText: "per adult",
      hasVisaIcon: true,
    },
  ];

  const totalSlides = popularVisas.length;

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
  const getVisibleVisas = () => {
    if (totalSlides <= VISIBLE_CARDS) return popularVisas;
    if (currentSlide + VISIBLE_CARDS <= totalSlides) {
      return popularVisas.slice(currentSlide, currentSlide + VISIBLE_CARDS);
    } else {
      return [
        ...popularVisas.slice(currentSlide),
        ...popularVisas.slice(0, (currentSlide + VISIBLE_CARDS) % totalSlides),
      ];
    }
  };

  const visibleVisas = getVisibleVisas();

  const VisaIcon = () => (
    <div
      style={{
        position: "absolute",
        top: "8px",
        right: "8px",
        backgroundColor: "#e3f2fd",
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "10px",
        color: "#1976d2",
        fontWeight: "500",
      }}
    >
      VISA
    </div>
  );

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        backgroundColor: "#f8f9fa",
        padding: "24px",
        minHeight: "100vh",
      }}
    >
      {/* Header with dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#1a1a1a",
            margin: "0",
          }}
        >
          Popular Visa
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
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

      {/* Popular Visa Cards */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "32px",
          overflowX: "hidden",
          paddingBottom: "8px",
        }}
      >
        {visibleVisas.map((visa, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "16px",
              minWidth: "300px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                marginBottom: "8px",
              }}
            >
              <visa.Flag
                style={{ width: "48px", height: "32px", objectFit: "cover" }}
              />
            </div>

            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#1a1a1a",
                margin: "0 0 4px 0",
              }}
            >
              {visa.country}
            </h3>

            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                margin: "0 0 12px 0",
              }}
            >
              {visa.type}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1a1a1a",
                  }}
                >
                  {visa.price}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginLeft: "4px",
                  }}
                >
                  {visa.priceText}
                </span>
              </div>
              <DetailsIcon size={16} color="#6b7280" />
            </div>
          </div>
        ))}
      </div>

      {/* Vaccination - Trending Countries */}
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "600",
          color: "#1a1a1a",
          margin: "0 0 20px 0",
        }}
      >
        Vaccination – Trending Countries
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {vaccinationCountries.map((country, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              position: "relative",
            }}
          >
            {country.hasVisaIcon && <VisaIcon />}

            <div
              style={{
                fontSize: "24px",
                marginBottom: "8px",
              }}
            >
              <country.Flag
                style={{ width: "48px", height: "32px", objectFit: "cover" }}
              />
            </div>

            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#1a1a1a",
                margin: "0 0 4px 0",
              }}
            >
              {country.country}
            </h3>

            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                margin: "0 0 12px 0",
              }}
            >
              {country.subtitle}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1a1a1a",
                  }}
                >
                  {country.price}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginLeft: "4px",
                  }}
                >
                  {country.priceText}
                </span>
              </div>
              <ChevronRight size={16} color="#6b7280" />
            </div>
          </div>
        ))}
      </div>

      {/* Visa Rules Announcement */}
      <div
        style={{
          marginTop: "32px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#1a1a1a",
            margin: "0 0 20px 0",
          }}
        >
          Visa Rules Announcement
        </h2>

        <div
          style={{
            width: "300px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            cursor: "pointer",
          }}
        >
          <img
            src="/img/general/visa-card.png"
            alt="Visa Rules"
            style={{
              width: "300px",
              height: "auto",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VisaCards;
