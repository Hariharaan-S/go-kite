"use client";
import React, { useState, useRef, useEffect } from "react";
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
import "./styles/popularvisa-card.css";
import { useRouter } from "next/navigation";

const VISIBLE_CARDS = 5;
const VISIBLE_VACCINATION_CARDS = 1; // Show one card at a time for mobile

const VisaCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentVaccinationSlide, setCurrentVaccinationSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const vaccinationContainerRef = useRef(null);

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
  const totalVaccinationSlides = vaccinationCountries.length;

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

  const nextVaccinationSlide = () => {
    setCurrentVaccinationSlide((prev) =>
      prev + 1 >= totalVaccinationSlides ? 0 : prev + 1
    );
  };

  const prevVaccinationSlide = () => {
    setCurrentVaccinationSlide((prev) =>
      prev - 1 < 0 ? totalVaccinationSlides - 1 : prev - 1
    );
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - vaccinationContainerRef.current.offsetLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - vaccinationContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiplied by 2 to make dragging more sensitive

    if (walk > 100) {
      prevVaccinationSlide();
      setIsDragging(false);
    } else if (walk < -100) {
      nextVaccinationSlide();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

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

  const VisaIcon = () => <div className="visa-icon">VISA</div>;
  const router = useRouter();

  return (
    <div className="visa-container">
      {/* Header */}
      <div className="visa-header">
        <h1 className="visa-title">Popular Visa</h1>
        <div className="visa-controls">
          <span className="view-all" style={{background:"#f2f0f0", padding:"5px", borderRadius:"12px"}} onClick={() => router.push("/apply_visa")}>
            View All
          </span>
          <button onClick={prevSlide} className="visa-btn">
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextSlide} className="visa-btn">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Popular Visa Cards */}
      <div className="visa-card-list">
        {visibleVisas.map((visa, index) => (
          <div
            key={index}
            className="visa-card"
            onClick={() => router.push("/apply_visa")}
          >
            <div className="card-header">
              <visa.Flag className="flag" />
              <div className="card-content">
                <h3 className="visa-country">{visa.country}</h3>
                <p className="visa-type">{visa.type}</p>
              </div>
            </div>
            {/* need to add line between this  */}
            <div className="visa-price-row">
              <div className="price-section">
                <span className="visa-price">{visa.price}</span>
                <span className="visa-price-text">{visa.priceText}</span>
              </div>
              <DetailsIcon size={16} color="#6b7280" className="arrow-icon" />
            </div>
          </div>
        ))}
      </div>

      {/* Vaccination Countries */}
      <h2 className="section-title">Vacation – Trending Countries</h2>

      {/* Mobile Carousel */}
      <div
        ref={vaccinationContainerRef}
        className="vaccination-carousel"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="vaccination-carousel-inner"
          style={{
            transform: `translateX(-${currentVaccinationSlide * 100}%)`,
            zIndex: 1,
          }}
        >
          {vaccinationCountries.map((country, index) => (
            <div key={index} className="vaccination-card">
              {country.hasVisaIcon && <VisaIcon />}
              <div className="card-header">
                <country.Flag className="flag" />
                <div className="card-content">
                  <h3 className="visa-country">{country.country}</h3>
                  <p className="visa-type">{country.subtitle}</p>
                </div>
              </div>
              <div className="visa-price-row">
                <div className="price-section">
                  <span className="visa-price">{country.price}</span>
                  <span className="visa-price-text">{country.priceText}</span>
                </div>
                <ChevronRight
                  size={16}
                  color="#6b7280"
                  className="arrow-icon"
                  onClick={() => router.push("/apply_visa")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="vaccination-grid">
        {vaccinationCountries.map((country, index) => (
          <div
            key={index}
            className="vaccination-card"
            onClick={() => router.push("/apply_visa")}
          >
            {country.hasVisaIcon && <VisaIcon />}
            <div className="card-header">
              <country.Flag className="flag" />
              <div className="card-content">
                <h3 className="visa-country">{country.country}</h3>
                <p className="visa-type">{country.subtitle}</p>
              </div>
            </div>
            <div className="visa-price-row">
              <div className="price-section">
                <span className="visa-price">{country.price}</span>
                <span className="visa-price-text">{country.priceText}</span>
              </div>
              <ChevronRight size={16} color="#6b7280" className="arrow-icon" />
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Navigation */}
      <div className="vaccination-carousel-nav">
        {vaccinationCountries.map((_, index) => (
          <button
            key={index}
            className={`vaccination-dot ${
              index === currentVaccinationSlide ? "active" : ""
            }`}
            onClick={() => setCurrentVaccinationSlide(index)}
          />
        ))}
      </div>

      {/* Visa Rules Image */}
      <div className="visa-rules">
        <h2 className="section-title">Visa Rules Announcement</h2>
        <div className="rules-card">
          <img
            src="/img/general/visa-card.png"
            alt="Visa Rules"
            className="rules-img"
          />
        </div>
      </div>
    </div>
  );
};

export default VisaCards;
