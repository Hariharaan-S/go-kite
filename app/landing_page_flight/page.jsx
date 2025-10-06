import Header1 from "@/components/header/IconNav";
import Hero1 from "@/components/landingpageflight/hero";
import Hotels from "@/components/landingpageflight/Hotels";
import FlightCards from "@/components/landingpageflight/FlightCards";
import AirlineCard from "@/components/landingpageflight/AirlinesCard";
import VacationDestinations from "@/components/landingpageflight/VacationCard";
import GoKiteFooter from "@/components/footer/footer-gokite";

export const metadata = {
  title: "GoKite - Travel & Tour ",
  description: "GoKite - Travel & Tour ",
};

const Home_1 = () => {
  return (
    <>
      <Header1 />

      <Hero1 />

      <FlightCards />

      <AirlineCard />

      <VacationDestinations />

      <Hotels />

      <GoKiteFooter />
    </>
  );
};

export default Home_1;
