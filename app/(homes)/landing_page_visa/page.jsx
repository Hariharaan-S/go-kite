import DefaultFooter from "@/components/footer/default";
import Header1 from "@/components/header/Navbar";
import Hero1 from "@/components/landingpagevisa/hero";
import HolidayDestinations from "@/components/landingpagevisa/holiday-destintion";
import VisaDestinationCards from "@/components/landingpagevisa/visa-destination";
import HotelDealsCards from "@/components/landingpagevisa/Hotel-deals";
import Hotels from "@/components/landingpagevisa/Hotels";

export const metadata = {
  title: "Home-1 || GoKite - Travel & Tour ",
  description: "GoKite - Travel & Tour ",
};

const Home_1 = () => {
  return (
    <>
      <Header1 />

      <Hero1 />

      <HolidayDestinations />

      <VisaDestinationCards />

      {/* <Hotels />

      <HotelDealsCards /> */}

      <DefaultFooter />
    </>
  );
};

export default Home_1;
