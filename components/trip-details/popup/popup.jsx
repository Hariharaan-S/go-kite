import React, { useMemo, useState } from "react";
import { Country } from "country-state-city";

// Read cookie helper; backend may accept bearer auth similar to other calls
function getCookie(name) {
  if (typeof document === "undefined") return "";
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : "";
}

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
    toDate: "",
    fileAttachment: null,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState("");

  const ENQUIRY_ENDPOINT = "/api/enquiry";

  const countries = Country.getAllCountries();
  const phoneCodes = useMemo(() => {
    const codes = Array.from(new Set(countries.map((c) => c.phonecode))).filter(
      Boolean
    );
    return codes.sort((a, b) => Number(a) - Number(b));
  }, [countries]);

  if (!open) return null;

  const tripTypes = [
    "Solo",
    "Group",
    "Corporate",
    "Student",
    "Cruise",
    "Others",
  ];

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

  const handleNumberChange = (field, increment) => {
    const currentValue = form[field];
    const newValue = increment
      ? currentValue + 1
      : Math.max(0, currentValue - 1);
    setForm({ ...form, [field]: newValue });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.customerFirstName.trim())
      newErrors.customerFirstName = "First name is required";
    if (!form.customerLastName.trim())
      newErrors.customerLastName = "Last name is required";
    if (!form.countryOfResidence)
      newErrors.countryOfResidence = "Country of residence is required";
    if (!form.nationality) newErrors.nationality = "Nationality is required";
    if (!form.customerPhone) newErrors.customerPhone = "Phone code is required";
    if (!form.customerEmail.trim())
      newErrors.customerEmail = "Email is required";
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
          ...(getCookie("accesstoken")
            ? { Authorization: `Bearer ${getCookie("accesstoken")}` }
            : {}),
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
        } catch (_) {}
      }
    } catch (err) {
      setApiError(String(err.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    padding: "4px 6px",
    borderRadius: "4px",
    border: "1px solid #e2e8f0",
    fontSize: "11px",
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
          borderRadius: "20px",
          padding: "16px",
          width: "100%",
          maxWidth: "1400px",
          maxHeight: "90vh",
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
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

        {/* Form Grid */}
        <div
          className="form-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "6px",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {/* API response / error banner */}
          {apiResponse && (
            <div
              style={{
                gridColumn: "1 / -1",
                margin: "4px 0",
                padding: "6px 8px",
                background: "#ecfdf5",
                color: "#065f46",
                border: "1px solid #34d399",
                borderRadius: 8,
              }}
            >
              Enquiry Saved Successfully
            </div>
          )}
          {apiError && (
            <div
              style={{
                gridColumn: "1 / -1",
                margin: "4px 0",
                padding: "6px 8px",
                background: "#fef2f2",
                color: "#991b1b",
                border: "1px solid #fecaca",
                borderRadius: 8,
              }}
            >
              {apiError}
            </div>
          )}
          {/* Personal Information Section */}
          <div style={{ gridColumn: "1 / -1", marginBottom: "2px" }}>
            <h3
              style={{
                margin: "0 0 2px 0",
                color: "#1e293b",
                fontSize: "0.8rem",
                fontWeight: "700",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "1px",
              }}
            >
              Personal Information
            </h3>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
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
                  fontSize: "0.75rem",
                  marginTop: "2px",
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
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
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
                  fontSize: "0.75rem",
                  marginTop: "2px",
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
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
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
                  fontSize: "0.75rem",
                  marginTop: "2px",
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
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
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
                  fontSize: "0.75rem",
                  marginTop: "2px",
                  display: "block",
                }}
              >
                {errors.nationality}
              </span>
            )}
          </div>

          {/* Contact Information Section */}
          <div
            style={{
              gridColumn: "1 / -1",
              marginTop: "2px",
              marginBottom: "1px",
            }}
          >
            <h3
              style={{
                margin: "0 0 2px 0",
                color: "#1e293b",
                fontSize: "0.8rem",
                fontWeight: "700",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "1px",
              }}
            >
              Contact Information
            </h3>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
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
                e.target.style.borderColor = errors.customerEmail
                  ? "#ef4444"
                  : "#e2e8f0";
                e.target.style.backgroundColor = errors.customerEmail
                  ? "#fef2f2"
                  : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.customerEmail && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.75rem",
                  marginTop: "2px",
                  display: "block",
                }}
              >
                {errors.customerEmail}
              </span>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
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
                e.target.style.borderColor = errors.customerPhone
                  ? "#ef4444"
                  : "#e2e8f0";
                e.target.style.backgroundColor = errors.customerPhone
                  ? "#fef2f2"
                  : "#fafafa";
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
                style={{
                  color: "#ef4444",
                  fontSize: "0.75rem",
                  marginTop: "2px",
                  display: "block",
                }}
              >
                {errors.customerPhone}
              </span>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
              }}
            >
              Trip Type *
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                ...(errors.type ? errorStyle : {}),
              }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.type
                  ? "#ef4444"
                  : "#e2e8f0";
                e.target.style.backgroundColor = errors.type
                  ? "#fef2f2"
                  : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="">Select trip type</option>
              {tripTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.75rem",
                  marginTop: "2px",
                  display: "block",
                }}
              >
                {errors.type}
              </span>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
              }}
            >
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
            <label
              style={{
                display: "block",
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
              }}
            >
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

          {/* Travel Information Section */}
          <div
            style={{
              gridColumn: "1 / -1",
              marginTop: "2px",
              marginBottom: "1px",
            }}
          >
            <h3
              style={{
                margin: "0 0 2px 0",
                color: "#1e293b",
                fontSize: "0.8rem",
                fontWeight: "700",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "1px",
              }}
            >
              Travel Information
            </h3>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
              }}
            >
              From Date *
            </label>
            <input
              name="fromDate"
              type="date"
              min={today}
              value={form.fromDate}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                ...(errors.fromDate ? errorStyle : {}),
              }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.fromDate
                  ? "#ef4444"
                  : "#e2e8f0";
                e.target.style.backgroundColor = errors.fromDate
                  ? "#fef2f2"
                  : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.fromDate && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.75rem",
                  marginTop: "2px",
                  display: "block",
                }}
              >
                {errors.fromDate}
              </span>
            )}
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
              }}
            >
              To Date *
            </label>
            <input
              name="toDate"
              type="date"
              min={today}
              value={form.toDate}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                ...(errors.toDate ? errorStyle : {}),
              }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.toDate
                  ? "#ef4444"
                  : "#e2e8f0";
                e.target.style.backgroundColor = errors.toDate
                  ? "#fef2f2"
                  : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.toDate && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.75rem",
                  marginTop: "2px",
                  display: "block",
                }}
              >
                {errors.toDate}
              </span>
            )}
          </div>

          {/* Passenger Details Section */}
          <div
            style={{
              gridColumn: "1 / -1",
              marginTop: "2px",
              marginBottom: "1px",
            }}
          >
            <h3
              style={{
                margin: "0 0 2px 0",
                color: "#1e293b",
                fontSize: "0.8rem",
                fontWeight: "700",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "1px",
              }}
            >
              Passenger Details
            </h3>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
              }}
            >
              Number of Adults *
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#fafafa",
              }}
            >
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfAdults", false)}
                disabled={form.numberOfAdults <= 1}
                style={{
                  width: "20px",
                  height: "20px",
                  background: form.numberOfAdults <= 1 ? "#f8fafc" : "#fff",
                  cursor: form.numberOfAdults <= 1 ? "not-allowed" : "pointer",
                  border: "none",
                  borderRight: "1px solid #e2e8f0",
                  fontSize: "10px",
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
                  fontSize: "10px",
                  backgroundColor: "transparent",
                  padding: "2px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              />
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfAdults", true)}
                style={{
                  width: "20px",
                  height: "20px",
                  background: "#fff",
                  cursor: "pointer",
                  border: "none",
                  borderLeft: "1px solid #e2e8f0",
                  fontSize: "10px",
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
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
              }}
            >
              Number of Children *
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#fafafa",
              }}
            >
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfChildren", false)}
                disabled={form.numberOfChildren <= 0}
                style={{
                  width: "24px",
                  height: "24px",
                  background: form.numberOfChildren <= 0 ? "#f8fafc" : "#fff",
                  cursor:
                    form.numberOfChildren <= 0 ? "not-allowed" : "pointer",
                  border: "none",
                  borderRight: "1px solid #e2e8f0",
                  fontSize: "12px",
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
                  fontSize: "10px",
                  backgroundColor: "transparent",
                  padding: "2px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              />
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfChildren", true)}
                style={{
                  width: "20px",
                  height: "20px",
                  background: "#fff",
                  cursor: "pointer",
                  border: "none",
                  borderLeft: "1px solid #e2e8f0",
                  fontSize: "10px",
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
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
              }}
            >
              Number of Infants *
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#fafafa",
              }}
            >
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfInfants", false)}
                disabled={form.numberOfInfants <= 0}
                style={{
                  width: "24px",
                  height: "24px",
                  background: form.numberOfInfants <= 0 ? "#f8fafc" : "#fff",
                  cursor: form.numberOfInfants <= 0 ? "not-allowed" : "pointer",
                  border: "none",
                  borderRight: "1px solid #e2e8f0",
                  fontSize: "12px",
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
                readOnly
                style={{
                  flex: 1,
                  border: "none",
                  textAlign: "center",
                  fontSize: "10px",
                  backgroundColor: "transparent",
                  padding: "2px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              />
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfInfants", true)}
                style={{
                  width: "20px",
                  height: "20px",
                  background: "#fff",
                  cursor: "pointer",
                  border: "none",
                  borderLeft: "1px solid #e2e8f0",
                  fontSize: "10px",
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
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
              }}
            >
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
              marginTop: "2px",
              marginBottom: "1px",
            }}
          >
            <h3
              style={{
                margin: "0 0 2px 0",
                color: "#1e293b",
                fontSize: "0.8rem",
                fontWeight: "700",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "1px",
              }}
            >
              Destination & Package
            </h3>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
              }}
            >
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
            <label
              style={{
                display: "block",
                marginBottom: "1px",
                fontWeight: "600",
                color: "#374151",
                fontSize: "10px",
              }}
            >
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
          <div style={{ gridColumn: "1 / -1", marginTop: "2px" }}>
            <h3
              style={{
                margin: "0 0 2px 0",
                color: "#1e293b",
                fontSize: "0.8rem",
                fontWeight: "700",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "1px",
              }}
            >
              Additional Information
            </h3>

            <div style={{ display: "flex", gap: "6px" }}>
              <div style={{ flex: 2 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "2px",
                    fontWeight: "600",
                    color: "#374151",
                    fontSize: "11px",
                  }}
                >
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  placeholder="Provide any additional details or specific requests..."
                  value={form.description}
                  onChange={handleChange}
                  rows={1}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "30px",
                  }}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.backgroundColor = "#fafafa";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "2px",
                    fontWeight: "600",
                    color: "#374151",
                    fontSize: "11px",
                  }}
                >
                  File Attachment (Optional)
                </label>
                <input
                  name="fileAttachment"
                  type="file"
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    paddingTop: "4px",
                    paddingBottom: "4px",
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
        </div>

        {/* Action Buttons */}
        <div
          className="action-buttons"
          style={{
            display: "flex",
            gap: "6px",
            justifyContent: "flex-end",
            marginTop: "6px",
            paddingTop: "6px",
            borderTop: "1px solid #f1f5f9",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
              background: "#fff",
              cursor: "pointer",
              fontWeight: "600",
              color: "#6b7280",
              transition: "all 0.3s ease",
              fontSize: "10px",
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
              padding: "4px 8px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "10px",
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
            border-radius: 20px !important;
            max-width: 95vw !important;
            max-height: 90vh !important;
            overflow: auto !important;
          }

          h2 {
            font-size: 2rem !important;
          }

          .form-grid {
            grid-template-columns: 1fr !important;
            overflow: visible !important;
          }

          .form-grid > div[style*="display: flex"] {
            flex-direction: column !important;
          }

          .form-grid > div[style*="display: flex"] > div {
            flex: none !important;
          }

          .action-buttons {
            flex-direction: column !important;
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
            font-size: 1.75rem !important;
          }

          .number-input-container {
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PopupForm;
