"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addCurrentTab } from "../../../features/hero/findPlaceSlice";

// Embedded (scoped) CSS for BookFlightCard and HeroSection
const styles = `
/* HERO Section BG overrides */
.masthead__bg img {
  width: 100vw;
  height: 390px;
  object-fit: cover;
  border-radius: 24px 24px 0 0;
}
@media (max-width: 900px) {
  .masthead__bg img {height: 220px;}
}
.book-flight-wrapper {
  background: #fff;
  padding: 12px 16px 16px 16px;
  border-radius: 16px;
  box-shadow: 0 8px 40px 0 rgba(40,47,60,0.10);
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  top: -60px;
  z-index: 20;
}
.flight-search-container {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-bottom: 16px;
}
.flight-field {
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  padding: 0 12px;
  border-right: 1px solid #e0e0e0;
}
.flight-field:last-child {
  border-right: none;
}
.flight-icon {
  position: absolute;
  left: -4px;
  top: 4px;
  width: 20px;
  height: 20px;
  object-fit: contain;
  opacity: 0.75;
}
.flight-label {
  font-size: 12px;
  color: #586380;
  margin-bottom: 4px;
  font-weight: 500;
}
.flight-input {
  background: transparent;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: #252b36;
  outline: none;
  width: 100%;
  padding: 0;
}
.flight-btn {
  background: #000;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  flex: 0 0 auto;
}
.flight-btn svg {
  margin-left: 4px;
}

/* Trip Options Styles */
.trip-options-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}
.trip-options-left {
  display: flex;
  align-items: center;
  gap: 24px;
}
.trip-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.trip-option input[type="radio"] {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: #ff6b35;
}
.trip-option label {
  font-size: 14px;
  color: #252b36;
  font-weight: 500;
  cursor: pointer;
  margin: 0;
}
.trip-option.active label {
  color: #ff6b35;
}
.google-powered {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
}
.google-logo {
  width: 60px;
  height: auto;
}

/* Responsive adjustments */
@media (max-width: 900px) {
  .book-flight-wrapper {
    padding: 12px 8px 16px 8px;
    max-width: 100vw;
    max-width: 100%;
  }
  .flight-search-container {
    flex-direction: column;
    gap: 10px;
  }
  .flight-field {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 8px 12px;
  }
  .flight-field:last-child {
    border-bottom: none;
  }
  .flight-btn {
    width: 100%;
    justify-content: center;
  }
  .trip-options-container {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  .trip-options-left {
    flex-wrap: wrap;
    gap: 16px;
  }
}`;

// Replace icon paths as appropriate for your asset structure
const fieldIcons = {
  from: "/img/landingpage/icons/flight.png",
  to: "/img/landingpage/icons/flight.png",
  date: "/img/landingpage/icons/calendar.png",
  passenger: "/img/landingpage/icons/person.png",
  direct: "/img/landingpage/icons/tick.png",
};

// Flight search/book card with trip options
const BookFlightCard = () => {
  const [visaType, setVisaType] = useState("Tourist");

  return (
    <>
      <style>{styles}</style>
      <div
        className="book-flight-wrapper"
        data-aos="fade-up"
        data-aos-delay="200"
        style={{ maxWidth: "1400px", width: "100%" }}
      >
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
            <span>Check Visa Requirements</span>
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
              className={`trip-option ${
                visaType === "Tourist" ? "active" : ""
              }`}
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
              className={`trip-option ${
                visaType === "Business" ? "active" : ""
              }`}
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
              className={`trip-option ${
                visaType === "Transit" ? "active" : ""
              }`}
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
    </>
  );
};

// Icon button (unchanged)
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

// Icon row (unchanged)
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
  // Redux and router hooks are present if needed for navigation/interactivity
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const dispatch = useDispatch();
  const Router = useRouter();

  return (
    <section className="masthead -type-1 z-5">
      <style>{styles}</style>
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

            {/* Travel Agent Meeting Link */}
            {/* <div
              style={{ margintop: "-100px" }}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <p
                className="text-white cursor-pointer hover:underline"
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Book a meeting with our travel Agent →
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
