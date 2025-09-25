"use client";
import Navbar from "@/components/header/NewNav";
import ApplyVisa from "@/components/applyvisa/ApplyVisa";
import Footer from "@/components/footer/footer-gokite";
import CustomHeader from "@/components/apply-visa-custom-header/custom-header";
import { useEffect, useState } from "react";
import "./styles/apply-visa.styles.css";

const ApplyVisaPage = () => {
  const [isMobileView, setIsMobileView] = useState(false);

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

  return (
    <>
      <Navbar />
      {isMobileView && <CustomHeader />}
      <ApplyVisa />
      <Footer />
    </>
  );
};

export default ApplyVisaPage;
