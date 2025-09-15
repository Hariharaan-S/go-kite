"use client";
import React, { useState } from "react";

const itineraryData = [
  {
    time: "Day 1 Malang (06.00 wIB)",
    title: "Explore Bromo 7 Spot",
    content: "", // Add any content to show when expanded, else leave empty for screenshot match
  },
  {
    time: "Day 1 Malang (11.00 wIB)",
    title: "Back to Rest Area",
    content: "",
  },
  {
    time: "Day 1 Malang (14.00 wIB)",
    title: "Drop point to Malang city",
    content: "",
  },
];

const whatIncludedData = [
  {
    title: "Transport",
    content: "",
  },
  {
    title: "Guide",
    content: "",
  },
  {
    title: "Accommodation",
    content: "",
  },
  {
    title: "Documentations",
    content: "",
  },
  {
    title: "Ticketing",
    content: "",
  },
  {
    title: "Additional Services",
    content: "",
  },
];

const faqData = [
  {
    title: "Common Reasons for UK Visa Rejection and How to Avoid Them",
    content: "",
  },
  {
    title: "Why Choose to Go Kite Tours for Your UK Visa Application?",
    content: "",
  },
  {
    title: "UK Family Visa",
    content: "",
  },
  {
    title: "Essential UK Visa Requirements from India",
    content: "",
  },
];

const ItineraryAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Inline styles
  const styles = {
    container: {
      maxWidth: 1250,
      margin: "40px auto",
      borderRadius: 14,
      fontFamily: "'Inter', Arial, Helvetica, sans-serif",
      padding: "32px 28px 16px 28px",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#18181B",
      letterSpacing: 0.2,
    },
    desc: {
      color: "#52525B",
      fontSize: 18,
      marginBottom: 18,
      lineHeight: 1.5,
    },
    accordion: {
      width: "100%",
      margin: 0,
      marginBottom: 40,
    },
    item: {
      display: "flex",
      alignItems: "center",
      border: "none",
      borderBottom: "1px solid #F1F1F2",
      padding: "0 0 0 6px",
      background: "none",
      width: "100%",
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "#18181B",
      display: "inline-block",
      marginRight: 18,
      minWidth: 10,
    },
    timeTitleWrap: {
      flexGrow: 1,
      fontSize: 18,
      textAlign: "left",
      padding: "17px 0",
    },
    summaryText: {
      fontSize: 18,
      fontWeight: 500,
      color: "#18181B",
    },
    arrow: {
      transition: "transform 0.2s cubic-bezier(0.4,0,0.2,1)",
      marginLeft: 12,
      width: 24,
      height: 24,
      color: "#A1A1AA",
    },
    arrowOpen: {
      transform: "rotate(180deg)",
      color: "#22578c",
    },
    details: {
      maxHeight: 200,
      overflow: "hidden",
      background: "transparent",
      color: "#52525B",
      fontSize: 14,
      marginLeft: 36,
      marginRight: 0,
      marginBottom: 10,
      transition: "max-height 0.28s cubic-bezier(0.4,0,0.2,1)",
    },
    hide: {
      maxHeight: 0,
      overflow: "hidden",
      padding: 0,
      margin: 0,
      border: "none",
    },
    iconWrapper: {
      width: 24,
      height: 24,
      marginRight: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    accordionIcon: {
      width: 20,
      height: 20,
      objectFit: "contain",
    },
    // Responsive
    "@media (max-width: 600px)": {
      container: {
        padding: "18px 8px 6px 8px",
      },
      title: {
        fontSize: 17,
      },
      item: {
        paddingLeft: 0,
      },
      timeTitleWrap: {
        padding: "14px 0",
      },
    },
  };

  // Render accordion function
  const renderAccordion = (data, sectionName, useIcon = false) => {
    return (
      <div style={styles.accordion}>
        {data.map((item, idx) => (
          <div key={`${sectionName}_${idx}`}>
            <button
              style={styles.item}
              onClick={() =>
                setOpenIndex(
                  openIndex === `${sectionName}_${idx}`
                    ? null
                    : `${sectionName}_${idx}`
                )
              }
              aria-expanded={openIndex === `${sectionName}_${idx}`}
            >
              {useIcon ? (
                <span style={styles.iconWrapper}>
                  <img
                    src="/img/general/accordion.png"
                    alt="Accordion Icon"
                    style={styles.accordionIcon}
                  />
                </span>
              ) : (
                <span style={styles.dot}></span>
              )}
              <span style={styles.timeTitleWrap}>
                <span style={styles.summaryText}>
                  {item.time ? `${item.time} - ` : ""}
                  {item.title}
                </span>
              </span>
              <svg
                viewBox="0 0 20 20"
                style={
                  openIndex === `${sectionName}_${idx}`
                    ? { ...styles.arrow, ...styles.arrowOpen }
                    : styles.arrow
                }
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M6 8l4 4 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              style={
                openIndex === `${sectionName}_${idx}`
                  ? styles.details
                  : { ...styles.details, ...styles.hide }
              }
            >
              {item.content}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Itinerary Section */}
      <div style={styles.title}>Itinerary</div>
      <div style={styles.desc}>
        Starting from the meeting point for the rest of the group Bromo tour at
        Malang Train Station and ending at this point too. This trip begins
        after all participants gather and are ready to depart from Malang city
        at 01.30 AM, then will explore a total of 8 spots starting from the
        Bromo sunrise point. This tour includes transport, guide, documentation,
        and breakfast
      </div>
      {renderAccordion(itineraryData, "itinerary")}

      {/* What Included Section */}
      <div style={styles.title}>What Included</div>
      {renderAccordion(whatIncludedData, "included", true)}

      {/* FAQ Section */}
      <div style={styles.title}>FAQ's</div>
      {renderAccordion(faqData, "faq", true)}
    </div>
  );
};

export default ItineraryAccordion;
