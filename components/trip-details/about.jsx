"use client";
import React, { useState, useEffect } from "react";
import "./styles/about.css";

const AboutSection = () => {
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
                    Bromo Mountain
                  </div>
                  <div
                    className={`tab-content${isMobile ? " mobile" : ""}`}
                  >
                    Bromo Mountain (Gunung Bromo) is an iconic active volcano
                    located in East Java, Indonesia, within the Bromo Tengger
                    Semeru National Park. It stands about 2,329 meters (7,641
                    feet) above sea level and features a dramatic landscape,
                    including a smoking crater and a vast "sea of sand" around
                    it. Known for its frequent volcanic activity, Bromo offers
                    spectacular sunrise views, with popular activities including
                    <br />
                    sunrise tours, horseback riding, and hiking to the crater.
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
