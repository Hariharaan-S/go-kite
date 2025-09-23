"use client";
import React, { useState, useEffect } from "react";
import "./styles/about.css";

const AboutSection = ({ holidaysDetails }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const tabs = [
    { label: "Overview" },
    { label: "Itinerary" },
    { label: "What's Included" },
    { label: "FAQs" },
  ];

  return (
    <div className="about-container">
      <section className="about-section">
        <div className={`about-wrapper${isMobile ? " mobile" : ""}`}>
          <div className="about-left">
            <div className={`tab-list${isMobile ? " mobile" : ""}`}>
              {tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  className={`tab-button${i === activeTab ? " active" : ""}${
                    isMobile ? " mobile" : ""
                  }`}
                  onClick={() => setActiveTab(i)}
                  tabIndex={0}
                  aria-selected={i === activeTab}
                  aria-controls={`tabpanel-${i}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div
              id={`tabpanel-0`}
              role="tabpanel"
              aria-labelledby="tab-0"
              className={`tab-panel${isMobile ? " mobile" : ""}`}
            >
              {activeTab === 0 && (
                <>
                  <div
                    className={`tab-heading${isMobile ? " mobile" : ""}`}
                  >
                    {holidaysDetails?.title || "Trip Overview"}
                  </div>
                  <div
                    className={`tab-content${isMobile ? " mobile" : ""}`}
                  >
                    {holidaysDetails?.cardJson?.overview || "Details will be available shortly."}
                  </div>
                  <a className="read-more" href="#">
                    Read More...
                  </a>
                </>
              )}
            </div>
          </div>
          <aside className={`about-right${isMobile ? " mobile" : ""}`}>
            <div className="brochure-small">Plan your adventure:</div>
            <a className="brochure-link" href="#" download>
              Download PDF Brochure
            </a>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
