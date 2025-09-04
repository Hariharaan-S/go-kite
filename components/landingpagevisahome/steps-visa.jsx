import React from "react";

const StepVisa = () => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1400px",
        height: "400px",
        background:
          "linear-gradient(135deg, #e8f4fd 0%, #d1e9f8 50%, #b8ddf4 100%)",
        borderRadius: "20px",
        padding: "40px 60px",
        position: "relative",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      }}
    >
      {/* Main Content Container */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          height: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Left Content */}
        <div
          style={{
            flex: "1",
            paddingRight: "40px",
          }}
        >
          {/* Main Heading */}
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "700",
              color: "#1e88c7",
              margin: "0 0 10px 0",
              lineHeight: "1.1",
            }}
          >
            Get Visa in 3
          </h1>

          <h2
            style={{
              fontSize: "48px",
              fontWeight: "700",
              color: "#1e88c7",
              margin: "0 0 40px 0",
              lineHeight: "1.1",
            }}
          >
            simple steps
          </h2>

          {/* Subheading */}
          <h3
            style={{
              fontSize: "32px",
              fontWeight: "600",
              color: "#2c3e50",
              margin: "0 0 15px 0",
              lineHeight: "1.2",
            }}
          >
            Upload your Documents we take care of the Process
          </h3>

          {/* Description */}
          <p
            style={{
              fontSize: "20px",
              color: "#5a6c7d",
              margin: "0",
              fontWeight: "400",
            }}
          >
            get Visa in 24 Hours throught express visa service
          </p>
        </div>

        {/* Right Side Icons */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "60px",
            display: "flex",
            gap: "20px",
            zIndex: 3,
          }}
        >
          {/* Icon 1 */}
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              padding: "10px",
            }}
          >
            <img
              src="/img/general/upload.png"
              alt="Icon 1"
              style={{
                width: "40px",
                height: "40px",
                marginBottom: "5px",
              }}
            />
            <span
              style={{
                fontSize: "10px",
                color: "#5a6c7d",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              Upload
              <br />
              documents
            </span>
          </div>

          {/* Icon 2 */}
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              padding: "10px",
            }}
          >
            <img
              src="/img/general/approval.png"
              alt="Icon 2"
              style={{
                width: "40px",
                height: "40px",
                marginBottom: "5px",
              }}
            />
            <span
              style={{
                fontSize: "10px",
                color: "#5a6c7d",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              Get
              <br />
              approval
            </span>
          </div>

          {/* Icon 3 */}
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              padding: "10px",
            }}
          >
            <img
              src="/img/general/receive-visa.png"
              alt="Icon 3"
              style={{
                width: "40px",
                height: "40px",
                marginBottom: "5px",
              }}
            />
            <span
              style={{
                fontSize: "10px",
                color: "#5a6c7d",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              Receive
              <br />
              Visa
            </span>
          </div>
        </div>

        {/* Bottom Right Image and Steps */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            display: "flex",
            alignItems: "flex-end",
            gap: "20px",
          }}
        >
          {/* Character Image */}
          <div
            style={{
              width: "200px",
              height: "280px",
              paddingTop: "100px",
              position: "relative",
            }}
          >
            <img
              src="/img/general/img.png"
              alt="Character"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CenteredVisaSection = () => (
  <section
    style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f0f4fa", // optional background
    }}
  >
    <StepVisa />
  </section>
);

export default CenteredVisaSection;
