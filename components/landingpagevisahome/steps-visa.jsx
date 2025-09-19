"use client";
import React, { useState, useEffect } from "react";

const StepVisa = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const isMobile = windowWidth <= 640;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1400px",
        minHeight: isMobile ? "auto" : "400px",
        background: "#eaf5fb",
        borderRadius: "18px",
        padding: isMobile ? "20px 20px 20px 20px" : "40px 60px 30px 40px",
        position: "relative",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "center" : "flex-start",
      }}
    >
      {/* Left Content */}
      <div
        style={{
          flex: 1,
          paddingRight: isMobile ? "0" : "40px",
          textAlign: isMobile ? "center" : "left",
          zIndex: 10,
        }}
      >
        {/* Top Titles */}
        <div
          style={{
            marginBottom: isMobile ? 12 : 16,
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: isMobile ? 29 : 32,
              fontWeight: 600,
              color: "#168AAA",
              lineHeight: 1.1,
              marginBottom: 4,
              userSelect: "none",
            }}
          >
            Get Visa in 3
          </span>
          <span
            style={{
              display: "block",
              fontSize: isMobile ? 18 : 22,
              fontWeight: 300,
              color: "#379BB4",
              letterSpacing: 0.4,
              lineHeight: 1.1,
              userSelect: "none",
            }}
          >
            simple steps
          </span>
        </div>

        {/* Main Heading/Subheading */}
        <div>
          <div
            style={{
              fontSize: isMobile ? 17 : 21,
              fontWeight: 700,
              color: "#242E3D",
              marginBottom: isMobile ? 10 : 14,
              lineHeight: 1.2,
            }}
          >
            Upload your Documents we take care of the Process
          </div>
          <p
            style={{
              fontSize: isMobile ? 15 : 18,
              fontWeight: 400,
              color: "#5A6C7D",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            get Visa in 24 Hours through express visa service
          </p>
        </div>
      </div>

      {/* Step Icons Top Right */}
      <div
        style={{
          position: isMobile ? "relative" : "absolute",
          top: isMobile ? "auto" : 20,
          right: isMobile ? "auto" : 60,
          display: "flex",
          flexDirection: "row",
          gap: isMobile ? 12 : 20,
          marginTop: isMobile ? 20 : 0,
          justifyContent: "center",
          alignItems: "center",
          flexWrap: isMobile ? "wrap" : "nowrap",
          width: isMobile ? "100%" : "auto",
          zIndex: 15,
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
              width: 80,
              height: 80,
              // backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              // boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              padding: 10,
              fontSize: isMobile ? 12 : 10,
              color: "#5a6c7d",
              fontWeight: 500,
              whiteSpace: "pre-line",
              textAlign: "center",
              transition: "transform 0.2s ease",
              cursor: "pointer",
              userSelect: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={src}
              alt={`Icon ${idx + 1}`}
              style={{
                width: 40,
                height: 40,
                marginBottom: 6,
                objectFit: "contain",
                userSelect: "none",
                pointerEvents: "none",
              }}
              draggable={false}
            />
            {text}
          </div>
        ))}
      </div>

      {/* Bottom Right Image */}
      <div
        style={{
          position: isMobile ? "relative" : "absolute",
          bottom: isMobile ? "auto" : 0,
          right: isMobile ? "auto" : 0,
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-end",
          marginTop: isMobile ? 20 : 0,
          width: isMobile ? "100%" : 200,
          height: isMobile ? "auto" : 280,
          paddingTop: isMobile ? 0 : 100,
          userSelect: "none",
          zIndex: 5,
        }}
      >
        <img
          src="/img/general/img.png"
          alt="Character"
          style={{
            width: isMobile ? 150 : "100%",
            height: isMobile ? "auto" : "100%",
            objectFit: "contain",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable={false}
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
