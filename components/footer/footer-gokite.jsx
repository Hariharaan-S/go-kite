import React from "react";

const socialIcons = {
  facebook: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#3b5998"
      viewBox="0 0 24 24"
      width="18px"
      height="18px"
    >
      <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.892-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.59l-.467 3.622h-3.123V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
    </svg>
  ),
  instagram: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#E4405F"
      viewBox="0 0 24 24"
      width="18px"
      height="18px"
    >
      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.88-.38a1.13 1.13 0 110 2.25 1.13 1.13 0 010-2.25z" />
    </svg>
  ),
  whatsapp: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="18px"
      height="18px"
      viewBox="0 0 48 48"
    >
      <path
        fill="#fff"
        d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"
      ></path>
      <path
        fill="#fff"
        d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"
      ></path>
      <path
        fill="#cfd8dc"
        d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"
      ></path>
      <path
        fill="#40c351"
        d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"
      ></path>
      <path
        fill="#fff"
        fill-rule="evenodd"
        d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z"
        clip-rule="evenodd"
      ></path>
    </svg>
  ),
  twitter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="18px"
      height="18px"
      viewBox="0 0 50 50"
    >
      <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
    </svg>
  ),
};

export default function GoKiteFooter() {
  return (
    <footer
      style={{
        backgroundColor: "#D7F7FF",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        borderTop: "2px solid #A1CED7",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "40px",
        }}
      >
        {/* Left Section - Logo Image and Contact Info */}
        <div
          style={{
            flex: "1 1 280px",
            minWidth: "280px",
            maxWidth: "350px",
          }}
        >
          {/* Logo Image */}
          <img
            src="/img/general/logo.svg"
            alt="Go Kite Logo"
            style={{
              width: "120px",
              height: "auto",
              marginBottom: "20px",
              maxWidth: "100%",
            }}
          />

          {/* Contact Info */}
          <div style={{ color: "#222", fontSize: "14px", lineHeight: "1.6" }}>
            <p style={{ margin: "0 0 8px 0", fontWeight: "500" }}>
              Contact our Travel agent
            </p>
            <p style={{ margin: "0 0 8px 0" }}>Monday-Friday (9Am-5Pm)</p>
            <p style={{ margin: "0 0 8px 0" }}>+91 7620370639</p>
            <p style={{ margin: "0 0 20px 0" }}>Email : Support@gokite.com</p>
          </div>

          {/* Social Media Icons */}
          <div style={{ display: "flex", gap: "15px" }}>
            {["facebook", "instagram", "whatsapp", "twitter"].map(
              (platform, index) => (
                <div
                  key={index}
                  style={{
                    width: "35px",
                    height: "35px",
                    backgroundColor: "transparent",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "2px solid #A1CED7",
                  }}
                  title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                >
                  {socialIcons[platform]}
                </div>
              )
            )}
          </div>
        </div>

        {/* Middle Section - Our Services */}
        <div
          style={{
            flex: "1 1 180px",
            minWidth: "180px",
            maxWidth: "250px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#222",
              marginBottom: "20px",
            }}
          >
            Our Services
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: "0",
              margin: "0",
            }}
          >
            {["Flight Booking", "Visa", "Activities", "Holidays", "Hotel"].map(
              (service, index) => (
                <li key={index} style={{ marginBottom: "12px" }}>
                  <a
                    href="#"
                    style={{
                      color: "#222",
                      textDecoration: "none",
                      fontSize: "14px",
                      lineHeight: "1.4",
                    }}
                  >
                    {service}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Right Section - About */}
        <div
          style={{
            flex: "1 1 180px",
            minWidth: "180px",
            maxWidth: "250px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#222",
              marginBottom: "20px",
            }}
          >
            About
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: "0",
              margin: "0",
            }}
          >
            {[
              "Account",
              "About Us",
              "Support",
              "Help Desk",
              "Terms & Condition",
            ].map((item, index) => (
              <li key={index} style={{ marginBottom: "12px" }}>
                <a
                  href="#"
                  style={{
                    color: "#222",
                    textDecoration: "none",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
