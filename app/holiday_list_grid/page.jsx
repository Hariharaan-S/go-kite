import Header1 from "@/components/header/IconNav";
import DefaultFooter from "@/components/footer/default";
import MainFilterSearchBox from "@/components/hotel-list-v4/MainFilterSearchBox";
import TopHeaderFilter from "@/components/hotel-list-v4/TopHeaderFilter";
import Pagination from "@/components/hotel-list-v4/Pagination";
import Sidebar from "@/components/hotel-list-v4/Sidebar";
import HotelProperties from "@/components/hotel-list-v4/HotelProperties";
import VacationCard from "@/components/hotel-list-v4/VacationCard";
import GoKiteFooter from "@/components/footer/footer-gokite";

export const metadata = {
  title: "GoKite - Travel & Tour ",
  description: "GoKite - Travel & Tour ",
};

const index = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 />
      {/* End Header 1 */}

      <section className="pt-40 pb-40 bg-blue-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* <div className="text-center">
                <h1 className="text-30 fw-600">Find Your Dream Luxury Hotel</h1>
              </div> */}
              {/* End text-center */}
              <MainFilterSearchBox />
            </div>
            {/* End col-12 */}
          </div>
        </div>
      </section>


      {/* Top SearchBanner */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none">
                <Sidebar />
              </aside>
              {/* End sidebar for desktop */}

              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    Filter Sidebar
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                {/* End offcanvas header */}

                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40  xl:d-block">
                    <Sidebar />
                  </aside>
                </div>
                {/* End offcanvas body */}
              </div>
              {/* End mobile menu sidebar */}
            </div>
            {/* End col */}

            <div className="col-xl-9 ">
              <TopHeaderFilter />
              <div className="mt-30"></div>
              {/* End mt--30 */}
              <div className="row y-gap-30">
                <HotelProperties />
              </div>
              {/* End .row */}
              <Pagination />
            </div>
            {/* End .col for right content */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>

      <section style={{ width: "100vw", overflow: "hidden" }}>
        <img
          src="/img/general/50+card.png"
          alt="Get Global Visa"
          style={{ width: "100vw", display: "block", height: "auto" }}
        />
      </section>

      <VacationCard />

      <GoKiteFooter />
    </>
  );
};

export default index;
