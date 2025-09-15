import React, { useState } from "react";

const PopupForm = ({ open, onClose, onSubmit }) => {
    const [form, setForm] = useState({ name: "", email: "", phone: "" });

    if (!open) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        onClose();
    };

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: 40,
                    minWidth: 360,
                    maxWidth: "90vw",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.25)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    alignItems: "center",
                }}
            >
                {/* Logo */}
                <img
                    src="/img/general/logo.svg"
                    alt="Logo"
                    style={{ width: 120, marginBottom: 12 }}
                />
                {/* Heading */}
                <h3 style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: "1.8rem",
                    color: "#223344",
                    letterSpacing: "0.03em",
                }}>
                    Enquiry Form
                </h3>

                {/* Inputs container to control width */}
                <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 18 }}>
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={{
                            padding: 12,
                            borderRadius: 8,
                            border: "1.5px solid #bbb",
                            fontSize: 16,
                            outline: "none",
                            transition: "border-color 0.3s",
                        }}
                        onFocus={e => e.target.style.borderColor = "#2962ff"}
                        onBlur={e => e.target.style.borderColor = "#bbb"}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email ID"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={{
                            padding: 12,
                            borderRadius: 8,
                            border: "1.5px solid #bbb",
                            fontSize: 16,
                            outline: "none",
                            transition: "border-color 0.3s",
                        }}
                        onFocus={e => e.target.style.borderColor = "#2962ff"}
                        onBlur={e => e.target.style.borderColor = "#bbb"}
                    />
                    <input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        style={{
                            padding: 12,
                            borderRadius: 8,
                            border: "1.5px solid #bbb",
                            fontSize: 16,
                            outline: "none",
                            transition: "border-color 0.3s",
                        }}
                        onFocus={e => e.target.style.borderColor = "#2962ff"}
                        onBlur={e => e.target.style.borderColor = "#bbb"}
                    />
                </div>

                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", width: "100%", maxWidth: 320 }}>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            padding: "10px 28px",
                            borderRadius: 8,
                            border: "1.5px solid #888",
                            background: "transparent",
                            cursor: "pointer",
                            fontWeight: 600,
                            color: "#555",
                            transition: "background-color 0.3s, color 0.3s",
                        }}
                        onMouseEnter={e => {
                            e.target.style.backgroundColor = "#eee";
                            e.target.style.color = "#222";
                        }}
                        onMouseLeave={e => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "#555";
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        style={{
                            padding: "10px 28px",
                            background: "linear-gradient(90deg, #007bff, #00aff0)",
                            boxShadow: "0 4px 14px rgba(0,175,240,0.5)",
                            color: "#fff",
                            border: "none",
                            borderRadius: 8,
                            cursor: "pointer",
                            fontWeight: 700,
                            transition: "background 0.3s",
                        }}
                        onMouseEnter={e => e.target.style.background = "linear-gradient(90deg, #005fc1, #008cd4)"}
                        onMouseLeave={e => e.target.style.background = "linear-gradient(90deg, #007bff, #00aff0)"}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PopupForm;
