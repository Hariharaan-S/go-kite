"use client";
import React, { useState, useEffect } from "react";

const StepVisa = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define responsive breakpoints
  const isMobile = windowWidth <= 640;
  const isTablet = windowWidth > 640 && windowWidth <= 1024;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1400px",
        height: isMobile ? "auto" : "400px",
        background:
          "linear-gradient(135deg, #e8f4fd 0%, #d1e9f8 50%, #b8ddf4 100%)",
        borderRadius: "20px",
        padding: isMobile ? "20px 20px" : isTablet ? "30px 40px" : "40px 60px",
        position: "relative",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "center" : "flex-start",
        justifyContent: "space-between",
      }}
    >
      {/* Left Content */}
      <div
        style={{
          flex: "1",
          paddingRight: isMobile ? "0" : "40px",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        {/* Main Heading */}
        <h1
          style={{
            fontSize: isMobile ? "32px" : "48px",
            fontWeight: "700",
            color: "#1e88c7",
            margin: "0 0 10px 0",
            lineHeight: "1.1",
          }}
        >
          Get Visa in 3
        </h1>

        <h2
          style={{
            fontSize: isMobile ? "32px" : "48px",
            fontWeight: "700",
            color: "#1e88c7",
            margin: "0 0 40px 0",
            lineHeight: "1.1",
          }}
        >
          simple steps
        </h2>

        {/* Subheading */}
        <h3
          style={{
            fontSize: isMobile ? "20px" : "32px",
            fontWeight: "600",
            color: "#2c3e50",
            margin: "0 0 15px 0",
            lineHeight: "1.2",
          }}
        >
          Upload your Documents we take care of the Process
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: isMobile ? "14px" : "20px",
            color: "#5a6c7d",
            margin: "0",
            fontWeight: "400",
          }}
        >
          get Visa in 24 Hours through express visa service
        </p>
      </div>

      {/* Right Side Icons */}
      <div
        style={{
          position: isMobile ? "relative" : "absolute",
          top: isMobile ? "auto" : "20px",
          right: isMobile ? "auto" : "60px",
          display: "flex",
          flexDirection: isMobile ? "row" : "row", // Ensure consistent row layout
          gap: isMobile ? "15px" : "20px",
          marginTop: isMobile ? "20px" : "0",
          justifyContent: "center",
          alignItems: "center", // Center align items
          flexWrap: isMobile ? "wrap" : "nowrap", // Allow wrapping on mobile
          width: isMobile ? "100%" : "auto",
          zIndex: 3,
        }}
      >
        {[
          ["/img/general/upload.png", "Upload\ndocuments"],
          ["/img/general/approval.png", "Get\napproval"],
          ["/img/general/receive-visa.png", "Receive\nVisa"],
        ].map(([src, text], idx) => (
          <div
            key={idx}
            style={{
              width: isMobile ? "80px" : "80px", // Consistent width
              height: isMobile ? "80px" : "80px", // Consistent height
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              padding: isMobile ? "10px" : "10px",
              fontSize: isMobile ? "12px" : "10px",
              color: "#5a6c7d",
              fontWeight: "500",
              whiteSpace: "pre-line",
              textAlign: "center",
              transition: "transform 0.2s ease", // Add subtle hover effect
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={src}
              alt={`Icon ${idx + 1}`}
              style={{
                width: isMobile ? "40px" : "40px",
                height: isMobile ? "40px" : "40px",
                marginBottom: "5px",
                objectFit: "contain", // Ensure image maintains aspect ratio
              }}
            />
            {text}
          </div>
        ))}
      </div>

      {/* Bottom Right Image */}
      <div
        style={{
          position: isMobile ? "relative" : "absolute",
          bottom: isMobile ? "auto" : "0",
          right: isMobile ? "auto" : "0",
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-end",
          marginTop: isMobile ? "20px" : "0",
          width: isMobile ? "100%" : "200px",
          height: isMobile ? "auto" : "280px",
          paddingTop: isMobile ? "0" : "100px",
        }}
      >
        <img
          src="/img/general/img.png"
          alt="Character"
          style={{
            width: isMobile ? "150px" : "100%",
            height: isMobile ? "auto" : "100%",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

const CenteredVisaSection = () => (
  <section
    style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f0f4fa",
      padding: "20px",
    }}
  >
    <StepVisa />
  </section>
);

export default CenteredVisaSection;
