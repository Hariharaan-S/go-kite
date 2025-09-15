"use client";
import React from "react";

const BannerPage = () => {
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
                  width="13"
                  height="13"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                >
                  <path d="M6 0C2.686 0 0 2.686 0 6s2.686 6 6 6 6-2.686 6-6S9.314 0 6 0zm0 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z" />
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
                  width="13"
                  height="13"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                >
                  <circle cx="6" cy="6" r="6" />
                  <circle cx="6" cy="6" r="2" fill="#fff" />
                </svg>
                <span>1 Days - 2 Night</span>
              </div>
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
              <span>$ 290</span>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: "#7f8c8d",
                }}
              >
                /person
              </span>
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
