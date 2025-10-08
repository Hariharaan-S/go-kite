"use client";
import Header1 from "@/components/header/IconNav";
import TopHeaderFilter from "@/components/holiday-list/TopHeaderFilter";
import Pagination from "@/components/holiday-list/Pagination";
import Sidebar from "@/components/holiday-list/Sidebar";
import HotelProperties from "@/components/holiday-list/HolidayLists";
import VacationCard from "@/components/holiday-list/VacationCard";
import MainFilterSearchBoxNew from "@/components/holiday-list/MainFilterSearchBoxNew";
import GoKiteFooter from "@/components/footer/footer-gokite";
import { useState } from "react";
import React from "react";

// export const metadata = {
//   title: "GoKite - Travel & Tour ",
//   description: "GoKite - Travel & Tour ",
// };

const index = () => {
  const [packageCategoryId, setPackageCategoryId] = useState(1);
  const [selectedLabel, setSelectedLabel] = useState("Beaches");
  const [countryId, setCountryId] = useState(null);

  const handleCategoryChange = (categoryId, label) => {
    setPackageCategoryId(categoryId);
    if (label) setSelectedLabel(label);
  };

  // Read countryId from sessionStorage if present
  React.useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? sessionStorage.getItem('holidayCountryId') : null;
      // Always log what we read (including null/empty)
      console.log('Holiday redirection countryId (raw):', stored);
      if (stored) setCountryId(stored);
    } catch (_) {}
  }, []);

  // After using the countryId (passed to list component), clear it from sessionStorage
  React.useEffect(() => {
    if (countryId) {
      try { sessionStorage.removeItem('holidayCountryId'); } catch (_) {}
    }
  }, [countryId]);

  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 />
      {/* End Header 1 */}

      <section className="pt-40 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* <div className="text-center">
                <h1 className="text-30 fw-600">Find Your Dream Luxury Hotel</h1>
              </div> */}
              {/* End text-center */}
              <MainFilterSearchBoxNew onCategoryChange={handleCategoryChange} selectedLabel={selectedLabel} />
            </div>
            {/* End col-12 */}
          </div>
        </div>
      </section>


      {/* Top SearchBanner */}

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            {/* End col */}

            <div className="col-xl-9 ">
              <TopHeaderFilter />
              <div className="mt-30"></div>
              {/* End mt--30 */}
              <div className="row y-gap-30">
                <HotelProperties packageCategoryId={packageCategoryId} countryId={countryId} />
              </div>
              {/* End .row */}
              <Pagination />
            </div>
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
