"use client";
import React, { useState } from "react";
import "./styles/dropdown.css";

const itineraryData = [
  {
    time: "Day 1 Malang (06.00 wIB)",
    title: "Explore Bromo 7 Spot",
    content: "", 
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
  { title: "Transport", content: "" },
  { title: "Guide", content: "" },
  { title: "Accommodation", content: "" },
  { title: "Documentations", content: "" },
  { title: "Ticketing", content: "" },
  { title: "Additional Services", content: "" },
];
const faqData = [
  { title: "Common Reasons for UK Visa Rejection and How to Avoid Them", content: "" },
  { title: "Why Choose to Go Kite Tours for Your UK Visa Application?", content: "" },
  { title: "UK Family Visa", content: "" },
  { title: "Essential UK Visa Requirements from India", content: "" },
];

const ItineraryAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const renderAccordion = (data, sectionName, useIcon = false) => {
    return (
      <div className="accordion">
        {data.map((item, idx) => (
          <div key={`${sectionName}_${idx}`}>
            <button
              className="accordion-item"
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
                <span className="icon-wrapper">
                  <img
                    src="/img/general/accordion.png"
                    alt="Accordion Icon"
                    className="accordion-icon"
                  />
                </span>
              ) : (
                <span className="dot"></span>
              )}
              <span className="time-title-wrap">
                <span className="summary-text">
                  {item.time ? `${item.time} - ` : ""}
                  {item.title}
                </span>
              </span>
              <svg
                viewBox="0 0 20 20"
                className={
                  openIndex === `${sectionName}_${idx}`
                    ? "arrow arrow-open"
                    : "arrow"
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
              className={
                openIndex === `${sectionName}_${idx}`
                  ? "details"
                  : "details hide"
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
    <div className="itinerary-container">
      {/* Itinerary Section */}
      <div className="title">Itinerary</div>
      <div className="desc">
        Starting from the meeting point for the rest of the group Bromo tour at
        Malang Train Station and ending at this point too. This trip begins
        after all participants gather and are ready to depart from Malang city
        at 01.30 AM, then will explore a total of 8 spots starting from the
        Bromo sunrise point. This tour includes transport, guide, documentation,
        and breakfast
      </div>
      {renderAccordion(itineraryData, "itinerary")}
      {/* What Included Section */}
      <div className="title">What Included</div>
      {renderAccordion(whatIncludedData, "included", true)}
      {/* FAQ Section */}
      <div className="title">FAQ's</div>
      {renderAccordion(faqData, "faq", true)}
    </div>
  );
};

export default ItineraryAccordion;
