"use client";
import React from "react";

const GoKiteSignup = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Left Side - Image with Logo */}
      <div
        style={{
          flex: "1",
          background:
            "linear-gradient(135deg, #4a90e2 0%, #7bb3f0 50%, #a8d0f8 100%)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Earth Background Image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('/img/landingpage/hero.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.8,
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          <img
            src="/img/general/log-white.png"
            alt="Go Trip Logo"
            style={{
              maxWidth: "200px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div
        style={{
          flex: "1",
          backgroundColor: "#f8f9fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {/* Header */}
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "600",
              color: "#1a1a1a",
              marginBottom: "8px",
              lineHeight: "1.2",
            }}
          >
           Sign in
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#666",
              marginBottom: "32px",
              lineHeight: "1.4",
            }}
          >
            Book your entire trip in one place, with free access to Member
            Prices and points.
          </p>

          {/* Email Input */}
          <div
            style={{
              marginBottom: "24px",
            }}
          >
            <input
              type="email"
              placeholder="Email address"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "16px",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                outline: "none",
                boxSizing: "border-box",
                backgroundColor: "white",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#4a90e2";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e0e0e0";
              }}
            />
          </div>

          {/* Sign In Link */}
          <p
            style={{
              fontSize: "14px",
              color: "#666",
              marginBottom: "32px",
            }}
          >
            Don't have an account?{" "}
            <a
              href="#"
              style={{
                color: "#4a90e2",
                textDecoration: "none",
              }}
            >
              Create one
            </a>
          </p>

          {/* Social Login Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {/* Apple Button */}
            <button
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                fontSize: "16px",
                color: "#333",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style={{ marginRight: "12px" }}
              >
                <path
                  d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                  fill="#333"
                />
              </svg>
              Continue with Apple
            </button>

            {/* Facebook Button */}
            <button
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                fontSize: "16px",
                color: "#333",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style={{ marginRight: "12px" }}
              >
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  fill="#1877F2"
                />
              </svg>
              Continue with Facebook
            </button>

            {/* Google Button */}
            <button
              style={{
                width: "100%",
                padding: "14px 16px",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                fontSize: "16px",
                color: "#333",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f5f5f5";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                style={{ marginRight: "12px" }}
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoKiteSignup;
