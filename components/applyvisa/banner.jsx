import React from "react";

const Banner = () => {
  return (
    <section
      style={{
        width: "100%",
        background: "#def2fd",
        minHeight: 280,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 0 0 3%",
        boxSizing: "border-box",
      }}
    >
      {/* Left Side: Title and Subtitle */}
      <div
        style={{
          flex: "1 1 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: 120,
          height: "100%",
        }}
      >
        <h1 style={{
          fontSize: 32,
          color: "#111",
          fontWeight: 600,
          margin: 0,
          letterSpacing: "-0.5px",
        }}>
          Apply for UAE Visa Online
        </h1>
        <p style={{
          fontSize: 15,
          color: "#374151",
          margin: "10px 0 0 0",
          fontWeight: 400,
          letterSpacing: 0,
        }}>
          Get your Visa by <b>7 June 2025</b>, if applied today
        </p>
      </div>

      {/* Right Side: Banner Illustration */}
      <div
        style={{
          flex: "1 1 0",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          minWidth: 0,
          height: 120,
        }}
      >
        <img
          src="/img/general/banner-right.png" // Update this path to your actual image
          alt="UAE Visa Banner"
          style={{
            maxHeight: 280,
            maxWidth: "100%",
            objectFit: "contain",
            display: "block",
            marginRight: "3%",
          }}
        />
      </div>
    </section>
  );
};

export default Banner;
