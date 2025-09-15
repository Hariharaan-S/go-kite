import GoKiteFooter from "@/components/footer/footer-gokite";
import Header1 from "@/components/header/Navbar";
import BromoMountainBanner from "@/components/trip-details/banner";
import AboutSection from "@/components/trip-details/about";
import PlacesCarousel from "@/components/trip-details/place";
import ItineraryAccordion from "@/components/trip-details/dropdown";

export const metadata = {
  title: "GoKite - Travel & Tour ",
  description: "GoKite - Travel & Tour ",
};

const Home_1 = () => {
  const containerStyle = {
    maxWidth: 1600,
    margin: "0 auto",
    padding: "0 15px",
    boxSizing: "border-box",
  };

  const sectionSpacingStyle = {
    marginBottom: "20px", // Reduced spacing between sections
  };

  return (
    <>
      <Header1 />

      <div style={containerStyle}>
        <div>
          <BromoMountainBanner />
        </div>

        <div style={sectionSpacingStyle}>
          <AboutSection />
        </div>
        <div style={sectionSpacingStyle}>
          <PlacesCarousel />
        </div>
        <div style={sectionSpacingStyle}>
          <ItineraryAccordion />
        </div>
      </div>

      <GoKiteFooter />
    </>
  );
};

export default Home_1;
