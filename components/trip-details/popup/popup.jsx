import React, { useMemo, useState } from "react";
import { Country } from "country-state-city";

// Claims header payload required by backend
const CLAIMS = {
  AUTHENTICATED: "true",
  org_id: "0631f265-d8de-4608-9622-6b4e148793c4",
  OTP_VERFICATION_REQD: "false",
  USER_ID: "0af402d1-98f0-18ae-8198-f493454d0001",
  refreshtoken: "false",
  client_ip: "14.99.174.62",
  USER_ID_LONG: "563",
  USER_NAME: "codetezteam@gmail.com",
  SESSION_ID: "88c31722-e2ef-4723-a2ce-20d797f7a1b8",
  "authorized-domains":
    "b603f35d-9242-11f0-b493-fea20be86931, b603edb7-9242-11f0-b493-fea20be86931, b603e748-9242-11f0-b493-fea20be86931, b603d5d9-9242-11f0-b493-fea20be86931",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
};

const PopupForm = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    customerFirstName: "",
    customerLastName: "",
    countryOfResidence: "",
    nationality: "",
    customerPhone: "",
    customerEmail: "",
    type: "",
    nameOfTheCompany: "",
    residence: "",
    numberOfAdults: 1,
    numberOfChildren: 0,
    numberOfInfants: 0,
    budget: 0,
    destination: "",
    description: "",
    packageName: "",
    fromDate: "",
    toDate: ""
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState("");

  const ENQUIRY_ENDPOINT =
    "http://gokite-sit-b2c.convergentechnologies.com:30839/api/cms/api/v1/enquiries/package";

  const countries = Country.getAllCountries();
  const phoneCodes = useMemo(() => {
    const codes = Array.from(new Set(countries.map((c) => c.phonecode))).filter(Boolean);
    return codes.sort((a, b) => Number(a) - Number(b));
  }, [countries]);

  if (!open) return null;

  // Get all countries for dropdowns (already memoized above)

  const tripTypes = ["Solo", "Group", "Corporate", "Student", "Cruise", "Others"];

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Removed phone input handler (customerPhone will be a select)

  const handleNumberChange = (field, increment) => {
    const currentValue = form[field];
    const newValue = increment
      ? currentValue + 1
      : Math.max(0, currentValue - 1);
    setForm({ ...form, [field]: newValue });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.customerFirstName.trim()) newErrors.customerFirstName = "First name is required";
    if (!form.customerLastName.trim()) newErrors.customerLastName = "Last name is required";
    if (!form.countryOfResidence) newErrors.countryOfResidence = "Country of residence is required";
    if (!form.nationality) newErrors.nationality = "Nationality is required";
    if (!form.customerPhone) newErrors.customerPhone = "Phone code is required";
    if (!form.customerEmail.trim()) newErrors.customerEmail = "Email is required";
    if (!form.type) newErrors.type = "Trip type is required";
    if (!form.fromDate) newErrors.fromDate = "From date is required";
    if (!form.toDate) newErrors.toDate = "To date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setApiResponse(null);
    setApiError("");

    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          claims: JSON.stringify(CLAIMS),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({ message: "Submitted" }));

      if (!res.ok) {
        throw new Error(data?.message || "Failed to submit enquiry");
      }

      setApiResponse(data);
      if (typeof onSubmit === "function") {
        try {
          onSubmit(form);
        } catch (_) { }
      }
    } catch (err) {
      setApiError(String(err.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa",
    width: "100%",
    boxSizing: "border-box",
  };

  const focusStyle = {
    borderColor: "#3b82f6",
    backgroundColor: "#fff",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
  };

  const errorStyle = {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
        boxSizing: "border-box",
        backdropFilter: "blur(8px)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "40px",
          width: "100%",
          maxWidth: "800px",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#64748b",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#f1f5f9";
            e.target.style.color = "#1e293b";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#64748b";
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src="/img/general/logo.svg"
            alt="Logo"
            style={{ width: "140px", marginBottom: "24px" }}
          />
          <h2
            style={{
              margin: 0,
              fontWeight: "800",
              fontSize: "2.5rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              letterSpacing: "-0.025em",
              lineHeight: "1.2",
            }}
          >
            Holidays Enquiry Form
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "1.1rem",
              margin: "12px 0 0 0",
              fontWeight: "500",
            }}
          >
            Please fill in your details for holidays assistance
          </p>
        </div>

        {/* API response / error banner */}
        {apiResponse && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              background: "#ecfdf5",
              color: "#065f46",
              border: "1px solid #a7f3d0",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Success</div>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}
        {apiError && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              background: "#fef2f2",
              color: "#991b1b",
              border: "1px solid #fecaca",
            }}
          >
            {apiError}
          </div>
        )}

        {/* Form Grid */
        }
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            "@media (max-width: 640px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          {/* Personal Information Section */}
          <div style={{ gridColumn: "1 / -1", marginBottom: "16px" }}>
            <h3
              style={{
                margin: "0 0 20px 0",
                color: "#1e293b",
                fontSize: "1.4rem",
                fontWeight: "700",
                borderBottom: "3px solid #e2e8f0",
                paddingBottom: "12px",
              }}
            >
              Personal Information
            </h3>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              First Name *
            </label>
            <input
              name="customerFirstName"
              placeholder="Enter your first name"
              value={form.customerFirstName}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                ...(errors.customerFirstName ? errorStyle : {}),
              }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.customerFirstName
                  ? "#ef4444"
                  : "#e2e8f0";
                e.target.style.backgroundColor = errors.customerFirstName
                  ? "#fef2f2"
                  : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.customerFirstName && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                {errors.customerFirstName}
              </span>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Last Name *
            </label>
            <input
              name="customerLastName"
              placeholder="Enter your last name"
              value={form.customerLastName}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                ...(errors.customerLastName ? errorStyle : {}),
              }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.customerLastName
                  ? "#ef4444"
                  : "#e2e8f0";
                e.target.style.backgroundColor = errors.customerLastName
                  ? "#fef2f2"
                  : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.customerLastName && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                {errors.customerLastName}
              </span>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Country of Residence *
            </label>
            <select
              name="countryOfResidence"
              value={form.countryOfResidence}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                ...(errors.countryOfResidence ? errorStyle : {}),
              }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.countryOfResidence
                  ? "#ef4444"
                  : "#e2e8f0";
                e.target.style.backgroundColor = errors.countryOfResidence
                  ? "#fef2f2"
                  : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="">Select your country of residence</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.countryOfResidence && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                {errors.countryOfResidence}
              </span>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Nationality *
            </label>
            <select
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                ...(errors.nationality ? errorStyle : {}),
              }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.nationality
                  ? "#ef4444"
                  : "#e2e8f0";
                e.target.style.backgroundColor = errors.nationality
                  ? "#fef2f2"
                  : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="">Select your nationality</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.nationality && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                {errors.nationality}
              </span>
            )}
          </div>

          {/* Contact and Trip Details */}
          <div style={{ gridColumn: "1 / -1", marginTop: "32px", marginBottom: "16px" }}>
            <h3
              style={{
                margin: "0 0 20px 0",
                color: "#1e293b",
                fontSize: "1.4rem",
                fontWeight: "700",
                borderBottom: "3px solid #e2e8f0",
                paddingBottom: "12px",
              }}
            >
              Contact & Trip Details
            </h3>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Email Address *
            </label>
            <input
              name="customerEmail"
              type="email"
              placeholder="Enter your email address"
              value={form.customerEmail}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                ...(errors.customerEmail ? errorStyle : {}),
              }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.customerEmail ? "#ef4444" : "#e2e8f0";
                e.target.style.backgroundColor = errors.customerEmail ? "#fef2f2" : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.customerEmail && (
              <span
                style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "4px", display: "block" }}
              >
                {errors.customerEmail}
              </span>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Phone Code *
            </label>
            <select
              name="customerPhone"
              value={form.customerPhone}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                ...(errors.customerPhone ? errorStyle : {}),
              }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.customerPhone ? "#ef4444" : "#e2e8f0";
                e.target.style.backgroundColor = errors.customerPhone ? "#fef2f2" : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="">Select phone code</option>
              {phoneCodes.map((code) => (
                <option key={code} value={code}>
                  +{code}
                </option>
              ))}
            </select>
            {errors.customerPhone && (
              <span
                style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "4px", display: "block" }}
              >
                {errors.customerPhone}
              </span>
            )}
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label
              style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}
            >
              Type *
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {tripTypes.map((t) => (
                <label key={t} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                    type="radio"
                    name="type"
                    value={t}
                    checked={form.type === t}
                    onChange={handleChange}
                    required
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
            {errors.type && (
              <span style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "4px", display: "block" }}>
                {errors.type}
              </span>
            )}
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              Name of the Company
            </label>
            <input
              name="nameOfTheCompany"
              placeholder="Enter company name"
              value={form.nameOfTheCompany}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.backgroundColor = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              Residence
            </label>
            <input
              name="residence"
              placeholder="Enter your city / residence"
              value={form.residence}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.backgroundColor = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          {/* Date Range */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              From Date
            </label>
            <input
              name="fromDate"
              type="date"
              min={today}
              value={form.fromDate}
              onChange={handleChange}

              style={{ ...inputStyle, ...(errors.fromDate ? errorStyle : {}) }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.fromDate ? "#ef4444" : "#e2e8f0";
                e.target.style.backgroundColor = errors.fromDate ? "#fef2f2" : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.fromDate && (
              <span style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "4px", display: "block" }}>
                {errors.fromDate}
              </span>
            )}
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              To Date
            </label>
            <input
              name="toDate"
              type="date"
              min={today}
              value={form.toDate}
              onChange={handleChange}

              style={{ ...inputStyle, ...(errors.toDate ? errorStyle : {}) }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.toDate ? "#ef4444" : "#e2e8f0";
                e.target.style.backgroundColor = errors.toDate ? "#fef2f2" : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.toDate && (
              <span style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "4px", display: "block" }}>
                {errors.toDate}
              </span>
            )}
          </div>

          {/* Party & Budget */}
          <div
            style={{
              gridColumn: "1 / -1",
              marginTop: "32px",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                color: "#1e293b",
                fontSize: "1.4rem",
                fontWeight: "700",
                borderBottom: "3px solid #e2e8f0",
                paddingBottom: "12px",
              }}
            >
              Passenger & Budget
            </h3>
          </div>

          {/* Number of infants */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Number of Adults *
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#fafafa",
              }}
            >
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfAdults", false)}
                disabled={form.numberOfAdults <= 1}
                style={{
                  width: "44px",
                  height: "44px",
                  background: form.numberOfAdults <= 1 ? "#f8fafc" : "#fff",
                  cursor: form.numberOfAdults <= 1 ? "not-allowed" : "pointer",
                  border: "none",
                  borderRight: "1px solid #e2e8f0",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: form.numberOfAdults <= 1 ? "#cbd5e1" : "#374151",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                −
              </button>
              <input
                type="number"
                value={form.numberOfAdults}
                readOnly
                style={{
                  flex: 1,
                  border: "none",
                  textAlign: "center",
                  fontSize: "16px",
                  backgroundColor: "transparent",
                  padding: "10px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              />
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfAdults", true)}
                style={{
                  width: "44px",
                  height: "44px",
                  background: "#fff",
                  cursor: "pointer",
                  border: "none",
                  borderLeft: "1px solid #e2e8f0",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#374151",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Number of Children *
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#fafafa",
              }}
            >
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfChildren", false)}
                disabled={form.numberOfChildren <= 0}
                style={{
                  width: "44px",
                  height: "44px",
                  background: form.numberOfChildren <= 0 ? "#f8fafc" : "#fff",
                  cursor:
                    form.numberOfChildren <= 0 ? "not-allowed" : "pointer",
                  border: "none",
                  borderRight: "1px solid #e2e8f0",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: form.numberOfChildren <= 0 ? "#cbd5e1" : "#374151",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                −
              </button>
              <input
                type="number"
                value={form.numberOfChildren}
                readOnly
                style={{
                  flex: 1,
                  border: "none",
                  textAlign: "center",
                  fontSize: "16px",
                  backgroundColor: "transparent",
                  padding: "10px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              />
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfChildren", true)}
                style={{
                  width: "44px",
                  height: "44px",
                  background: "#fff",
                  cursor: "pointer",
                  border: "none",
                  borderLeft: "1px solid #e2e8f0",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#374151",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              Number of Infants *
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#fafafa",
              }}
            >
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfInfants", false)}
                disabled={form.numberOfInfants <= 0}
                style={{
                  width: "44px",
                  height: "44px",
                  background: form.numberOfInfants <= 0 ? "#f8fafc" : "#fff",
                  cursor: form.numberOfInfants <= 0 ? "not-allowed" : "pointer",
                  border: "none",
                  borderRight: "1px solid #e2e8f0",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: form.numberOfInfants <= 0 ? "#cbd5e1" : "#374151",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                −
              </button>
              <input
                type="number"
                value={form.numberOfInfants}
                required
                readOnly
                style={{
                  flex: 1,
                  border: "none",
                  textAlign: "center",
                  fontSize: "16px",
                  backgroundColor: "transparent",
                  padding: "10px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              />
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfInfants", true)}
                style={{
                  width: "44px",
                  height: "44px",
                  background: "#fff",
                  cursor: "pointer",
                  border: "none",
                  borderLeft: "1px solid #e2e8f0",
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#374151",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              Budget
            </label>
            <input
              name="budget"
              type="number"
              placeholder="Enter budget"
              value={form.budget}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.backgroundColor = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Destination & Package */}
          <div
            style={{
              gridColumn: "1 / -1",
              marginTop: "32px",
              marginBottom: "16px",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                color: "#1e293b",
                fontSize: "1.4rem",
                fontWeight: "700",
                borderBottom: "3px solid #e2e8f0",
                paddingBottom: "12px",
              }}
            >
              Destination & Package
            </h3>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              Destination
            </label>
            <input
              name="destination"
              placeholder="Enter destination"
              value={form.destination}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.backgroundColor = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
              Package Name *
            </label>
            <input
              name="packageName"
              placeholder="Enter package name"
              required
              value={form.packageName}
              onChange={handleChange}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
                e.target.style.backgroundColor = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Additional Information Section */}
          <div style={{ gridColumn: "1 / -1", marginTop: "32px" }}>
            <h3
              style={{
                margin: "0 0 20px 0",
                color: "#1e293b",
                fontSize: "1.4rem",
                fontWeight: "700",
                borderBottom: "3px solid #e2e8f0",
                paddingBottom: "12px",
              }}
            >
              Additional Information
            </h3>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Description (Optional)
              </label>
              <textarea
                name="description"
                placeholder="Provide any additional details or specific requests..."
                value={form.description}
                onChange={handleChange}
                rows={4}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "120px",
                }}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.backgroundColor = "#fafafa";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "flex-end",
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "2px solid #f1f5f9",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "16px 32px",
              borderRadius: "12px",
              border: "2px solid #d1d5db",
              background: "#fff",
              cursor: "pointer",
              fontWeight: "600",
              color: "#6b7280",
              transition: "all 0.3s ease",
              fontSize: "16px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#f9fafb";
              e.target.style.borderColor = "#9ca3af";
              e.target.style.color = "#374151";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#fff";
              e.target.style.borderColor = "#d1d5db";
              e.target.style.color = "#6b7280";
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: "16px 32px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 10px 25px rgba(102, 126, 234, 0.4)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "16px",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
            disabled={submitting}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 15px 35px rgba(102, 126, 234, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 10px 25px rgba(102, 126, 234, 0.4)";
            }}
          >
            {submitting ? "Submitting..." : "Submit Enquiry"}
          </button>
        </div>
      </form>

      <style jsx>{`
        @media (max-width: 768px) {
          form {
            padding: 24px !important;
            margin: 10px !important;
            borderradius: 20px !important;
          }

          h2 {
            fontsize: 2rem !important;
          }

          .form-grid {
            gridtemplatecolumns: 1fr !important;
          }

          .action-buttons {
            flexdirection: column !important;
          }

          .action-buttons button {
            width: 100% !important;
          }
        }

        @media (max-width: 480px) {
          form {
            padding: 20px !important;
          }

          h2 {
            fontsize: 1.75rem !important;
          }

          .number-input-container {
            justifycontent: center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PopupForm;
