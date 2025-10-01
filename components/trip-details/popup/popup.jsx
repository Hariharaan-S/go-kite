import React, { useMemo, useState } from "react";
import { Country } from "country-state-city";
import "../styles/popup.css";

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
    toDate: ""
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState("");

  const ENQUIRY_ENDPOINT =
    "/api/enquiry";

  const countries = Country.getAllCountries();
  const phoneCodes = useMemo(() => {
    const codes = Array.from(new Set(countries.map((c) => c.phonecode))).filter(Boolean);
    return codes.sort((a, b) => Number(a) - Number(b));
  }, [countries]);

  if (!open) return null;

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
        } catch (_) { }
      }
    } catch (err) {
      setApiError(String(err.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="popup-overlay">
      <form onSubmit={handleSubmit} className="popup-form">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="close-button"
        >
          ×
        </button>

        {/* Header */}
        <div className="form-header">
          <img
            src="/img/general/logo.svg"
            alt="Logo"
            className="logo"
          />
          <h2 className="form-title">
            Holidays Enquiry Form
          </h2>
          <p className="form-subtitle">
            Please fill in your details for holidays assistance
          </p>
        </div>

        {/* API response / error banner */}
        {apiResponse && (
          <div className="api-response">
            <div className="response-title">Success</div>
            <pre className="response-content">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}
        {apiError && (
          <div className="api-error">
            {apiError}
          </div>
        )}

        {/* Form Grid */}
        <div className="form-grid">
          {/* Personal Information Section */}
          <div className="section-header">
            <h3 className="section-title">
              Personal Information
            </h3>
          </div>

          <div>
            <label className="field-label">
              First Name *
            </label>
            <input
              name="customerFirstName"
              placeholder="Enter your first name"
              value={form.customerFirstName}
              onChange={handleChange}
              required
              className={`form-input ${errors.customerFirstName ? 'input-error' : ''}`}
            />
            {errors.customerFirstName && (
              <span className="error-message">
                {errors.customerFirstName}
              </span>
            )}
          </div>

          <div>
            <label className="field-label">
              Last Name *
            </label>
            <input
              name="customerLastName"
              placeholder="Enter your last name"
              value={form.customerLastName}
              onChange={handleChange}
              required
              className={`form-input ${errors.customerLastName ? 'input-error' : ''}`}
            />
            {errors.customerLastName && (
              <span className="error-message">
                {errors.customerLastName}
              </span>
            )}
          </div>

          <div>
            <label className="field-label">
              Country of Residence *
            </label>
            <select
              name="countryOfResidence"
              value={form.countryOfResidence}
              onChange={handleChange}
              required
              className={`form-input ${errors.countryOfResidence ? 'input-error' : ''}`}
            >
              <option value="">Select your country of residence</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.countryOfResidence && (
              <span className="error-message">
                {errors.countryOfResidence}
              </span>
            )}
          </div>

          <div>
            <label className="field-label">
              Nationality *
            </label>
            <select
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              required
              className={`form-input ${errors.nationality ? 'input-error' : ''}`}
            >
              <option value="">Select your nationality</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.nationality && (
              <span className="error-message">
                {errors.nationality}
              </span>
            )}
          </div>

          {/* Contact and Trip Details */}
          <div className="section-header section-spacing">
            <h3 className="section-title">
              Contact & Trip Details
            </h3>
          </div>

          <div>
            <label className="field-label">
              Email Address *
            </label>
            <input
              name="customerEmail"
              type="email"
              placeholder="Enter your email address"
              value={form.customerEmail}
              onChange={handleChange}
              required
              className={`form-input ${errors.customerEmail ? 'input-error' : ''}`}
            />
            {errors.customerEmail && (
              <span className="error-message">
                {errors.customerEmail}
              </span>
            )}
          </div>

          <div>
            <label className="field-label">
              Phone Code *
            </label>
            <select
              name="customerPhone"
              value={form.customerPhone}
              onChange={handleChange}
              required
              className={`form-input ${errors.customerPhone ? 'input-error' : ''}`}
            >
              <option value="">Select phone code</option>
              {phoneCodes.map((code) => (
                <option key={code} value={code}>
                  +{code}
                </option>
              ))}
            </select>
            {errors.customerPhone && (
              <span className="error-message">
                {errors.customerPhone}
              </span>
            )}
          </div>

          <div className="full-width">
            <label className="field-label">Type *</label>
            <div className="radio-group">
              {tripTypes.map((t) => (
                <label key={t} className="radio-label">
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
              <span className="error-message">{errors.type}</span>
            )}
          </div>

          <div>
            <label className="field-label">
              Name of the Company
            </label>
            <input
              name="nameOfTheCompany"
              placeholder="Enter company name"
              value={form.nameOfTheCompany}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label className="field-label">Residence</label>
            <input
              name="residence"
              placeholder="Enter your city / residence"
              value={form.residence}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="field-label">From Date</label>
            <input
              name="fromDate"
              type="date"
              min={today}
              value={form.fromDate}
              onChange={handleChange}
              className={`form-input ${errors.fromDate ? 'input-error' : ''}`}
            />
            {errors.fromDate && (
              <span className="error-message">{errors.fromDate}</span>
            )}
          </div>

          <div>
            <label className="field-label">To Date</label>
            <input
              name="toDate"
              type="date"
              min={today}
              value={form.toDate}
              onChange={handleChange}
              className={`form-input ${errors.toDate ? 'input-error' : ''}`}
            />
            {errors.toDate && (
              <span className="error-message">{errors.toDate}</span>
            )}
          </div>

          {/* Party & Budget */}
          <div className="section-header section-spacing">
            <h3 className="section-title">
              Passenger & Budget
            </h3>
          </div>

          {/* Number of Adults */}
          <div>
            <label className="field-label">
              Number of Adults *
            </label>
            <div className="number-input-container">
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfAdults", false)}
                disabled={form.numberOfAdults <= 1}
                className={`number-button ${form.numberOfAdults <= 1 ? 'disabled' : ''}`}
              >
                −
              </button>
              <input
                type="number"
                value={form.numberOfAdults}
                readOnly
                className="number-display"
              />
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfAdults", true)}
                className="number-button"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="field-label">
              Number of Children *
            </label>
            <div className="number-input-container">
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfChildren", false)}
                disabled={form.numberOfChildren <= 0}
                className={`number-button ${form.numberOfChildren <= 0 ? 'disabled' : ''}`}
              >
                −
              </button>
              <input
                type="number"
                value={form.numberOfChildren}
                readOnly
                className="number-display"
              />
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfChildren", true)}
                className="number-button"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="field-label">Number of Infants *</label>
            <div className="number-input-container">
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfInfants", false)}
                disabled={form.numberOfInfants <= 0}
                className={`number-button ${form.numberOfInfants <= 0 ? 'disabled' : ''}`}
              >
                −
              </button>
              <input
                type="number"
                value={form.numberOfInfants}
                required
                readOnly
                className="number-display"
              />
              <button
                type="button"
                onClick={() => handleNumberChange("numberOfInfants", true)}
                className="number-button"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="field-label">Budget</label>
            <input
              name="budget"
              type="number"
              placeholder="Enter budget"
              value={form.budget}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Destination & Package */}
          <div className="section-header section-spacing">
            <h3 className="section-title">
              Destination & Package
            </h3>
          </div>

          <div>
            <label className="field-label">Destination</label>
            <input
              name="destination"
              placeholder="Enter destination"
              value={form.destination}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label className="field-label">Package Name *</label>
            <input
              name="packageName"
              placeholder="Enter package name"
              required
              value={form.packageName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Additional Information Section */}
          <div className="section-header section-spacing">
            <h3 className="section-title">
              Additional Information
            </h3>

            <div className="description-container">
              <label className="field-label">
                Description (Optional)
              </label>
              <textarea
                name="description"
                placeholder="Provide any additional details or specific requests..."
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="form-textarea"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button
            type="button"
            onClick={onClose}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Enquiry"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopupForm;