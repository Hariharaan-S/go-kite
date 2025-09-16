import DefaultFooter from "@/components/footer/default";
import GoKiteFooter from "@/components/footer/footer-gokite";
import Header1 from "@/components/header/Navbar";
import Hero1 from "@/components/landingpagevisa/hero";
import HolidayDestinations from "@/components/landingpagevisa/holiday-destintion";
import VisaDestinationCards from "@/components/landingpagevisa/visa-destination";

export const metadata = {
  title: "GoKite - Travel & Tour ",
  description: "GoKite - Travel & Tour ",
};

const Home_1 = () => {
  return (
    <>
      <Header1 />

      <Hero1 />

      <HolidayDestinations />
      

      <VisaDestinationCards />

      <GoKiteFooter />
    </>
  );
};

export default Home_1;


// import DefaultFooter from "@/components/footer/default";
// import GoKiteFooter from "@/components/footer/footer-gokite";
// import Header1 from "@/components/header/IconNav";
// import Hero1 from "@/components/landingpagevisahome/hero";
// import VisaCards from "@/components/landingpagevisahome/popularvisa-card";
// import TravelVisaCards from "@/components/landingpagevisahome/search-country";
// import StepVisa from "@/components/landingpagevisahome/steps-visa";

// export const metadata = {
//   title: "GoKite - Travel & Tour",
//   description: "GoKite - Travel & Tour",
// };

// const Home_1 = () => {
//   return (
//     <>
//       <Header1 />

//       <Hero1 />

//       <VisaCards />

//       <TravelVisaCards />

//       <StepVisa />

//       <GoKiteFooter />
//     </>
//   );
// };

// export default Home_1;
