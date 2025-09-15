"use client";
import React, { useState } from "react";
import PopupForm from "./popup/popup";

const BannerPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmitEnquiry = (formData) => {
    // Here you can add logic to handle form submission
    console.log("Enquiry submitted:", formData);
    // Optionally send data to backend, show success message, etc.
  };

  const containerStyle = {
    width: "100%",
    maxWidth: 1600, // Increased max width for larger screens
    margin: "0 auto", // Center the container
    padding: "0 15px", // Side padding for smaller screens
    boxSizing: "border-box",
  };

  const sectionStyle = {
    width: "100%",
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "42px 0",
    boxSizing: "border-box",
    background: "transparent",
    fontFamily: "'Inter', Arial, sans-serif",
  };

  const cardStyle = {
    width: "95%",
    maxWidth: 1400,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.10)",
    display: "flex",
    overflow: "hidden",
    minHeight: 420,
  };

  return (
    <div style={containerStyle}>
      <section style={sectionStyle}>
        <div style={cardStyle}>
          {/* Left Images Grid */}
          <div
            style={{
              width: "62%",
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gridTemplateRows: "1fr 1fr",
              gap: 10,
              padding: 16,
              position: "relative",
              background: "#f7fafc",
            }}
          >
            {/* Main large image */}
            <div
              style={{
                gridColumn: "1 / 2",
                gridRow: "1 / 3",
                position: "relative",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80"
                alt="Main mountain"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 16,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  background: "#4A90E2",
                  color: "#fff",
                  padding: "5px 12px",
                  borderRadius: 5,
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                }}
              >
                RECOMMENDED
              </span>
            </div>

            {/* Top right image */}
            <div style={{ gridColumn: "2 / 3", gridRow: "1 / 2" }}>
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=300&q=80"
                alt="Mountain view 1"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 16,
                }}
              />
            </div>

            {/* Bottom right image */}
            <div style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=300&q=80"
                alt="Mountain view 2"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 16,
                }}
              />
            </div>
          </div>

          {/* Right Content */}
          <div
            style={{
              width: "38%",
              padding: "38px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: 9,
                fontWeight: 700,
                fontSize: 27,
                color: "#2c3e50",
                lineHeight: 1.18,
              }}
            >
              Bromo Mountain
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginBottom: 20,
                fontSize: 15,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "#7f8c8d",
                }}
              >
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

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "#7f8c8d",
                }}
              >
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

            <div
  style={{
    display: "flex",            // put items side-by-side
    alignItems: "center",       // vertical centering
    gap: 6                      // space between rating and text
  }}
>
  <div
    style={{
      background: "orange",
      color: "white",
      padding: "3px 8px",
      borderRadius: 4,
      fontSize: 13,
      fontWeight: 600,
      maxWidth: "35px",
      textAlign: "center"
    }}
  >
    4.7
  </div>
  <span>Excellent</span>
</div>


            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: "#2c3e50",
                marginBottom: 24,
                display: "flex",
                alignItems: "baseline",
                gap: 6,
              }}
            >
              <span>AED 1,120</span>
              {/* <span
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: "#7f8c8d",
                }}
              >
                /person
              </span> */}
            </div>

            <button
              style={{
                background: "#f39c12",
                color: "black",
                fontWeight: 600,
                fontSize: 15,
                padding: "13px 28px",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                outline: "none",
                alignSelf: "flex-start",
              }}
              onClick={handleOpenPopup}
              onMouseEnter={(e) => {
                e.target.style.background = "#e67e22";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#f39c12";
              }}
            >
              Enquire
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

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1200px) {
          section > div {
            flex-direction: column;
          }
          
          section > div > div:first-child {
            width: 100% !important;
          }
          
          section > div > div:last-child {
            width: 100% !important;
            padding: 22px !important;
          }
        }

        @media (max-width: 768px) {
          section {
            padding: 15px 0 !important;
          }
          
          section > div > div:first-child {
            height: 220px !important;
            grid-template-columns: 1fr !important;
            grid-template-rows: 1fr !important;
          }
          
          section > div > div:first-child > div:not(:first-child) {
            display: none;
          }
          
          h2 {
            font-size: 20px !important;
          }
          
          button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default BannerPage;
