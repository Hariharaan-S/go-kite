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

  // Authorization and claims headers
  const CLAIMS = {
    AUTHENTICATED: "true",
    org_id: "0631f265-d8de-4608-9622-6b4e148793c4",
    OTP_VERFICATION_REQD: "false",
    USER_ID: "0af402d1-98f0-18ae-8198-f493454d0001",
    refreshtoken: "false",
    client_ip: "14.99.174.62",
    USER_ID_LONG: "563",
    USER_NAME: "codetezteam@gmail.com",
    "authorized-domains":
      "b603f35d-9242-11f0-b493-fea20be86931, b603edb7-9242-11f0-b493-fea20be86931, b603e748-9242-11f0-b493-fea20be86931, b603d5d9-9242-11f0-b493-fea20be86931",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
  };

  const getAuthHeaders = () => {
    return {
      "Content-Type": "application/json",
      claims: JSON.stringify(CLAIMS),
    };
  };

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
          "https://gokite-sit-b2c.convergentechnologies.com/api/cms/api/v2/list/custom/data/visa-country-search",
          {
            method: "POST",
            headers: getAuthHeaders(),
            // body: JSON.stringify({ countryId }),
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
