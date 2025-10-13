import Header1 from "@/components/header/IconNav";
import TopHeaderFilter from "@/components/holidayspage/holiday-list/TopHeaderFilter";
import Pagination from "@/components/holidayspage/holiday-list/Pagination";
import Sidebar from "@/components/holidayspage/holiday-list/Sidebar";
import HotelProperties from "@/components/holidayspage/holiday-list/HolidayLists";
import GoKiteFooter from "@/components/footer/footer-gokite";
import React from "react";

// Utility to turn slug back into a readable name
function deslugify(input) {
  try {
    return decodeURIComponent(String(input || "").replace(/-/g, " ").trim());
  } catch (_) {
    return String(input || "").replace(/-/g, " ").trim();
  }
}

function toTitleCase(input) {
  const str = String(input || "").toLowerCase();
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function CountryHolidaysPage({ params }) {
  const { country: countrySlug } = await params;
  const resolvedName = deslugify(countrySlug);
  const displayName = toTitleCase(resolvedName);

  let countryId = null;
  if (resolvedName) {
    try {
      const res = await fetch(`/api/holiday-country-autocomplete?query=${encodeURIComponent(resolvedName)}`);
      const data = await res.json();
      const list = Array.isArray(data?.data) ? data.data : [];
      const exact = list.find(
        (item) => String(item?.label || "").toLowerCase() === resolvedName.toLowerCase()
      );
      const chosen = exact || list[0];
      if (chosen?.value) {
        countryId = chosen.value;
      }
    } catch (_) {
      countryId = null;
    }
  }

  return (
    <>
      <div className="header-margin"></div>
      <Header1 />

      <section className="pt-40 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1 className="text-30 fw-600">{displayName || "Holidays"}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-9 ">
              <div className="row y-gap-30">
                <HotelProperties packageCategoryId={1} countryId={countryId} cityId={null} />
              </div>
              <Pagination />
            </div>
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none">
                <Sidebar />
              </aside>
              <div className="offcanvas offcanvas-start" tabIndex="-1" id="listingSidebar">
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">Filter Sidebar</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40  xl:d-block">
                    <Sidebar />
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoKiteFooter />
    </>
  );
}


