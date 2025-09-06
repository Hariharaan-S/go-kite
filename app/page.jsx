// import Wrapper from "@/components/layout/Wrapper";
// import MainHome from "../app/(homes)/landing_page/page";

// export const metadata = {
//   title: "GoKite - Travel & Tour",
//   description: "GoKite - Travel & Tour",
// };

// export default function Home() {
//   return (
//     <>
//       <Wrapper>
//         <MainHome />
//       </Wrapper>
//     </>
//   );
// }
import DefaultFooter from "@/components/footer/default";
import Header1 from "@/components/header/Navbar";
import Hero1 from "@/components/landingpage/hero";
import HolidayDestinations from "@/components/landingpage/holiday-destintion";
import VisaDestinationCards from "@/components/landingpage/visa-destination";
import HotelDealsCards from "@/components/landingpage/Hotel-deals";
import Hotels from "@/components/landingpage/Hotels";

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

      <Hotels />

      <HotelDealsCards />

      <DefaultFooter />
    </>
  );
};

export default Home_1;
