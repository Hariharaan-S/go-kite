// import CallToActions from "@/components/common/CallToActions";
import Header1 from "@/components/header/Navbar";
import DefaultFooter from "@/components/footer/default";
import TermsConent from "@/components/terms/TermsConent";

export const metadata = {
  title: "Terms & Conditions || GoKite - Travel & Tour ",
  description: "GoKite - Travel & Tour ",
};

const Terms = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 />
      {/* End Header 1 */}

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="tabs js-tabs">
            <TermsConent />
          </div>
        </div>
      </section>
      {/* End terms section */}
{/* 
      <CallToActions /> */}
      {/* End Call To Actions Section */}

      <DefaultFooter />
      {/* End Call To Actions Section */}
    </>
  );
};

export default Terms;
