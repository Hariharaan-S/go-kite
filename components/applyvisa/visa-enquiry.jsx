"use client";
import React, { useState } from "react";
import "./styles/visa-enquiry.styles.css"; // Import the new stylesheet
import { useRouter } from "next/navigation";
import PopupForm from "./popup/popup"; // Adjust path as needed

const tabList = ["Types Of visa", "Visa Process", "Visa Eligibility", "FAQ"];

const visaCards = [
  {
    title: "30 Days Tourist Visa",
    visaBadge: null,
    data: [
      { label: "Visa Type", value: "eVisa" },
      { label: "Stay Duration", value: "30 Days" },
      { label: "Visa validity", value: "60 Days" },
      { label: "Processing time", value: "5 Working Days" },
    ],
    fees: [
      { label: "Form Fee + Tax", value: "₹6,000" },
      { label: "Processing Fee", value: "₹350" },
      { label: "Pay at", value: "₹6,350", strong: true },
    ],
    buttonLabel: "Enquiry",
  },
  {
    title: "30 Days Tourist Visa",
    visaBadge: "Express Tourist VISA",
    data: [
      { label: "Visa Type", value: "eVisa" },
      { label: "Stay Duration", value: "30 Days" },
      { label: "Visa validity", value: "60 Days" },
      { label: "Processing time", value: "2 Working Days" },
    ],
    fees: [
      { label: "Form Fee + Tax", value: "₹6,350" },
      { label: "Express Processing Fee", value: "₹4,350" },
      { label: "Pay at", value: "₹10,900", strong: true },
    ],
    buttonLabel: "Enquiry",
  },
  {
    title: "90 Days Tourist Visa",
    visaBadge: null,
    data: [
      { label: "Visa Type", value: "eVisa" },
      { label: "Stay Duration", value: "90 Days" },
      { label: "Visa validity", value: "120 Days" },
      { label: "Processing time", value: "5 Working Days" },
    ],
    fees: [
      { label: "Form Fee + Tax", value: "₹8,000" },
      { label: "Processing Fee", value: "₹4,350" },
      { label: "Pay at", value: "₹12,350", strong: true },
    ],
    buttonLabel: "Enquiry",
  },
];

const VisaTabsAndCards = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const router = useRouter();

  const getCardStyle = (index) => {
    const baseStyle = {
      background: "#fff",
      borderRadius: 18,
      boxShadow: "0 4px 16px 0 rgba(32,67,114,0.07)",
      minHeight: 266,
      marginBottom: 12,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      // maxWidth: 500,
      transition: "transform .12s",
    };

    return {
      ...baseStyle,
      transform: "scale(1)",
    };
  };

  const handleEnquire = () => setPopupOpen(true);

  const handleFormSubmit = (data) => {
    // Handle form data (send to API, etc.)
    console.log("Form submitted:", data);
  };

  return (
    <div
      className="visa-enquiry-container"
      style={{
        background: "#f7fcff",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
      }}
    >
      {/* Tabs */}
      <div
        className="visa-tabs-container"
        style={{
          width: "100%",
          padding: '0 16rem',
          background: "#ededed",
          display: "flex",
          borderBottom: "1px solid #d8d8d8",
          fontFamily: "inherit",
          flexWrap: "wrap",
          overflowX: "auto",
        }}
      >
        {tabList.map((tab, idx) => (
          <div
            key={tab}
            onClick={() => setActiveTab(idx)}
            className="visa-tab"
            style={{
              flex: "1 0 auto",
              textAlign: "center",
              fontWeight: idx === activeTab ? 700 : 500,
              fontSize: 16,
              color: idx === activeTab ? "#111" : "#707070",
              borderBottom:
                idx === activeTab ? "3px solid #FFC700" : "3px solid transparent",
              background: "none",
              cursor: "pointer",
              padding: "16px 12px",
              transition: "border 0.16s",
              minWidth: 100,
              whiteSpace: "nowrap",
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Cards */}
      <div
        className="visa-cards-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "2rem",
          marginTop: 16,
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "inherit",
          padding: "2rem 12rem",
        }}
      >
        {visaCards.map((card, idx) => (
          <div
            key={idx}
            className="visa-card"
            style={{
              ...getCardStyle(idx),
              width: "100%", // Adjust width for two cards
              margin: "0 auto",
            }}
          >
            {/* Card Header */}
            <div
              className="visa-card-header"
              style={{
                background: "#000",
                color: "#FFC700",
                fontWeight: 700,
                fontSize: 18,
                padding: "14px 0 14px 22px",
                display: "flex",
                alignItems: "center",
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
              }}
            >
              {card.title}
              {card.visaBadge && (
                <span
                  className="visa-card-header-badge"
                  style={{
                    background: "#ffcf32",
                    color: "#222",
                    fontWeight: 700,
                    fontSize: 12,
                    borderRadius: 5,
                    marginLeft: "auto",
                    marginRight: 18,
                    padding: "2px 9px",
                    letterSpacing: "1px",
                  }}
                >
                  {card.visaBadge}
                </span>
              )}
            </div>

            {/* Card Content */}
            <div
              className="visa-card-content"
              style={{
                padding: "0", // Reduced padding
                fontSize: 14,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Card Data */}
              <div style={{ padding: "10px 22px", flexGrow: 1 }}>
                {card.data.map((d) => (
                  <div
                    key={d.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <span style={{ color: "#555", fontSize: 12 }}>
                      {d.label}
                    </span>
                    <span
                      style={{
                        fontWeight: d.label === "Visa Type" ? 600 : 700,
                        color: d.label === "Visa Type" ? "#222" : "#111",
                        fontSize: 13, // Slightly smaller font
                      }}
                    >
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Fees Section */}
              <div
                className="visa-card-fees"
                style={{
                  display: "flex",
                  flexDirection: "row", // Stack fees vertically on mobile
                  alignItems: "stretch",
                  borderTop: "1.5px solid #ebebeb",
                  padding: "10px 22px",
                  marginTop: 14,
                  gap: 10, // Space between fee items
                }}
              >
                {/* Fee Items */}
                {card.fees.slice(0, 2).map((fee) => (
                  <div
                    key={fee.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        color: "#757575",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    >
                      {fee.label}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#222",
                        fontSize: 16,
                      }}
                    >
                      {fee.value}
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    fontWeight: 900,
                    color: "#111",
                    fontSize: 20,
                    marginLeft: "auto",
                  }}
                >
                  {card.fees[2].value}
                </div>
              </div>
            </div>

            {/* Footer Button */}
            <div
              className="visa-card-footer"
              style={{
                borderTop: "1.5px solid #ebebeb",
                padding: "10px 16px", // Reduced padding
                display: "flex",
                alignItems: "center",
                background: "#fff",
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
              }}
              onClick={handleEnquire}
            >
              <span
                className="visa-card-footer-text"
                style={{
                  color: "#007f9b",
                  fontWeight: 900,
                  fontSize: 20, // Slightly smaller font
                  letterSpacing: "0.2px",
                  cursor: "pointer",
                }}
              >
                {card.buttonLabel}
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  color: "#f5be23",
                  fontWeight: "bold",
                  fontSize: 20,
                  verticalAlign: "middle",
                  transform: "translateY(1px)",
                }}
              >
                &rsaquo;
              </span>
            </div>
          </div>
        ))}
      </div>
      <PopupForm open={popupOpen} onClose={() => setPopupOpen(false)} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default VisaTabsAndCards;
