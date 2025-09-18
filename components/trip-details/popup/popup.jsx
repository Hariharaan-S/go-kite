import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PopupForm = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    customerFirstName: "",
    customerLastName: "",
    countryOfResidence: "",
    nationality: "",
    destinationCountry: "",
    visaType: "",
    contactNumber: "",
    email: "",
    numberOfAdults: 1,
    numberOfChildren: 0,
    tentativeTravelDate: "",
    description: "",
    fileAttachment: null,
  });

  const [errors, setErrors] = useState({});

  if (!open) return null;

  // Get all countries for dropdowns
  const countries = Country.getAllCountries();

  // Visa types (you can customize these based on your needs)
  const visaTypes = [
    "Tourist Visa",
    "Business Visa",
    "Student Visa",
    "Work Visa",
    "Transit Visa",
    "Medical Visa",
    "Family Visit Visa",
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

  const handlePhoneChange = (value) => {
    setForm({ ...form, contactNumber: value || "" });
    if (errors.contactNumber) {
      setErrors({ ...errors, contactNumber: "" });
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
    if (!form.destinationCountry)
      newErrors.destinationCountry = "Destination country is required";
    if (!form.visaType) newErrors.visaType = "Visa type is required";
    if (!form.contactNumber)
      newErrors.contactNumber = "Contact number is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.tentativeTravelDate)
      newErrors.tentativeTravelDate = "Travel date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(form);
      onClose();
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
            Visa Enquiry Form
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "1.1rem",
              margin: "12px 0 0 0",
              fontWeight: "500",
            }}
          >
            Please fill in your details for visa assistance
          </p>
        </div>

        {/* Form Grid */}
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

          {/* Travel Information Section */}
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
              Travel Information
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
              Destination Country *
            </label>
            <select
              name="destinationCountry"
              value={form.destinationCountry}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                ...(errors.destinationCountry ? errorStyle : {}),
              }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.destinationCountry
                  ? "#ef4444"
                  : "#e2e8f0";
                e.target.style.backgroundColor = errors.destinationCountry
                  ? "#fef2f2"
                  : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="">Select destination country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.destinationCountry && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                {errors.destinationCountry}
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
              Type of Visa *
            </label>
            <select
              name="visaType"
              value={form.visaType}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                ...(errors.visaType ? errorStyle : {}),
              }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.visaType
                  ? "#ef4444"
                  : "#e2e8f0";
                e.target.style.backgroundColor = errors.visaType
                  ? "#fef2f2"
                  : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="">Select visa type</option>
              {visaTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.visaType && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                {errors.visaType}
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
              Tentative Travel Date *
            </label>
            <input
              name="tentativeTravelDate"
              type="date"
              min={today}
              value={form.tentativeTravelDate}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                ...(errors.tentativeTravelDate ? errorStyle : {}),
              }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.tentativeTravelDate
                  ? "#ef4444"
                  : "#e2e8f0";
                e.target.style.backgroundColor = errors.tentativeTravelDate
                  ? "#fef2f2"
                  : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.tentativeTravelDate && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                {errors.tentativeTravelDate}
              </span>
            )}
          </div>

          {/* Contact Information Section */}
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
              Contact Information
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
              Contact Number *
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#fafafa",
                transition: "all 0.3s ease",
              }}
            >
              <PhoneInput
                placeholder="Enter phone number"
                value={form.contactNumber}
                onChange={handlePhoneChange}
                defaultCountry="IN"
                style={{
                  "--PhoneInputCountryFlag-height": "1.2em",
                  "--PhoneInput-color--focus": "#3b82f6",
                  width: "100%",
                }}
                className="phone-input"
                inputStyle={{
                  width: "100%",
                  border: "none",
                  backgroundColor: "transparent",
                  padding: "14px 16px",
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#374151",
                  outline: "none",
                }}
                countrySelectStyle={{
                  border: "none",
                  backgroundColor: "transparent",
                  marginRight: "8px",
                }}
              />
            </div>
            {errors.contactNumber && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                {errors.contactNumber}
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
              Email Address *
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                ...(errors.email ? errorStyle : {}),
              }}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email
                  ? "#ef4444"
                  : "#e2e8f0";
                e.target.style.backgroundColor = errors.email
                  ? "#fef2f2"
                  : "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
            {errors.email && (
              <span
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                {errors.email}
              </span>
            )}
          </div>

          {/* Travel Party Section */}
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
            Passenger Details
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

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#374151",
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
                  paddingTop: "12px",
                  paddingBottom: "12px",
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
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 15px 35px rgba(102, 126, 234, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 10px 25px rgba(102, 126, 234, 0.4)";
            }}
          >
            Submit Enquiry
          </button>
        </div>
      </form>

      <style jsx>{`
        .phone-input .PhoneInputInput {
          border: none !important;
          background: transparent !important;
          padding: 14px 16px !important;
          font-size: 16px !important;
          outline: none !important;
          width: 100% !important;
          color: #374151 !important;
          font-weight: 400 !important;
        }

        .phone-input .PhoneInputCountrySelect {
          border: none !important;
          background: transparent !important;
          margin-right: 8px !important;
        }

        .phone-input .PhoneInputCountryIcon {
          height: 1.2em !important;
        }

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
