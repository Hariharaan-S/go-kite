"use client";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import "../styles/hero.css";

// Icon button component
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
        style={{ width: "45px", height: "45px", borderRadius: "50%" }}
      />
    </div>
    <span className="text-12 fw-500 text-white d-block">{label}</span>
  </div>
);

// Icon row component
const IconRow = () => {
  const [activeIcon, setActiveIcon] = React.useState("Home");
  const router = useRouter();
  const iconData = [
    {
      id: "Home",
      label: "Home",
      imgSrc: "/img/landingpage/icons/home.png",
      redirectUrl: "/",
    },
    {
      id: "Flight",
      label: "Flight",
      imgSrc: "/img/landingpage/icons/flight.png",
      redirectUrl: "/",
    },
    {
      id: "Activities",
      label: "Activities",
      imgSrc: "/img/landingpage/icons/activity.png",
      redirectUrl: "#",
    },
    {
      id: "Holidays",
      label: "Holidays",
      imgSrc: "/img/landingpage/icons/holiday.png",
      redirectUrl: "/holidays",
    },
    {
      id: "Hotel",
      label: "Hotel",
      imgSrc: "/img/landingpage/icons/hotel.png",
      redirectUrl: "#",
    },
    {
      id: "Visa",
      label: "Visa",
      imgSrc: "/img/landingpage/icons/visa.png",
      redirectUrl: "/landing_page_visa_home",
    },
    {
      id: "More",
      label: "More",
      imgSrc: "/img/landingpage/icons/more.png",
      redirectUrl: "#",
    },
  ];
  return (
    <div
      className="d-flex justify-center align-items-center mt-40 mb-20"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "24px",
        flexWrap: "nowrap",
        position: "relative",
      }}
      data-aos="fade-up"
      data-aos-delay="150"
    >
      {/* Connecting line */}
      <div
        style={{
          position: "absolute",
          top: "32px", // Center of the icons (64px height / 2)
          left: "198px", // Start after first icon (32px + 32px radius + 24px gap)
          right: "198px", // End before last icon (32px + 32px radius + 24px gap)
          height: "2px",
          background: "orange",
          zIndex: 1,
        }}
      />
      
      {iconData.map((icon) => (
        <div
          key={icon.id}
          onClick={() => {
            setActiveIcon(icon.id);
            if (icon.redirectUrl) {
              router.push(icon.redirectUrl);
            }
          }}
          style={{ flex: "none", position: "relative", zIndex: 2 }}
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

// Date Selection Popup Component
const DateSelectionPopup = ({ onClose, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const handleSelect = () => {
    onSelect(selectedDate);
    onClose();
  };

  return (
    <div className="date-selection-popup">
      <div className="date-selection-content">
        <div className="date-selection-header">
          <h3>Select Date</h3>
          <button className="date-selection-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="date-selection-body">
          <input
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={handleDateChange}
            className="full-width-date-input"
          />
        </div>
        <div className="date-selection-footer">
          <button className="date-select-btn" onClick={handleSelect}>
            Select Date
          </button>
        </div>
      </div>
    </div>
  );
};

// Book Flight Card Component
const BookFlightCard = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const dateInputRef = useRef(null);

  const handleIconClick = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
        dateInputRef.current.click();
      }
    }
  };

  const d = new Date(date);
  const month = d.toLocaleString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();
  const weekday = d.toLocaleString("en-US", { weekday: "long" });

  const handleDateSelect = (newDate) => {
    setDate(newDate);
  };

  const [visaType, setVisaType] = React.useState("Tourist");

  return (
    <div
      className="book-flight-wrapper"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <h2 className="book-flight-title">Get Visa</h2>
      <div className="flight-search-container">
        {/* DESTINATION */}
        <div className="flight-field">
          <span className="flight-label">Where are you going?</span>
          <input
            className="flight-input"
            type="text"
            placeholder="Select Destination"
            defaultValue="United Arab Emirates"
          />
        </div>
        {/* ARRIVAL DATE */}
        <div className="flight-field">
          {/* formatted display */}
          <div className="date-display">
            <div className="date-content">
              <h3 className="date-month">{month}</h3>
              <p className="date-detail">
                {day}–{weekday}, {year}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "auto" }}>
              {/* Hidden native date input (invisible but functional) */}
              <input
                ref={dateInputRef}
                type="date"
                value={selectedDate || ""}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  const value = e.target.value; // yyyy-mm-dd
                  setSelectedDate(value);
                  if (value) {
                    const parsed = new Date(value + "T00:00:00");
                    if (!isNaN(parsed.getTime())) {
                      setDate(parsed);
                    }
                  }
                }}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: 0,
                  height: 0,
                  pointerEvents: "none",
                }}
                aria-hidden="true"
                tabIndex={-1}
              />

              {/* Your SVG icon */}
              <div
                className="date-icon-wrapper"
                style={{ cursor: "pointer" }}
                onClick={handleIconClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="date-icon"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* BUTTON */}
        <button className="flight-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 256 256"
          >
            <g
              fill="#ffffff"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
              style={{ mixBlendMode: "normal" }}
            >
              <g transform="scale(8.53333,8.53333)">
                <path d="M13,3c-5.511,0 -10,4.489 -10,10c0,5.511 4.489,10 10,10c2.39651,0 4.59738,-0.85101 6.32227,-2.26367l5.9707,5.9707c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-5.9707,-5.9707c1.41266,-1.72488 2.26367,-3.92576 2.26367,-6.32227c0,-5.511 -4.489,-10 -10,-10zM13,5c4.43012,0 8,3.56988 8,8c0,4.43012 -3.56988,8 -8,8c-4.43012,0 -8,-3.56988 -8,-8c0,-4.43012 3.56988,-8 8,-8z"></path>
              </g>
            </g>
          </svg>
          <span>Visa Types</span>
        </button>
      </div>
      {/* Visa Type Options Row */}
      <div className="trip-options-container">
        <div className="trip-options-left"></div>
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

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="masthead -type-1 z-5">
      <div className="masthead__bg">
        <img alt="image" src="/img/landingpage/hero.png" className="js-lazy" />
      </div>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="row justify-center">
          <div className="col-auto">
            <div className="text-center" style={{ marginTop: "-140px" }}>
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
            {/* Book Flight Card */}
            <div style={{ paddingTop: "70px" }}>
              <BookFlightCard />
            </div>
            {/* Travel Agent Meeting Link */}
            <div
  className="travel-agent-meeting"
  style={{ marginTop: "-50px" }} // adjust this value as needed
>
  <a href="#">Book a meeting with our Travel Agent →</a>
</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;