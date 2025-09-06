import CallToActions from "@/components/common/CallToActions";
import Header1 from "@/components/header/Navbar";
import DefaultFooter from "@/components/footer/default";
import NotFound from "@/components/common/NotFound";

export const metadata = {
  title: "404 || GoKite - Travel & Tour",
  description: "GoKite - Travel & Tour",
};

const index = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 />
      {/* End Header 1 */}

      <NotFound />
      {/* End 404 section */}

      {/* <CallToActions /> */}
      {/* End Call To Actions Section */}

      <DefaultFooter />
      {/* End Call To Actions Section */}
    </>
  );
};

export default index;
