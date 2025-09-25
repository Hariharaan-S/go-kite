"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./styles/ApplyVisa.css";
import PopupForm from "./popup/popup";

const ApplyVisa = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const router = useRouter();

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleEnquire = () => setPopupOpen(true);

  const handlePopupClose = () => setPopupOpen(false);

  const handleFormSubmit = (formData) => {
    console.log("Form submitted:", formData);
    // TODO: Implement actual form submission logic
    // You might want to send this data to a backend API
    // For now, we'll just log it and close the popup
    setPopupOpen(false);
  };

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

  const steps = [
    {
      number: 1,
      title: "Today",
      subtitle: "31 May 2025",
      icon: (
        <Image
          src="/img/general/applyvisa/1.png"
          alt="Book Documents"
          width={50}
          height={50}
        />
      ),
      color: "#FFA500",
      type: "date",
    },
    {
      number: 2,
      title: "Submit Information",
      subtitle: "Share travel details and your information",
      icon: (
        <Image
          src="/img/general/applyvisa/2.png"
          alt="Submit Information"
          width={50}
          height={50}
        />
      ),
      color: "#00BFFF",
      type: "process",
    },
    {
      number: 3,
      title: "Completing Visa Process",
      subtitle: "Relax as we deliver your Visa Stress Free",
      icon: (
        <Image
          src="/img/general/applyvisa/3.png"
          alt="Visa Process"
          width={50}
          height={50}
        />
      ),
      color: "#9C27B0",
      type: "process",
    },
    {
      number: 4,
      title: "8 June 2025",
      subtitle: "Get Visa By",
      icon: (
        <Image
          src="/img/general/applyvisa/4.png"
          alt="Visa Approval"
          width={50}
          height={50}
        />
      ),
      color: "#32CD32",
      type: "date",
    },
  ];

  const documents = [
    "Passport Front Page",
    "Passport Back Page",
    "Flight Ticket",
    "Pan Card",
    "Hotel Booking",
    "Passport size Photo",
  ];

  const faqData = [
    {
      question: "Common Reasons for UK Visa Rejection and How to Avoid Them",
      answer:
        "The most common reasons for UK visa rejection include insufficient financial documentation, incomplete application forms, lack of travel history, and inadequate proof of ties to home country. To avoid rejection, ensure all documents are complete, provide clear financial evidence, demonstrate strong ties to your home country, and submit accurate information.",
    },
    {
      question: "Why Choose to Go Kite Tours for Your UK Visa Application?",
      answer:
        "Go Kite Tours offers expert visa consultation services with a high success rate. Our experienced team provides personalized guidance, document review, and application support. We have extensive knowledge of visa requirements and help streamline the application process for a smoother experience.",
    },
    {
      question: "UK Family Visa",
      answer:
        "UK Family Visa allows you to join family members already living in the UK, such as a spouse, civil partner, unmarried partner, or other eligible family members. Key requirements include meeting English language requirements, demonstrating adequate financial support, and proving the genuine nature of your relationship. You must also meet health requirements and not have any criminal convictions that could affect your application. Processing times vary, and you may be permitted to apply for settlement (indefinite leave to remain, ILR). Some applicants may be able to apply while in the UK if they meet the requirements and are already on another type of visa.",
    },
    {
      question: "Essential UK Visa Documents for Indian Citizens",
      answer:
        "Essential documents include a valid passport, completed visa application form, passport-sized photographs, financial documents (bank statements, salary slips, ITR), travel itinerary, accommodation proof, travel insurance, employment letter, and any additional documents specific to your visa category. All documents should be recent and properly translated if not in English.",
    },
  ];

  const getCardStyle = (index) => {
    const baseStyle = {
      background: "#fff",
      borderRadius: 18,
      boxShadow: "0 4px 16px 0 rgba(32,67,114,0.07)",
      height: 400,
      marginBottom: 12,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      transition: "transform .12s",
    };

    return {
      ...baseStyle,
      transform: "scale(1)",
    };
  };

  return (
    <div className="apply-visa-container">
      {/* Banner Section */}
      <section className="apply-visa-hero">
        <div className="visa-hero-title">
          <h1>Apply for UAE Visa Online</h1>
          <p>
            Get your Visa by <b>7 June 2025</b>, if applied today
          </p>
        </div>
        <div className="visa-hero-img">
          <img src="/img/general/banner-right.png" alt="UAE Visa Banner" />
        </div>
      </section>

      {/* Visa Enquiry Section */}
      <div className="visa-enquiry-container">
        {/* Tabs */}
        <div className="visa-tabs-container">
          {tabList.map((tab, idx) => (
            <div
              key={tab}
              onClick={() => setActiveTab(idx)}
              className="visa-tab"
              style={{
                fontWeight: idx === activeTab ? 700 : 500,
                color: idx === activeTab ? "#111" : "#707070",
                borderBottom:
                  idx === activeTab
                    ? "3px solid #FFC700"
                    : "3px solid transparent",
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="visa-cards-container">
          {visaCards.map((card, idx) => (
            <div
              key={idx}
              className="visa-card"
              style={{
                ...getCardStyle(idx),
                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              {/* Card Header */}
              <div className="visa-card-header">
                {card.title}
                {card.visaBadge && (
                  <span className="visa-card-header-badge">
                    {card.visaBadge}
                  </span>
                )}
              </div>

              {/* Card Content */}
              <div className="visa-card-content">
                {/* Card Data */}
                <div className="visa-card-data">
                  {card.data.map((d) => (
                    <div key={d.label} className="visa-card-data-item">
                      <span className="visa-card-data-label">{d.label}</span>
                      <span className="visa-card-data-value">{d.value}</span>
                    </div>
                  ))}
                </div>

                {/* Fees Section */}
                <div className="visa-card-fees">
                  {card.fees.slice(0, 2).map((fee) => (
                    <div key={fee.label} className="visa-card-fees-column">
                      <div className="visa-card-fees-label">{fee.label}</div>
                      <div className="visa-card-fees-value">{fee.value}</div>
                    </div>
                  ))}

                  <div className="visa-card-total-fee">
                    {card.fees[2].value}
                  </div>
                </div>
              </div>

              {/* Footer Button */}
              <div className="visa-card-footer" onClick={handleEnquire}>
                <span className="visa-card-footer-text">
                  {card.buttonLabel}
                </span>
                <span className="visa-card-footer-chevron">&rsaquo;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Steps Section */}
      <div className="visa-custom-container">
        <div className="customHeader">
          <h1 className="title">Get Your UAE Visa in 4 Easy Steps</h1>
          <p className="subtitle">
            Our Visa expert review and process the Visa to the embassy on your
            behalf
          </p>

          <div className="customContainer">
            <div className="customStepContainer">
              {steps.map((step, index) => (
                <div key={index} className="step">
                  <div
                    className="stepIcon"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.icon}
                  </div>
                  <div className="stepContent">
                    <h3
                      className={`stepTitle ${
                        step.type === "date" ? "date" : ""
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`stepSubtitle ${
                        step.type === "date" ? "date-subtitle" : ""
                      }`}
                    >
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="visaSection">
          <h2 className="visaTitle">UAE Visa Requirement for Indian Citizen</h2>

          <div className="customDocumentGrid">
            <div className="customDocumentHeader">
              <h3>Documents required for Indian citizen</h3>
              <p className="mandatoryText">Mandatory Document</p>
            </div>

            <div className="documentsGrid">
              {documents.map((doc, index) => (
                <div key={index} className="documentItem">
                  {doc}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="faqSection">
          <h2 className="faqTitle">FAQ</h2>

          {faqData.map((faq, index) => (
            <div key={index} className="faqItem">
              <div className="faqQuestion" onClick={() => toggleFAQ(index)}>
                <div className="faqLeft">
                  <span className="checkIcon">✔</span>
                  <span>{faq.question}</span>
                </div>

                <span
                  className="icon"
                  style={{
                    transform:
                      openFAQ === index ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <Image
                    src="/img/trip-package/down-arrow.png"
                    alt="Chevron"
                    width={16}
                    height={16}
                  />
                </span>
              </div>

              {openFAQ === index && (
                <div className="faqAnswer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Popup Form */}
      <PopupForm
        open={popupOpen}
        onClose={handlePopupClose}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default ApplyVisa;
