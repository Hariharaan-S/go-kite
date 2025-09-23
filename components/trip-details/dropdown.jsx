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

const ItineraryAccordion = ({ holidaysDetails }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const getDescriptionNode = (item) => {
    if (Array.isArray(item?.descriptions)) {
      return item.descriptions.map((d, i) => (
        <p key={i}>{d?.text || ""}</p>
      ));
    }
    if (item?.descriptions?.text) return item.descriptions.text;
    if (Array.isArray(item?.description)) {
      return item.description.map((d, i) => (
        <p key={i}>{d?.text || ""}</p>
      ));
    }
    if (typeof item?.description === "string") return item.description;
    if (item?.content) return item.content;
    return "Information coming soon.";
  };

  const renderInclusions = (inclusions) => {
    const items = Array.isArray(inclusions) ? inclusions : [];
    return (
      <div className="accordion">
        {items.map((inc, idx) => (
          <div key={`included_${idx}`}>
            <button
              className="accordion-item"
              onClick={() =>
                setOpenIndex(
                  openIndex === `included_${idx}` ? null : `included_${idx}`
                )
              }
              aria-expanded={openIndex === `included_${idx}`}
            >
              <span className="icon-wrapper">
                <img
                  src="/img/general/accordion.png"
                  alt="Accordion Icon"
                  className="accordion-icon"
                />
              </span>
              <span className="time-title-wrap">
                <span className="summary-text">{inc?.title || "Included"}</span>
              </span>
              <svg
                viewBox="0 0 20 20"
                className={
                  openIndex === `included_${idx}` ? "arrow arrow-open" : "arrow"
                }
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={openIndex === `included_${idx}` ? "details" : "details hide"}>
              {Array.isArray(inc?.description)
                ? inc.description.map((d, i) => <p key={i}>{d?.text || ""}</p>)
                : (inc?.description || "")}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFaqs = (faqs) => {
    const items = Array.isArray(faqs) ? faqs : [];
    return (
      <div className="accordion">
        {items.map((faq, idx) => (
          <div key={`faq_${idx}`}>
            <button
              className="accordion-item"
              onClick={() =>
                setOpenIndex(openIndex === `faq_${idx}` ? null : `faq_${idx}`)
              }
              aria-expanded={openIndex === `faq_${idx}`}
            >
              <span className="icon-wrapper">
                <img
                  src="/img/general/accordion.png"
                  alt="Accordion Icon"
                  className="accordion-icon"
                />
              </span>
              <span className="time-title-wrap">
                <span className="summary-text">{faq?.question || "Question"}</span>
              </span>
              <svg
                viewBox="0 0 20 20"
                className={
                  openIndex === `faq_${idx}` ? "arrow arrow-open" : "arrow"
                }
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={openIndex === `faq_${idx}` ? "details" : "details hide"}>
              {(Array.isArray(faq?.answers) ? faq.answers : []).map((a, i) => (
                <p key={i}>{a?.text || ""}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAccordion = (data, sectionName, useIcon = false) => {
    const safeData = Array.isArray(data) ? data : [];
    return (
      <div className="accordion">
        {safeData.map((item, idx) => (
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
                  {item?.title || item?.time || "Details"}
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
              {getDescriptionNode(item)}
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
        {holidaysDetails?.cardJson?.itineraryMainDescription || "Itinerary details will be available shortly."}
      </div>
      {renderAccordion(holidaysDetails?.cardJson?.itineraries, "itinerary")}
      {/* What Included Section */}
      <div className="title">What Included</div>
      {renderInclusions(holidaysDetails?.cardJson?.inclusions)}
      {/* FAQ Section */}
      <div className="title">FAQ's</div>
      {renderFaqs(holidaysDetails?.cardJson?.faqs)}
    </div>
  );
};

export default ItineraryAccordion;
