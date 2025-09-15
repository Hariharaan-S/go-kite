// PopupForm.jsx
"use client";
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
            background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    background: "#fff", borderRadius: 12, padding: 32, minWidth: 320, boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                    display: "flex", flexDirection: "column", gap: 16
                }}
            >
                <h3 style={{ margin: 0 }}>Enquiry Form</h3>
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email ID"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
                />
                <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
                />
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <button type="button" onClick={onClose} style={{ padding: "8px 16px" }}>Cancel</button>
                    <button type="submit" style={{ padding: "8px 16px", background: "#00aff0", color: "#fff", border: "none", borderRadius: 6 }}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default PopupForm;