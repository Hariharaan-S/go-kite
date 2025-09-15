"use client";
import React, { useState, useEffect } from "react";

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };

    // Check initial state
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup event listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Colors & sizing for easy customization
  const containerStyle = {
    width: "100%",
    maxWidth: 1600,
    margin: "0 auto",
    padding: "0 15px",
    boxSizing: "border-box",
  };

  const styles = {
    section: {
      fontFamily: "inherit",
      background: "#fff",
      padding: "40px 24px 24px 24px",
      minHeight: "auto",
      boxSizing: "border-box",
      width: "100%",
    },
    wrapper: {
      maxWidth: 1200,
      margin: "0 auto",
      display: "flex",
      gap: isMobile ? 16 : 32,
      alignItems: "flex-start",
      flexDirection: isMobile ? "column" : "row",
      width: "100%",
      position: "relative",
    },
    left: {
      flex: isMobile ? "1" : "2",
      width: "100%",
      minWidth: 280,
      display: "flex",
      flexDirection: "column",
    },
    right: {
      ...(isMobile
        ? {
            width: "100%",
            marginTop: 24,
          }
        : {
            position: "absolute",
            top: 0,
            right: 0,
            maxWidth: 340,
          }),
      background: "#fafbfc",
      borderRadius: 18,
      border: "1px solid #dadbdd",
      padding: "24px 20px",
      boxShadow: "0 2px 6px rgba(40,50,67,0.04)",
    },
    tabList: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: 12,
      marginBottom: 28,
      width: "100%",
    },
    tab: (selected) => ({
      padding: "7px 18px",
      fontSize: 16,
      background: selected ? "#232527" : "#f4f4f4",
      color: selected ? "#fff" : "#222",
      border: "none",
      outline: "none",
      borderRadius: 22,
      fontWeight: 500,
      cursor: "pointer",
      transition: "background 0.15s, color 0.15s",
      width: isMobile ? "100%" : "auto",
      marginBottom: isMobile ? 10 : 0,
      textAlign: "center",
    }),
    heading: {
      fontSize: isMobile ? 24 : 30,
      fontWeight: 700,
      marginBottom: 7,
      marginTop: 6,
      color: "#1e2329",
      textAlign: "left",
      width: "100%",
      padding: isMobile ? "0 15px" : 0,
    },
    content: {
      fontSize: 16,
      lineHeight: 1.7,
      color: "#303439",
      marginBottom: 10,
      width: "100%",
      textAlign: "left",
      padding: isMobile ? "0 15px" : 0,
    },
    readMore: {
      color: "#229ddb",
      textDecoration: "none",
      fontWeight: 500,
      fontSize: 16,
      cursor: "pointer",
      marginTop: 12,
      display: "block",
      textAlign: "left",
      width: "100%",
    },
    brochureSmall: {
      fontSize: 15,
      color: "#656b73",
      marginBottom: 9,
      textAlign: "center",
    },
    brochureLink: {
      color: "#229ddb",
      textDecoration: "underline",
      fontWeight: 500,
      fontSize: 16,
      display: "block",
      textAlign: "center",
      width: "100%",
    },
  };

  const tabs = [
    { label: "Overview" },
    { label: "Itinerary" },
    { label: "What's Included" },
    { label: "FAQs" },
  ];

  // Only Overview tab is implemented per screenshot
  const OverviewTab = (
    <>
      <div style={styles.heading}>Bromo Mountain</div>
      <div style={styles.content}>
        Bromo Mountain (Gunung Bromo) is an iconic active volcano located in
        East Java, Indonesia, within the Bromo Tengger Semeru National Park. It
        stands about 2,329 meters (7,641 feet) above sea level and features a
        dramatic landscape, including a smoking crater and a vast "sea of sand"
        around it. Known for its frequent volcanic activity, Bromo offers
        spectacular sunrise views, with popular activities including
        <br />
        sunrise tours, horseback riding, and hiking to the crater.
      </div>
      <a style={styles.readMore} href="#">
        Read More...
      </a>
    </>
  );

  return (
    <div style={containerStyle}>
      <section style={styles.section}>
        <div style={styles.wrapper}>
          <div style={styles.left}>
            {/* Tabs */}
            <div style={styles.tabList}>
              {tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  style={styles.tab(i === activeTab)}
                  onClick={() => setActiveTab(i)}
                  tabIndex={0}
                  aria-selected={i === activeTab}
                  aria-controls={`tabpanel-${i}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tab Panel: Only 'Overview' implemented here */}
            <div id={`tabpanel-0`} role="tabpanel" aria-labelledby="tab-0">
              {activeTab === 0 && (
                <>
                  <div style={styles.heading}>Bromo Mountain</div>
                  <div style={styles.content}>
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
                  <a style={styles.readMore} href="#">
                    Read More...
                  </a>
                </>
              )}
              {/* Add other tab content here if needed */}
            </div>
          </div>
          {/* Right box */}
          <aside style={styles.right}>
            <div style={styles.brochureSmall}>Plan your adventure:</div>
            <a style={styles.brochureLink} href="#" download>
              Download PDF Brochure
            </a>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
