"use client";
import GoKiteFooter from "@/components/footer/footer-gokite";
import Header1 from "@/components/header/IconNav";
import Hero1 from "@/components/landingpagevisahome/hero";
import VisaCards from "@/components/landingpagevisahome/popularvisa-card";
import TravelVisaCards from "@/components/landingpagevisahome/search-country";
import StepVisa from "@/components/landingpagevisahome/steps-visa";
import { usePageContext } from "@/components/common/PageContext";

// export const metadata = {
//   title: "GoKite - Travel & Tour",
//   description: "GoKite - Travel & Tour",
// };

const Home_1 = () => {
  const { loading } = usePageContext();
  if (loading) {
    return (
      <>
        <Header1 />
        <div style={{ padding: "60px 0", textAlign: "center" }}>Loading...</div>
        <GoKiteFooter />
      </>
    );
  }
  return (
    <>
      <Header1 />
      <Hero1 />
      <VisaCards />
      <TravelVisaCards />
      <StepVisa />
      <GoKiteFooter />
    </>
  );
};

export default Home_1;
