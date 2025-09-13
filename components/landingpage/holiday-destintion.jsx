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
import "./styles/holiday-destination.css";
import { useRouter } from "next/navigation";

export default function HolidayDestinations() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [windowWidth, setWindowWidth] = useState(1024);

  const handleCardClick = (destinationId) => {
    router.push(`/trip-package-details?id=${destinationId}`);
  };

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 768) {
        setVisibleCards(2);
      } else if (width < 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

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
  ];

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
          <span className="view-all">View All</span>
          <button
            className="nav-btn"
            onClick={prevSlide}
            style={getNavButtonSize(windowWidth)}
          >
            <ChevronLeft size={windowWidth < 768 ? 16 : 18} />
          </button>
          <button
            className="nav-btn"
            onClick={nextSlide}
            style={getNavButtonSize(windowWidth)}
          >
            <ChevronRight size={windowWidth < 768 ? 16 : 18} />
          </button>
        </div>
      </div>

      <div
        className={`destinations-wrapper ${
          windowWidth < 640 ? "destinations-wrapper-mobile" : ""
        }`}
      >
        {visibleDestinations.map((destination) => (
          <div
            key={destination.id}
            className="destination-card"
            style={{ width: getCardWidth(visibleCards, windowWidth) }}
            onClick={() => handleCardClick(destination.id)}
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
      </div>
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
function getCardWidth(visibleCards, width) {
  if (visibleCards === 1) return "100%";
  if (visibleCards === 2) return "calc(50% - 12px)";
  if (visibleCards === 3) return "calc(33.333% - 16px)";
  return "calc(25% - 18px)";
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
function getNavButtonSize(width) {
  const size = width < 768 ? "36px" : "40px";
  return {
    width: size,
    height: size,
  };
}

function getIconSize(width) {
  if (width < 640) return 20;
  if (width < 1024) return 22;
  return 24;
}
