"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addCurrentTab } from "../../../features/hero/findPlaceSlice";

// Embedded responsive CSS for HeroSection, BookFlightCard, and IconRow
const styles = `
.masthead__bg img {
  width: 100vw;
  max-width: 100%;
  height: 390px;
  object-fit: cover;
  border-radius: 24px 24px 0 0;
  display: block;
}
@media (max-width: 900px) {
  .masthead__bg img {
    height: 220px;
    border-radius: 16px 16px 0 0;
  }
}
@media (max-width: 600px) {
  .masthead__bg img {
    height: 140px;
    border-radius: 10px 10px 0 0;
  }
}
.book-flight-wrapper {
  background: #fff;
  padding: 22px 24px 22px 24px;
  border-radius: 16px;
  box-shadow: 0 8px 40px 0 rgba(40,47,60,0.10);
  max-width: 900px;
  min-width: 0;
  margin: 0 auto;
  position: relative;
  top: -60px;
  z-index: 20;
}
@media (max-width: 900px) {
  .book-flight-wrapper {
    top: -35px;
    max-width: 97vw;
    padding: 14px 8px 14px 8px;
    border-radius: 12px;
  }
}
@media (max-width: 600px) {
  .book-flight-wrapper {
    padding: 10px 3vw 14px 3vw;
    top: -17px;
    max-width: 99vw;
    border-radius: 8px;
  }
}
.flight-search-container {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-bottom: 18px;
}
@media (max-width: 900px) {
  .flight-search-container {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 8px;
    align-items: stretch;
  }
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
  min-width: 0;
}
.flight-field:last-child {
  border-right: none;
}
@media (max-width: 900px) {
  .flight-field {
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 6px 8px;
    width: 100%;
  }
  .flight-field:last-child {
    border-bottom: none;
  }
}
/* Input, label, button */
.flight-label {
  font-size: 12px;
  color: #586380;
  margin-bottom: 4px;
  font-weight: 500;
}
@media (max-width: 600px) {
  .flight-label {
    font-size: 11px;
    margin-bottom: 2px;
  }
}
.flight-input {
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: #252b36;
  outline: none;
  width: 100%;
  padding: 0;
}
@media (max-width: 600px) {
  .flight-input {
    font-size: 15px;
  }
}
.flight-btn {
  background: #000;
  color: #fff;
  font-size: 17px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  padding: 13px 26px;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  flex: 0 0 auto;
  transition: background 0.18s;
}
.flight-btn:hover {
  background: #222;
}
@media (max-width: 600px) {
  .flight-btn {
    width: 100%;
    font-size: 15px;
    padding: 11px 0;
    justify-content: center;
    border-radius: 9px;
  }
}
.trip-options-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
  gap: 8px;
}
.trip-options-left {
  display: flex;
  align-items: center;
  gap: 24px;
}
@media (max-width: 900px) {
  .trip-options-container {
    flex-direction: column;
    gap: 14px;
    align-items: flex-start;
    padding-top: 6px;
  }
  .trip-options-left {
    flex-wrap: wrap;
    gap: 12px;
  }
}
.google-powered {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
}
.google-logo {
  width: 50px;
  height: auto;
}
@media (max-width: 600px) {
  .google-logo {
    width: 36px;
  }
}
.text-60 { font-size: 60px; line-height: 1.1; font-weight: 700;}
.text-40 { font-size: 40px;}
.text-30 { font-size: 30px;}
@media (max-width: 900px) {
  .text-60 { font-size: 40px;}
}
@media (max-width: 600px) {
  .text-60 { font-size: 28px;}
  .text-40 { font-size: 24px;}
  .text-30 { font-size: 17px;}
}
.mt-40 { margin-top: 40px;}
.mb-20 { margin-bottom: 20px;}
.d-flex { display: flex;}
.justify-center { justify-content: center;}
.align-items-center { align-items: center;}
.text-white { color: #fff;}
.cursor-pointer { cursor: pointer;}
.text-12 { font-size: 12px;}
.fw-500 { font-weight: 500;}
.rounded-circle { border-radius: 50%;}
.transition-all { transition: all 0.18s;}
.shadow-sm { box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);}
.bg-orange-500 { background: #f97316;}
.border-orange-500 { border-color: #f97316 !important;}
.bg-white { background: #fff;}
.border-white { border-color: #fff !important;}
.hover\\:bg-gray-50:hover { background: #f6f6fa;}
/* Responsive icon row styles */
.icon-row-container {
  display: flex;
  flex-direction: row;
  gap: 24px;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  overflow-y: visible;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
  padding-bottom: 10px;
}
.icon-row-container::-webkit-scrollbar { height: 6px; background: transparent; }
.icon-row-container::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 4px; }
@media (max-width: 600px) {
  .icon-row-container {
    justify-content: flex-start;
    gap: 12px;
    padding: 2px 0 12px 2px;
    scroll-snap-type: x mandatory;
  }
  .icon-row-container > div {
    scroll-snap-align: start;
    flex: 0 0 auto;
  }
}
`;

const fieldIcons = {
  from: "/img/landingpage/icons/flight.png",
  to: "/img/landingpage/icons/flight.png",
  date: "/img/landingpage/icons/calendar.png",
  passenger: "/img/landingpage/icons/person.png",
  direct: "/img/landingpage/icons/tick.png",
};

const BookFlightCard = () => {
  const [visaType, setVisaType] = useState("Tourist");
  return (
    <>
      <style>{styles}</style>
      <div
        className="book-flight-wrapper"
        data-aos="fade-up"
        data-aos-delay="200"
      >
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
            <span className="flight-label">Date</span>
            <input
              className="flight-input"
              type="date"
              defaultValue="2025-01-11"
            />
          </div>
          {/* BUTTON */}
          <button className="flight-btn">
            <span>Get Visa</span>
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
    </>
  );
};

const IconButton = ({ imgSrc, label, isActive = false }) => (
  <div className="text-center cursor-pointer">
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
  const [activeIcon, setActiveIcon] = useState("Home");
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
      }}
      data-aos="fade-up"
      data-aos-delay="150"
    >
      {iconData.map((icon) => (
        <div
          key={icon.id}
          onClick={() => {
            setActiveIcon(icon.id);
            if (icon.redirectUrl) {
              router.push(icon.redirectUrl);
            }
          }}
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
            <div
              className="text-center"
              style={{
                marginTop: "-100px",
                paddingTop: "70px",
                paddingBottom: "20px",
              }}
            >
              <h1
                className="text-60 lg:text-40 md:text-30 sm:text-2xl text-white"
                data-aos="fade-up"
                style={{ marginBottom: "10px" }}
              >
                The whole world awaits.
              </h1>
              <p
                className="text-white mt-6 md:mt-10 sm:text-sm"
                data-aos="fade-up"
                data-aos-delay="100"
                style={{
                  fontSize: "16px",
                  fontWeight: 400,
                  marginTop: "10px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                }}
              >
                Book a meeting with our travel Agent →
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
