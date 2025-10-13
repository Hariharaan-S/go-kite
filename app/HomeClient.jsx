"use client";
import Navbar from "@/components/header/Navbar/Navbar";
import HeroSection from "@/components/landingpagevisa/hero/HeroSection";
import HolidayDestinations from "@/components/landingpagevisa/holiday-destintion";
import VisaDestinationCards from "@/components/landingpagevisa/visa-destination";
import GoKiteFooter from "@/components/footer/footer-gokite";
import { usePageContext } from "@/components/common/PageContext";

export default function HomeClient() {
  const { loading } = usePageContext();
  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "60px 0", textAlign: "center" }}>Loading...</div>
        <GoKiteFooter />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <HeroSection />
      <HolidayDestinations />
      <VisaDestinationCards />
      <GoKiteFooter />
    </>
  );
}


