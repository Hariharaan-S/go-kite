"use client";
import React, { useState } from "react";

const DubaiVisaApp = () => {
  const [selectedDocument, setSelectedDocument] = useState("Umer");

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
  style={{
    backgroundColor: "#f0f8ff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    }}
  >
    {/* LEFT SIDE */}
    <div>
      <div style={{ color: "#222", fontSize: "18px" }}>Dubai</div>
      <div
        style={{ fontWeight: "bold", fontSize: "16px", marginTop: "2px" }}
      >
        30 Days Tourist Visa
      </div>
    </div>

    {/* RIGHT SIDE STEPS */}
    <div style={{ display: "flex", gap: "32px" }}>
      {/* STEP 1 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/img/general/submit-document.png"
          alt="document"
          style={{ width: "60px", height: "60px" }}
        />
        <div
          style={{
            height: "3px",
            width: "60px",
            background: "#007f9c",
            borderRadius: "2px",
            marginTop: "5px",
          }}
        />
      </div>

      {/* STEP 2 */}
      <div
        style={{
          display: "flex",
          marginTop:"10px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
      
        <span
          style={{ fontSize: "12px", marginTop: "5px", color: "#666", textAlign: "center" }}
        >
          Document <br /> Approval
        </span>
        <div
          style={{
            height: "3px",
            width: "60px",
            background: "#80cfd0",
            borderRadius: "2px",
            marginTop: "5px",
          }}
        />
      </div>

      {/* STEP 3 */}
      <div
        style={{
          display: "flex",
          marginTop:"33px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
    
        <span
          style={{ fontSize: "12px", marginTop: "5px", color: "#666", textAlign: "center" }}
        >
          VISA
        </span>
        <div
          style={{
            height: "3px",
            width: "60px",
            background: "#80cfd0",
            borderRadius: "2px",
            marginTop: "5px",
          }}
        />
      </div>
    </div>
  </div>
</div>


      <div style={{ display: "flex", gap: "20px" }}>
        {/* Left Panel */}
        <div
          style={{
            flex: "1",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {/* Back Button */}
          <div style={{ marginBottom: "20px" }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#007f9c",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              ← Visa Application
            </button>
            <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#666" }}>
              User: Umer ID: 233584
            </p>
          </div>

          {/* Who's travelling section */}
          <div style={{ marginBottom: "30px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "16px", fontWeight: "bold" }}>
                Who's travelling?
              </h3>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#007f9c",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                + Add Passenger
              </button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "#E0F7FA",
                borderRadius: "25px",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  backgroundColor: "#007f9c",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  marginRight: "8px",
                }}
              >
                Umer 30M
              </span>
            </div>
          </div>

          {/* Upload Documents section */}
          <div>
            <h3
              style={{
                margin: "0 0 15px 0",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Upload Documents: KYC Document
            </h3>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  fontSize: "14px",
                  color: "#666",
                  marginBottom: "5px",
                  display: "block",
                }}
              >
                Passenger Document: {selectedDocument}
              </label>
              <select
                value={selectedDocument}
                onChange={(e) => setSelectedDocument(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <option value="Umer">Umer</option>
              </select>
            </div>

            {/* Document Upload Area */}
            <div
              style={{
                border: "2px dashed #007f9c",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                }}
              >
                {/* Passport Document */}
                <div style={{ textAlign: "center", flex: "1" }}>
                  <div
                    style={{
                      width: "110px",
                      height: "130px",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      margin: "0 auto 10px auto",
                      backgroundImage: `url("/img/visa/passport-photo.png")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "#4285F4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "15px",
                          height: "15px",
                          borderRadius: "50%",
                          backgroundColor: "white",
                        }}
                      ></div>
                    </div>
                  </div>
                  <button
                    style={{
                      backgroundColor: "#333",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    UPLOAD
                  </button>
                </div>

                {/* Photo Sample */}
                <div style={{ textAlign: "center", flex: "1" }}>
                  <img
                    src="/img/visa/sample-photo.png"
                    alt="Photo Sample"
                    style={{
                      width: "100px",
                      height: "120px",
                      objectFit: "cover",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      marginBottom: "10px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      display: "block",
                    }}
                  >
                    Photo Sample
                  </span>
                </div>

                {/* Passport Front Side */}
                <div style={{ textAlign: "center", flex: "1" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "130px",
                      backgroundImage: `url("/img/visa/front.png")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      margin: "0 auto 10px auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "8px",
                        color: "#666",
                        textAlign: "center",
                      }}
                    >
                      PASSPORT
                      <br />
                      FRONT SIDE
                    </div>
                  </div>
                  <button
                    style={{
                      backgroundColor: "#007f9c",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    UPLOAD FRONT SIDE
                  </button>
                </div>

                {/* Visitor Card Back */}
                <div style={{ textAlign: "center", flex: "1" }}>
                  <img
                    src="/img/visa/back.png"
                    alt="Visitor Card Back"
                    style={{
                      width: "100%",
                      height: "130px",
                      objectFit: "cover",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      marginBottom: "10px",
                    }}
                  />
                  <button
                    style={{
                      backgroundColor: "#007f9c",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    VISITOR CARD BACK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div
          style={{
            width: "300px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            height: "fit-content",
          }}
        >
          {/* Dubai Card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/flags-landmarks/united-arab-emirates-flag-icon.png"
              alt="icon"
              style={{
                width: "40px",
                height: "30px",
                marginRight: "10px",
                borderRadius: "2px",
              }}
            />
            <div>
              <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}>
                Dubai
              </h3>
              <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                30 Days Tourist Visa by 24hours
              </p>
            </div>
            <div
              style={{
                marginLeft: "auto",
                backgroundColor: "#4285F4",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              VISA
            </div>
          </div>

          {/* Pricing */}
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              <span>₹6,900</span>
              <span>₹6,900</span>
            </div>
            <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
              per adult
            </p>

            <div style={{ marginTop: "15px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  marginBottom: "5px",
                }}
              >
                <span>Visa Fee</span>
                <span>₹6,900</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  marginBottom: "15px",
                }}
              >
                <span>Service Fee / Express Processing Fee</span>
                <span>₹4,000</span>
              </div>
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #ddd",
                  margin: "15px 0",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                <span>Total</span>
                <span>₹10,900</span>
              </div>
            </div>
          </div>

          {/* Upload Button */}
          <button
            style={{
              width: "100%",
              backgroundColor: "#007f9c",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Upload Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default DubaiVisaApp;
