"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./styles/ApplyVisa.css";
import PopupForm from "./popup/popup";

const ApplyVisa = ({ visaDetails, visaError }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  // Compute total fee for a given card's companyPricing (supports array shape)
  const getTotalFee = (companyPricing) => {
    const cp = Array.isArray(companyPricing)
      ? companyPricing[0]
      : companyPricing;
    const pricingItems = cp?.pricing || [];
    const currency = cp?.currency || "";
    const total = pricingItems.reduce((sum, item) => {
      const numeric = Number(item?.value) || 0;
      return sum + numeric;
    }, 0);
    return { currency, total };
  };
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

  const processData = visaDetails?.detailsJson?.visaProcess;
  const steps = (processData?.steps || []).map((s, idx) => ({
    number: idx + 1,
    title: s.title,
    subtitle: s.subtitle,
    // Using existing static icons for consistency; backend provides icon ids
    icon: (
      <Image
        src={`/img/general/applyvisa/${Math.min(idx + 1, 4)}.png`}
        alt={s.title || "Step"}
        width={50}
        height={50}
      />
    ),
    color: ["#FFA500", "#00BFFF", "#9C27B0", "#32CD32"][idx % 4],
    type: idx === 0 || idx === 3 ? "date" : "process",
  }));

  const eligibility = visaDetails?.detailsJson?.eligibility;
  const documents = eligibility?.descriptions || [];

  // FAQ is consumed directly from visaDetails.detailsJson.faq in render

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
          <h1>
            {`Apply for ${visaDetails?.detailsJson?.country || "UAE"} Visa Online`}
          </h1>
          <p>
            {processData?.subHeading || "Get your Visa fast, if applied today"}
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
          {visaDetails?.detailsJson?.visaTypes?.map((card, idx) => (
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
                  {card.fields.map((d) => (
                    <div key={d.label} className="visa-card-data-item">
                      <span className="visa-card-data-label">{d.label}</span>
                      <span className="visa-card-data-value">{d.value}</span>
                    </div>
                  ))}
                </div>

                {/* Fees Section */}
                <div className="visa-card-fees">
                  {(Array.isArray(card.companyPricing)
                    ? card.companyPricing[0]?.pricing
                    : card.companyPricing?.pricing
                  )?.map((fee) => (
                    <div key={fee.label} className="visa-card-fees-column">
                      <div className="visa-card-fees-label">{fee.label}</div>
                      <div className="visa-card-fees-value">{`${(Array.isArray(card.companyPricing) ? card.companyPricing[0]?.currency : card.companyPricing?.currency) || ""} ${fee.value}`}</div>
                    </div>
                  ))}

                  {(() => {
                    const { currency, total } = getTotalFee(card.companyPricing);
                    return (
                      <div className="visa-card-total-fee">
                        {`${currency} ${total}`}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Footer Button */}
              <div className="visa-card-footer" onClick={handleEnquire}>
                <span className="visa-card-footer-text">
                  {card.buttonLabel || "Enquiry"}
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
          <h1 className="title">{processData?.mainHeading || "Get Your Visa in Easy Steps"}</h1>
          <p className="subtitle">
            {processData?.subHeading || "Our Visa expert reviews and processes your application"}
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
                      className={`stepTitle ${step.type === "date" ? "date" : ""
                        }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`stepSubtitle ${step.type === "date" ? "date-subtitle" : ""
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
          <h2 className="visaTitle">{eligibility?.mainHeading || "Visa Requirement"}</h2>

          <div className="customDocumentGrid">
            <div className="customDocumentHeader">
              <h3>{eligibility?.subHeading || "Documents required"}</h3>
              <p className="mandatoryText">Mandatory Documents</p>
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

          {visaDetails?.detailsJson?.faq?.map((faq, index) => (
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
