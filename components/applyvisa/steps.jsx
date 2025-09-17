"use client";
import React, { useState } from "react";
import Image from "next/image";
import './styles/steps.css';

const UAEVisaComponent = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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

  return (
    <div className="visa-custom-container">
      <div className="customHeader">
        <h1 className="title">Get Your UAE Visa in 4 Easy Steps</h1>
        <p className="subtitle">
          Our Visa expert review and procee the Visa to the embasy on your behalf
        </p>

        <div className="customContainer">
          <div className="customStepContainer">
            {steps.map((step, index) => (
              <div key={index} className="step">
                <div
                  className="stepIcon"
                  style={{
                    backgroundColor: step.color,

                  }}
                >
                  {step.icon}
                </div>
              </div>
            ))}
          </div>

          <div className="stepsContainer">
            {steps.map((step, index) => (
              <div key={index} className="step">
                <h3 className="stepTitle">{step.title}</h3>
                <p className="stepSubtitle">{step.subtitle}</p>
              </div>
            ))}
          </div>
        </div>


      </div>

      <div className="visaSection">
        <h2 className="visaTitle">
          UAE Visa Requirement for Indian Citizen
        </h2>

        <div className="customDocumentGrid">
          <div className="customDocumentHeader">
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#2c3e50",
              }}
            >
              Documents required for Indian citizen
            </h3>

            <p className="mandatoryText">Mandatory Document</p>
          </div>


          <div className="documentsGrid">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="documentItem"

                onMouseLeave={(e) => {
                  e.target.style.backgroundColor =
                    styles.documentItem.backgroundColor;
                  e.target.style.borderColor =
                    styles.documentItem.border.split(" ")[2];
                }}
              >
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
            <div
              className="faqQuestion"
              onClick={() => toggleFAQ(index)}
            >
              <div className="faqLeft">
                <span className="checkIcon">✔</span>
                <span>{faq.question}</span>
              </div>

              <span
                className="icon"
                style={{
                  transform: openFAQ === index ? "rotate(180deg)" : "rotate(0deg)",
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
              <div className="faqAnswer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default UAEVisaComponent;
