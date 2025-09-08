"use client";
import React, { useState } from "react";

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
    buttonLabel: "Enquire",
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
    buttonLabel: "Enquire",
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
    buttonLabel: "Enquire",
  },
];

const VisaTabsAndCards = () => {
  const [activeTab, setActiveTab] = useState(0);

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
      minWidth: 450,
      maxWidth: 500,
      transition: "transform .12s",
    };

    if (index < 2) {
      return {
        ...baseStyle,
        transform: "scale(1.05)",
        zIndex: 10,
      };
    }

    return {
      ...baseStyle,
      transform: "scale(1)",
    };
  };

  return (
    <div
      style={{
        background: "#f7fcff",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
      }}
    >
      {/* Tabs */}
      <div
        style={{
          width: "100%",
          background: "#ededed",
          padding: 0,
          display: "flex",
          borderBottom: "1px solid #d8d8d8",
          fontFamily: "inherit",
        }}
      >
        {tabList.map((tab, idx) => (
          <div
            key={tab}
            onClick={() => setActiveTab(idx)}
            style={{
              flex: 1,
              textAlign: "center",
              fontWeight: 500,
              fontSize: 16,
              color: idx === activeTab ? "#111" : "#707070",
              borderBottom:
                idx === activeTab ? "3px solid #222" : "3px solid transparent",
              background: "none",
              cursor: "pointer",
              padding: "16px 0 13px 0",
              transition: "border 0.16s",
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          marginTop: 36,
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "inherit",
          padding: "0 20px",
        }}
      >
        {/* First Row */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {visaCards.slice(0, 2).map((card, idx) => (
            <div key={idx} style={getCardStyle(idx)}>
              {/* Header */}
              <div
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

              {/* Card Data */}
              <div
                style={{
                  padding: "16px 22px 6px 22px",
                  fontSize: 14,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {card.data.map((d) => (
                    <div
                      key={d.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 5,
                      }}
                    >
                      <span style={{ color: "#555", fontSize: 13 }}>
                        {d.label}
                      </span>
                      <span
                        style={{
                          fontWeight: d.label === "Visa Type" ? 600 : 700,
                          color: d.label === "Visa Type" ? "#222" : "#111",
                          fontSize: 14,
                        }}
                      >
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Fees Section */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    borderTop: "1.5px solid #ebebeb",
                    paddingTop: 12,
                    paddingBottom: 2,
                    paddingLeft: 2,
                    paddingRight: 2,
                    marginTop: 14,
                    minHeight: 55,
                    position: "relative",
                  }}
                >
                  {/* Fee columns */}
                  <div style={{ display: "flex", gap: 42, flex: 1 }}>
                    {/* Form Fee + Tax */}
                    <div style={{ minWidth: 100 }}>
                      <div
                        style={{
                          color: "#757575",
                          fontSize: 12,
                          fontWeight: 500,
                          marginBottom: 2,
                        }}
                      >
                        {card.fees[0].label}
                      </div>
                      <div
                        style={{ fontWeight: 700, color: "#222", fontSize: 18 }}
                      >
                        {card.fees[0].value}
                      </div>
                    </div>
                    {/* Processing Fee */}
                    <div style={{ minWidth: 100 }}>
                      <div
                        style={{
                          color: "#757575",
                          fontSize: 12,
                          fontWeight: 500,
                          marginBottom: 2,
                        }}
                      >
                        {card.fees[1].label}
                      </div>
                      <div
                        style={{ fontWeight: 700, color: "#222", fontSize: 18 }}
                      >
                        {card.fees[1].value}
                      </div>
                    </div>
                  </div>
                  {/* Pay At (Total) */}
                  <div
                    style={{
                      marginLeft: "auto",
                      color: "#111",
                      fontWeight: 900,
                      fontSize: 24,
                      textAlign: "right",
                      minWidth: 100,
                    }}
                  >
                    {card.fees[2].value}
                  </div>
                </div>
              </div>

              {/* Footer Button */}
              <div
                style={{
                  borderTop: "1.5px solid #ebebeb",
                  padding: "12px 22px",
                  display: "flex",
                  alignItems: "center",
                  background: "#fff",
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                }}
              >
                <span
                  style={{
                    color: "#00aff0",
                    fontWeight: 700,
                    fontSize: 16,
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
                    fontSize: 22,
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

        {/* Second Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {visaCards.slice(2).map((card, idx) => (
            <div key={idx + 2} style={getCardStyle(2)}>
              {/* Header */}
              <div
                style={{
                  background: "#000",
                  color: "#FFC700",
                  fontWeight: 700,
                  fontSize: 20,
                  padding: "16px 0 16px 26px",
                  display: "flex",
                  alignItems: "center",
                  borderTopLeftRadius: 18,
                  borderTopRightRadius: 18,
                }}
              >
                {card.title}
                {card.visaBadge && (
                  <span
                    style={{
                      background: "#ffcf32",
                      color: "#222",
                      fontWeight: 700,
                      fontSize: 13,
                      borderRadius: 5,
                      marginLeft: "auto",
                      marginRight: 20,
                      padding: "3px 11px",
                      letterSpacing: "1px",
                    }}
                  >
                    {card.visaBadge}
                  </span>
                )}
              </div>

              {/* Card Data */}
              <div
                style={{
                  padding: "19px 25px 7px 26px",
                  fontSize: 15,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {card.data.map((d) => (
                    <div
                      key={d.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ color: "#555" }}>{d.label}</span>
                      <span
                        style={{
                          fontWeight: d.label === "Visa Type" ? 600 : 700,
                          color: d.label === "Visa Type" ? "#222" : "#111",
                        }}
                      >
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Fees Section */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    borderTop: "1.5px solid #ebebeb",
                    paddingTop: 14,
                    paddingBottom: 2,
                    paddingLeft: 2,
                    paddingRight: 2,
                    marginTop: 16,
                    minHeight: 60,
                    position: "relative",
                  }}
                >
                  {/* Fee columns */}
                  <div style={{ display: "flex", gap: 52, flex: 1 }}>
                    {/* Form Fee + Tax */}
                    <div style={{ minWidth: 108 }}>
                      <div
                        style={{
                          color: "#757575",
                          fontSize: 13,
                          fontWeight: 500,
                          marginBottom: 2,
                        }}
                      >
                        {card.fees[0].label}
                      </div>
                      <div
                        style={{ fontWeight: 700, color: "#222", fontSize: 20 }}
                      >
                        {card.fees[0].value}
                      </div>
                    </div>
                    {/* Processing Fee */}
                    <div style={{ minWidth: 108 }}>
                      <div
                        style={{
                          color: "#757575",
                          fontSize: 13,
                          fontWeight: 500,
                          marginBottom: 2,
                        }}
                      >
                        {card.fees[1].label}
                      </div>
                      <div
                        style={{ fontWeight: 700, color: "#222", fontSize: 20 }}
                      >
                        {card.fees[1].value}
                      </div>
                    </div>
                  </div>
                  {/* Pay At (Total) */}
                  <div
                    style={{
                      marginLeft: "auto",
                      color: "#111",
                      fontWeight: 900,
                      fontSize: 28,
                      textAlign: "right",
                      minWidth: 100,
                    }}
                  >
                    {card.fees[2].value}
                  </div>
                </div>
              </div>

              {/* Footer Button */}
              <div
                style={{
                  borderTop: "1.5px solid #ebebeb",
                  padding: "13px 24px 11px 26px",
                  display: "flex",
                  alignItems: "center",
                  background: "#fff",
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                }}
              >
                <span
                  style={{
                    color: "#00aff0",
                    fontWeight: 700,
                    fontSize: 18,
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
                    fontSize: 25,
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
      </div>
    </div>
  );
};

export default VisaTabsAndCards;
