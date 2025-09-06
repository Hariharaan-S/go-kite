import DefaultFooter from "@/components/footer/default";
import Header1 from "@/components/header/IconNav";
import Hero1 from "@/components/landingpagevisahome/hero";
import VisaCards from "@/components/landingpagevisahome/popularvisa-card";
import TravelVisaCards from "@/components/landingpagevisahome/search-country";
import StepVisa from "@/components/landingpagevisahome/steps-visa";

export const metadata = {
  title: "GoKite - Travel & Tour",
  description: "GoKite - Travel & Tour",
};

const Home_1 = () => {
  return (
    <>
      <Header1 />

      <Hero1 />

      <VisaCards />

      <TravelVisaCards />

      <StepVisa />

      <DefaultFooter />
    </>
  );
};

export default Home_1;
