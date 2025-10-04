"use client";
import Navbar from "@/components/header/NewNav";
import ApplyVisa from "@/components/applyvisa/ApplyVisa";
import Footer from "@/components/footer/footer-gokite";
import CustomHeader from "@/components/apply-visa-custom-header/custom-header";
import { useEffect, useState } from "react";
import "./styles/apply-visa.styles.css";

const ApplyVisaPage = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [visaDetails, setVisaDetails] = useState(null);
  const [visaError, setVisaError] = useState(null);

  // Use local proxy; server will attach Authorization from cookie
  const getAuthHeaders = () => ({ "Content-Type": "application/json" });

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia("(max-width: 400px)");

    const handleChange = (e) => {
      setIsMobileView(e.matches);
    };

    // Initial check
    setIsMobileView(mobileMediaQuery.matches);

    // Add listener
    mobileMediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mobileMediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Fetch detailed visa data using countryId from sessionStorage
  useEffect(() => {
    async function loadVisaDetails() {
      let countryId = "";
      try {
        if (typeof window !== "undefined") {
          countryId = window.sessionStorage.getItem("applyVisaCountryId") || "";
        }
      } catch (e) { }
      if (!countryId) return;

      try {
        const res = await fetch(
          "/api/cms/visa-country-search",
          {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ countryCode: "AE" }),
          }
        );
        if (!res.ok) throw new Error("Failed to fetch visa details");
        const json = await res.json();
        const details = json?.data?.[0] || null;
        console.log(details);
        setVisaDetails(details);
        setVisaError(null);
        try {
          if (typeof window !== "undefined") {
            window.sessionStorage.setItem("applyVisaDetails", JSON.stringify(details || {}));
          }
        } catch (_) { }
      } catch (e) {
        setVisaError("Failed to load visa details");
      }
    }

    // Prefer using any details already provided by the previous page to avoid an extra network hop
    try {
      if (typeof window !== "undefined") {
        const cached = window.sessionStorage.getItem("applyVisaDetails");
        if (cached) {
          const parsed = JSON.parse(cached);
          setVisaDetails(parsed);
        }
      }
    } catch (_) { }

    loadVisaDetails();
  }, []);

  return (
    <>
      <Navbar />
      {isMobileView && <CustomHeader />}
      <ApplyVisa visaDetails={visaDetails} visaError={visaError} />
      <Footer />
    </>
  );
};

export default ApplyVisaPage;
