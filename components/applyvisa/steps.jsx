"use client";
import React, { useState } from "react";
import Image from "next/image";
// Remove the Lucide icon import
// import { ChevronDown, ChevronUp, Calendar, Search, CheckCircle, FileText } from 'lucide-react';

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
      title: "Today 31 May 2025",
      subtitle: "Book and Complete Documents",
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
      title: "8 June 2025 Get Visa By",
      subtitle: "Get your visa results",
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

  const styles = {
    container: {
      maxWidth: "1400px", // Increased from 1200px
      margin: "0 auto",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f9fa",
    },
    header: {
      textAlign: "center",
      marginBottom: "60px",
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: "10px",
      textTransform: "uppercase",
    },
    subtitle: {
      fontSize: "16px",
      color: "#7f8c8d",
      marginBottom: "40px",
    },
    stepsContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "60px",
      flexWrap: "wrap",
      gap: "20px",
    },
    step: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      flex: "1",
      minWidth: "200px", // Reduced to accommodate 4 steps
      position: "relative",
    },
    stepIcon: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
    },
    stepTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: "8px",
    },
    stepSubtitle: {
      fontSize: "14px",
      color: "#7f8c8d",
    },
    connector: {
      position: "absolute",
      top: "40px",
      right: "-50px",
      width: "100px",
      height: "2px",
      backgroundColor: "#e0e0e0",
      zIndex: 1,
    },
    visaSection: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "40px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "40px",
    },
    visaTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#2c3e50",
      textAlign: "center",
      marginBottom: "30px",
    },
    documentsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "15px",
      marginBottom: "30px",
    },
    documentItem: {
      padding: "15px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      textAlign: "center",
      fontSize: "14px",
      color: "#2c3e50",
      border: "1px solid #e9ecef",
      transition: "all 0.3s ease",
    },
    documentItemHover: {
      backgroundColor: "#e3f2fd",
      borderColor: "#2196f3",
    },
    mandatoryText: {
      textAlign: "right",
      fontSize: "12px",
      color: "#e74c3c",
      fontStyle: "italic",
    },
    faqSection: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "40px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    faqTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: "30px",
    },
    faqItem: {
      marginBottom: "15px",
      border: "1px solid #e9ecef",
      borderRadius: "8px",
      overflow: "hidden",
    },
    faqQuestion: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      color: "#2c3e50",
      transition: "all 0.3s ease",
    },
    faqQuestionHover: {
      backgroundColor: "#e3f2fd",
    },
    faqAnswer: {
      padding: "20px",
      backgroundColor: "white",
      fontSize: "14px",
      lineHeight: "1.6",
      color: "#555",
      borderTop: "1px solid #e9ecef",
    },
    icon: {
      transition: "transform 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Get Your UAE Visa in 4 Easy Steps</h1>
        <p style={styles.subtitle}>
          Our team will help you get the best visa documents for your UAE travel
        </p>

        <div style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={index} style={styles.step}>
              <div
                style={{
                  ...styles.stepIcon,
                  backgroundColor: step.color,
                }}
              >
                {step.icon}
              </div>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepSubtitle}>{step.subtitle}</p>
              {index < steps.length - 1 && <div style={styles.connector}></div>}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.visaSection}>
        <h2 style={styles.visaTitle}>
          UAE Visa Requirement for Indian Citizen
        </h2>
        <p style={styles.mandatoryText}>Mandatory Document</p>

        <h3
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#2c3e50",
            marginBottom: "20px",
          }}
        >
          Documents required for Indian citizen
        </h3>

        <div style={styles.documentsGrid}>
          {documents.map((doc, index) => (
            <div
              key={index}
              style={styles.documentItem}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor =
                  styles.documentItemHover.backgroundColor;
                e.target.style.borderColor =
                  styles.documentItemHover.borderColor;
              }}
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

      <div style={styles.faqSection}>
        <h2 style={styles.faqTitle}>FAQ</h2>

        {faqData.map((faq, index) => (
          <div key={index} style={styles.faqItem}>
            <div
              style={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  styles.faqQuestionHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  styles.faqQuestion.backgroundColor;
              }}
            >
              <span>{faq.question}</span>
              <span
                style={{
                  ...styles.icon,
                  transform:
                    openFAQ === index ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                {openFAQ === index ? (
                  <Image
                    src="/img/holidays/arrow.svg"
                    alt="Chevron Up"
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    src="/img/holidays/arrow.svg"
                    alt="Chevron Down"
                    width={20}
                    height={20}
                    style={{ transform: "rotate(180deg)" }}
                  />
                )}
              </span>
            </div>

            {openFAQ === index && (
              <div style={styles.faqAnswer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UAEVisaComponent;
