"use client";
import React, { useRef, useState } from "react";
import PopupForm from "./popup/popup";
import "./styles/banner.css";

const NavbarHeightMobile = 76; // px -- adjust based on your actual navbar
const FALLBACK_IMAGE = "/img/general/fallback-image.jpg";

// Helper function to get image URL using the proxy endpoint
const getImageUrl = (imageName) => {
  if (!imageName) return FALLBACK_IMAGE;
  return `/api/cms/file-download?image=${encodeURIComponent(imageName)}`;
};

const BannerPage = ({ holidaysDetails, loading, error }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const toastTimerRef = useRef(null);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleSubmitEnquiry = (formData) => {
    setIsPopupOpen(false);
    setSuccessMessage("Enquiry saved successfully");
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setSuccessMessage("");
      toastTimerRef.current = null;
    }, 4000);
  };

  // Get images from holidayDetails data
  const getImages = () => {
    if (!holidaysDetails?.cardJson) {
      return {
        heroImage: FALLBACK_IMAGE,
        subImage1: FALLBACK_IMAGE,
        subImage2: FALLBACK_IMAGE
      };
    }

    return {
      heroImage: getImageUrl(holidaysDetails.cardJson.heroImage),
      subImage1: getImageUrl(holidaysDetails.cardJson.subImage1),
      subImage2: getImageUrl(holidaysDetails.cardJson.subImage2)
    };
  };

  const images = getImages();

  return (
    <div className="banner-container">
      <section className="banner-section">
        <div className="banner-card">
          {/* Left Images Grid */}
          <div className="images-grid">
            {/* Main large image */}
            <div className="main-image">
              <img
                src={images.heroImage}
                alt={holidaysDetails?.title || "Main destination"}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                onLoad={(e) => {
                  console.log(`Hero image loaded for ${holidaysDetails?.title}`);
                }}
              />
              <span className="badge">RECOMMENDED</span>
            </div>

            {/* Top right image */}
            <div className="small-image">
              <img
                src={images.subImage1}
                alt={`${holidaysDetails?.title || "Destination"} view 1`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                onLoad={(e) => {
                  console.log(`Sub image 1 loaded for ${holidaysDetails?.title}`);
                }}
              />
            </div>

            {/* Bottom right image */}
            <div className="small-image">
              <img
                src={images.subImage2}
                alt={`${holidaysDetails?.title || "Destination"} view 2`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                onLoad={(e) => {
                  console.log(`Sub image 2 loaded for ${holidaysDetails?.title}`);
                }}
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="right-content">
            <h2>{holidaysDetails.title}</h2>

            <div className="info-row">
              <div className="info-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{holidaysDetails.cityName}</span>
              </div>

              <div className="info-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{`${holidaysDetails.noOfDays} Days - ${holidaysDetails.noOfNights} Nights`}</span>
              </div>
            </div>

            <div className="rating-row">
              <div className="rating-value">4.7</div>
              <span>Excellent</span>
            </div>

            <div className="price">{`${holidaysDetails.currency} ${holidaysDetails.newPrice}`}</div>

            <button className="enquire-btn" onClick={handleOpenPopup}>
              Enquiry
            </button>
          </div>
        </div>
      </section>

      {/* Popup Form */}
      <PopupForm
        open={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleSubmitEnquiry}
      />
      {successMessage ? (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#10b981",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            zIndex: 1000,
            fontSize: 14,
            fontWeight: 600,
          }}
          role="status"
          aria-live="polite"
        >
          {successMessage}
        </div>
      ) : null}
    </div>
  );
};

export default BannerPage;
