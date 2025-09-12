"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import "../styles/hero.css";

const fieldIcons = {
  from: "/img/landingpage/icons/flight.png",
  to: "/img/landingpage/icons/flight.png",
  date: "/img/landingpage/icons/calendar.png",
  passenger: "/img/landingpage/icons/person.png",
  direct: "/img/landingpage/icons/tick.png",
};

const BookFlightCard = () => {
  const [tripType, setTripType] = useState("roundTrip");

  return (
    <div
      className="book-flight-wrapper"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <h2 className="book-flight-title">Book Flight</h2>
      <div className="flight-search-container">
        {/* FROM */}
        <div className="flight-field">
          <img

            src="/img/general/from-flight.png"
            className="flight-icon"
            alt="From"
          />
          <span style={{ paddingLeft: "10px" }} className="flight-label">From</span>
          <input
            className="flight-input"
            type="text"
            placeholder="DEL – New Delhi"
            defaultValue="DEL – New Delhi"
            autoFocus
          />
        </div>
        {/* TO */}
        <div className="flight-field">
          <img
            src="/img/general/to-flight.png"
            className="flight-icon"
            alt="To"
          />
          <span style={{ paddingLeft: "10px" }} className="flight-label">To</span>
          <input
            className="flight-input"
            type="text"
            placeholder="SIN – Singapore"
            defaultValue="SIN – Singapore"
          />
        </div>
        {/* DEPART */}
        <div className="flight-field">
          {/* <img src={fieldIcons.date} className="flight-icon" alt="Depart" /> */}
          <span className="flight-label">Depart</span>
          <input
            className="flight-input"
            type="date"
            defaultValue="2025-01-11"
          />
        </div>
        {/* RETURN */}
        <div className="flight-field">
          {/* <img src={fieldIcons.date} className="flight-icon" alt="Return" /> */}
          <span className="flight-label">Return</span>
          <input
            className="flight-input"
            type="date"
            defaultValue="2025-02-12"
          />
        </div>
        {/* PASSENGERS */}
        <div className="flight-field">
          <img
            src="/img/general/passenger.png"
            className="flight-icon"
            alt="Passenger"
          />
          <span style={{ paddingLeft: "10px" }} className="flight-label">Passengers</span>
          <input
            className="flight-input"
            type="text"
            defaultValue="2 Adult : 1 Child"
          />
        </div>
        {/* BUTTON */}
        <button className="flight-btn">
          <span>Search Flight</span>
          <svg width="21" height="21" fill="none" viewBox="0 0 21 21">
            <path
              d="M11.69 5.01v7.46l2.84-2.85a.75.75 0 111.06 1.07l-4.13 4.13a.75.75 0 01-1.06 0L6.27 10.7a.75.75 0 111.06-1.06l2.84 2.85V5.01a.75.75 0 011.52 0z"
              fill="#fff"
            />
          </svg>
        </button>
      </div>
      {/* Trip Options Row */}
      <div className="trip-options-container">
        <div className="trip-options-left">
          {/* One Way */}
          <div
            className={`trip-option ${tripType === "oneWay" ? "active" : ""}`}
          >
            <input
              type="radio"
              id="oneWay"
              name="tripType"
              checked={tripType === "oneWay"}
              onChange={() => setTripType("oneWay")}
            />
            <label htmlFor="oneWay">One Way</label>
          </div>
          {/* Multi City */}
          <div
            className={`trip-option ${tripType === "multiCity" ? "active" : ""
              }`}
          >
            <input
              type="radio"
              id="multiCity"
              name="tripType"
              checked={tripType === "multiCity"}
              onChange={() => setTripType("multiCity")}
            />
            <label htmlFor="multiCity">Multi City</label>
          </div>
          {/* Round Trip */}
          <div
            className={`trip-option ${tripType === "roundTrip" ? "active" : ""
              }`}
          >
            <input
              type="radio"
              id="roundTrip"
              name="tripType"
              checked={tripType === "roundTrip"}
              onChange={() => setTripType("roundTrip")}
            />
            <label htmlFor="roundTrip">Round Trip</label>
          </div>
          {/* Direct Flight */}
          <div
            className={`trip-option ${tripType === "directFlight" ? "active" : ""
              }`}
          >
            <input
              type="radio"
              id="directFlight"
              name="tripType"
              checked={tripType === "directFlight"}
              onChange={() => setTripType("directFlight")}
            />
            <label htmlFor="directFlight">Direct Flight</label>
          </div>
        </div>
        {/* Google Powered */}
        <div className="google-powered">
          <span>Powered by</span>
          <svg className="google-logo" viewBox="0 0 272 92" fill="none">
            <path
              d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
              fill="#EA4335"
            />
            <path
              d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
              fill="#FBBC05"
            />
            <path
              d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
              fill="#34A853"
            />
            <path d="M225 3v65h-9.5V3h9.5z" fill="#EA4335" />
            <path
              d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
              fill="#FBBC05"
            />
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


const IconButton = ({ redirectUrl, imgSrc, label, isActive = false, onClick }) => (
  <div className="text-center cursor-pointer" onClick={onClick}>
    <div
      className={`mx-auto mb-2 d-flex align-items-center justify-center rounded-circle transition-all shadow-sm ${isActive
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
        style={{ width: "45px", height: "45px", borderRadius: "50%" }}
      />
    </div>
    <span className="text-12 fw-500 text-white d-block">{label}</span>
  </div>
);

const IconRow = () => {
  const [activeIcon, setActiveIcon] = useState("Flight");
  const router = useRouter();
  const iconData = [
    {
      id: "Flight",
      label: "Flight",
      imgSrc: "/img/landingpage/icons/flight.png",
      redirectUrl: '/'
    },
    {
      id: "Activities",
      label: "Activities",
      imgSrc: "/img/landingpage/icons/activity.png",
      redirectUrl: '#'
    },
    {
      id: "Holidays",
      label: "Holidays",
      imgSrc: "/img/landingpage/icons/holiday.png",
      redirectUrl: '/holidays'
    },
    { id: "Hotel", label: "Hotel", imgSrc: "/img/landingpage/icons/hotel.png", redirectUrl: '#' },
    { id: "Visa", label: "Visa", imgSrc: "/img/landingpage/icons/visa.png", redirectUrl: '/landing_page_visa_home' },
    { id: "More", label: "More", imgSrc: "/img/landingpage/icons/more.png", redirectUrl: '#' },
  ];
  return (
    <div
      className="icon-row-container d-flex justify-center align-items-center mt-40 mb-20 sm:mt-20 sm:mb-10"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "24px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
      data-aos="fade-up"
      data-aos-delay="150"
    >
      {iconData.map((icon) => (
        <div
          key={icon.id}
          className="icon-item sm:flex-grow-0"
          style={{
            flex: "none",
            margin: "0 8px",
            marginBottom: "16px",
          }}
        >
          <IconButton
            imgSrc={icon.imgSrc}
            label={icon.label}
            isActive={activeIcon === icon.id}
            onClick={() => {
              setActiveIcon(icon.id);
              if (icon.redirectUrl) {
                router.push(icon.redirectUrl);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};


const HeroSection = () => {
  // Redux and router hooks if needed for navigation/interactivity
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
            <div
              className="text-center hero-content"
              style={{ marginTop: "-100px" }}
            >
              <h1
                className="text-60 lg:text-40 md:text-30 sm:text-24 text-black hero-title"
                data-aos="fade-up"
              >
                Travel to your Dream Destination!
              </h1>
              <p
                className="text-black mt-6 md:mt-10 sm:mt-4 hero-subtitle"
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
              className="search-container mb-4 sm:px-4"
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
