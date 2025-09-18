"use client";
import React, { useState } from "react";
import PopupForm from "./popup/popup";
import "./styles/banner.css";

const NavbarHeightMobile = 76; // px -- adjust based on your actual navbar

const BannerPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleSubmitEnquiry = (formData) => {
    console.log("Enquiry submitted:", formData);
  };

  return (
    <div className="banner-container">
      <section className="banner-section">
        <div className="banner-card">
          {/* Left Images Grid */}
          <div className="images-grid">
            {/* Main large image */}
            <div className="main-image">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80"
                alt="Main mountain"
              />
              <span className="badge">RECOMMENDED</span>
            </div>

            {/* Top right image */}
            <div className="small-image">
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=300&q=80"
                alt="Mountain view 1"
              />
            </div>

            {/* Bottom right image */}
            <div className="small-image">
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=300&q=80"
                alt="Mountain view 2"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="right-content">
            <h2>Bromo Mountain</h2>

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
                <span>Dubai, Desert</span>
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
                <span>1 Days - 2 Night</span>
              </div>
            </div>

            <div className="rating-row">
              <div className="rating-value">4.7</div>
              <span>Excellent</span>
            </div>

            <div className="price">AED 1,120</div>

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
    </div>
  );
};

export default BannerPage;
