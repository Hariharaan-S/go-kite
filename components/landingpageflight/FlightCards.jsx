"use client";
import React from "react";

const FlightCards = () => {
  const flightData = [
    {
      from: "Dhaka",
      fromSub: "Hazrat Shahjalal...",
      to: "Sylhet",
      toSub: "Osman International...",
    },
    {
      from: "Dhaka",
      fromSub: "Hazrat Shahjalal...",
      to: "Barisal",
      toSub: "Barisal Airport",
      highlighted: true,
    },
    {
      from: "Dhaka",
      fromSub: "Hazrat Shahjalal...",
      to: "Chattogram",
      toSub: "Shah Amanat Inter...",
    },
    {
      from: "Dhaka",
      fromSub: "Hazrat Shahjalal...",
      to: "Chattogram",
      toSub: "Shah Amanat Inter...",
    },
    {
      from: "Dhaka",
      fromSub: "Hazrat Shahjalal...",
      to: "Jashore",
      toSub: "Jashore Airport",
    },
    {
      from: "Dhaka",
      fromSub: "Hazrat Shahjalal...",
      to: "Barisal",
      toSub: "Barisal Airport",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "1300px",
        margin: "0 auto",
        padding: "20px 10px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#1f2937",
            margin: "0",
          }}
        >
          Top Domestic & International Flight
        </h1>

        <div
          style={{
            display: "flex",
            gap: "0",
          }}
        >
          <button
            style={{
              backgroundColor: "#0891b2",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "25px 0 0 25px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Domestic
          </button>
          <button
            style={{
              backgroundColor: "#f3f4f6",
              color: "#6b7280",
              border: "none",
              padding: "10px 20px",
              borderRadius: "0 25px 25px 0",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            International
          </button>
        </div>
      </div>

      {/* Flight Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {flightData.map((flight, index) => (
          <div
            key={index}
            style={{
              backgroundColor: flight.highlighted ? "#ffffff" : "#e5e7eb",
              border: flight.highlighted
                ? "2px solid #0891b2"
                : "1px solid #d1d5db",
              borderRadius: "12px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: flight.highlighted
                ? "0 4px 12px rgba(8, 145, 178, 0.1)"
                : "none",
            }}
          >
            {/* From Location */}
            <div style={{ flex: "1" }}>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "4px",
                }}
              >
                {flight.from}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                {flight.fromSub}
              </div>
            </div>

            {/* Flight Icon */}
            <div
              style={{
                margin: "0 20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/img/general/flight-icon.png"
                alt="Flight"
                style={{
                  width: "24px",
                  height: "24px",
                  opacity: "0.7",
                }}
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "inline-block";
                }}
              />
              <span
                style={{
                  display: "none",
                  fontSize: "18px",
                  color: "#0891b2",
                }}
              >
                ✈️
              </span>
            </div>

            {/* To Location */}
            <div
              style={{
                flex: "1",
                textAlign: "right",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "4px",
                }}
              >
                {flight.to}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                {flight.toSub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div
        style={{
          textAlign: "center",
        }}
      >
        <a
          href="#"
          style={{
            color: "#6b7280",
            fontSize: "14px",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          View All →
        </a>
      </div>
    </div>
  );
};

export default FlightCards;
