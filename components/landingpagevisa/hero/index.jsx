"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addCurrentTab } from "../../../features/hero/findPlaceSlice";
import "../styles/hero.css"; // import CSS file

// Flight search/book card with trip options
const BookFlightCard = () => {
  const [visaType, setVisaType] = useState("Tourist");
  return (
    <div
      className="book-flight-wrapper"
      data-aos="fade-up"
      data-aos-delay="200"
      style={{ maxWidth: "1400px", width: "100%" }}
    >
      <h2 className="book-flight-title">Get Visa</h2>
      <div className="flight-search-container">
        {/* DESTINATION */}
        <div className="flight-field">
          <span className="flight-label">Destination</span>
          <input
            className="flight-input"
            type="text"
            placeholder="Select Destination"
            defaultValue="United Arab Emirates"
          />
        </div>
        {/* ARRIVAL DATE */}
        <div className="flight-field">
          <span className="flight-label">Arrival Date</span>
          <input
            className="flight-input"
            type="date"
            defaultValue="2025-01-11"
          />
        </div>
        {/* RETURN DATE */}
        <div className="flight-field">
          <span className="flight-label">Return Date</span>
          <input
            className="flight-input"
            type="date"
            defaultValue="2025-02-12"
          />
        </div>
        {/* NATIONALITY */}
        <div className="flight-field">
          <span className="flight-label">Nationality</span>
          <input
            className="flight-input"
            type="text"
            placeholder="Select Nationality"
            defaultValue="Indian"
          />
        </div>
        {/* BUTTON */}
        <button className="flight-btn">
          <span>Visa Types</span>
          <svg width="21" height="21" fill="none" viewBox="0 0 21 21">
            <path
              d="M11.69 5.01v7.46l2.84-2.85a.75.75 0 111.06 1.07l-4.13 4.13a.75.75 0 01-1.06 0L6.27 10.7a.75.75 0 111.06-1.06l2.84 2.85V5.01a.75.75 0 011.52 0z"
              fill="#fff"
            />
          </svg>
        </button>
      </div>

      {/* Visa Type Options Row */}
      <div className="trip-options-container">
        <div className="trip-options-left">
          {/* Tourist Visa */}
          <div
            className={`trip-option ${visaType === "Tourist" ? "active" : ""}`}
          >
            <input
              type="radio"
              id="touristVisa"
              name="visaType"
              checked={visaType === "Tourist"}
              onChange={() => setVisaType("Tourist")}
            />
            <label htmlFor="touristVisa">Tourist</label>
          </div>
          {/* Business Visa */}
          <div
            className={`trip-option ${visaType === "Business" ? "active" : ""}`}
          >
            <input
              type="radio"
              id="businessVisa"
              name="visaType"
              checked={visaType === "Business"}
              onChange={() => setVisaType("Business")}
            />
            <label htmlFor="businessVisa">Business</label>
          </div>
          {/* Transit Visa */}
          <div
            className={`trip-option ${visaType === "Transit" ? "active" : ""}`}
          >
            <input
              type="radio"
              id="transitVisa"
              name="visaType"
              checked={visaType === "Transit"}
              onChange={() => setVisaType("Transit")}
            />
            <label htmlFor="transitVisa">Transit</label>
          </div>
        </div>
        {/* Google Powered */}
        <div className="google-powered">
          <span>Powered by</span>
          <svg className="google-logo" viewBox="0 0 272 92" fill="none">
            <path
              d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
              fill="#4285F4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Icon button
const IconButton = ({ imgSrc, label, isActive = false }) => (
  <div className="text-center cursor-pointer">
    <div
      className={`mx-auto mb-2 d-flex align-items-center justify-center rounded-circle transition-all shadow-sm ${
        isActive
          ? "bg-orange-500 border-orange-500"
          : "bg-white border-white hover:bg-gray-50"
      }`}
      style={{
        width: "64px",
        height: "64px",
        border: "2px solid",
        borderColor: isActive ? "#f97316" : "#e5e7eb",
      }}
    >
      <img
        src={imgSrc}
        alt={label}
        className="object-contain"
        style={{ width: "45px", height: "45px" }}
      />
    </div>
    <span className="text-12 fw-500 text-white d-block">{label}</span>
  </div>
);

// Icon row
const IconRow = () => {
  const [activeIcon, setActiveIcon] = useState("Flight");
  const iconData = [
    {
      id: "Flight",
      label: "Flight",
      imgSrc: "/img/landingpage/icons/flight.png",
    },
    {
      id: "Activities",
      label: "Activities",
      imgSrc: "/img/landingpage/icons/activity.png",
    },
    {
      id: "Holidays",
      label: "Holidays",
      imgSrc: "/img/landingpage/icons/holiday.png",
    },
    { id: "Hotel", label: "Hotel", imgSrc: "/img/landingpage/icons/hotel.png" },
    { id: "Visa", label: "Visa", imgSrc: "/img/landingpage/icons/visa.png" },
    { id: "More", label: "More", imgSrc: "/img/landingpage/icons/more.png" },
  ];
  return (
    <div
      className="d-flex justify-center align-items-center mt-40 mb-20"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "24px",
        flexWrap: "nowrap",
      }}
      data-aos="fade-up"
      data-aos-delay="150"
    >
      {iconData.map((icon) => (
        <div
          key={icon.id}
          onClick={() => setActiveIcon(icon.id)}
          style={{ flex: "none" }}
        >
          <IconButton
            imgSrc={icon.imgSrc}
            label={icon.label}
            isActive={activeIcon === icon.id}
          />
        </div>
      ))}
    </div>
  );
};

// Final combined hero section
const HeroSection = () => {
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const dispatch = useDispatch();
  const Router = useRouter();
  return (
    <section className="masthead -type-1 z-5">
      <div className="masthead__bg">
        <img alt="image" src="/img/landingpage/hero.png" className="js-lazy" />
      </div>
      <div className="container">
        <div className="row justify-center">
          <div className="col-auto">
            <div className="text-center" style={{ marginTop: "-100px" }}>
              <h1
                className="text-60 lg:text-40 md:text-30 text-black"
                data-aos="fade-up"
              >
                Travel to your Dream Destination!
              </h1>
              <p
                className="text-black mt-6 md:mt-10"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Flight booking made faster and efficient
              </p>
            </div>
            {/* Icon Row */}
            <IconRow />
            {/* Search Container */}
            <div
              className="search-container mb-4"
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "0 16px",
              }}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "12px",
                  boxShadow: "0 8px 40px 0 rgba(40,47,60,0.10)",
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "12px", opacity: 0.6 }}
                >
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="#252B36"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 21L16.65 16.65"
                    stroke="#252B36"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    fontSize: "16px",
                    color: "#252B36",
                  }}
                />
              </div>
            </div>
            {/* Book Flight Card */}
            <div style={{ paddingTop: "70px" }}>
              <BookFlightCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
