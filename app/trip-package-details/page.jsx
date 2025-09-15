"use client";
import React, { useState } from "react";
import "photoswipe/dist/photoswipe.css";
import toursData from "@/data/tours";
import Header1 from "@/components/header/IconNav";
import Faq from "@/components/faq/Faq";
import Itinerary from "@/components/trip-package-details/itinerary";
import TourGallery from "@/components/trip-package-details/TourGallery";
import IncludedAccordion from "@/components/trip-package-details/accordion";
import './trip-page.css'

const TourSingleV1Dynamic = ({ params }) => {
  const id = params.id;
  const tour = toursData.find((item) => item.id == id) || toursData[0];

  const [popupOpen, setPopupOpen] = useState(false);

  const handleFormSubmit = (data) => {
    // Handle form data (send to API, etc.)
    console.log("Form submitted:", data);
  };

  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 />
      {/* End Header 1 */}

      <TourGallery tour={tour} />

      {/* Enquire Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "2rem" }}>
        <button
          className="button px-15 py-10 -blue-1"
          onClick={() => setPopupOpen(true)}
        >
          Enquire
        </button>
      </div>

      {/* Popup Form */}
      <PopupForm open={popupOpen} onClose={() => setPopupOpen(false)} onSubmit={handleFormSubmit} />

      {/* End single page content */}

      <section className="border-top-light  mt-40 pt-40">
        <div className="container">
          <h3 className="text-22 fw-500 mb-20">Itinerary</h3>
          <p>Starting from the meeting point for the rest of the group Bromo tour at Malang Train Station and ending at this point too. This trip begins after all
            participants gather and are ready to depart from Malang city at 01.30 AM, then will explore a total of 8 spots starting from the Bromo sunrise
            point. This tour includes transport, guide, documentation, and breakfast</p>
          <Itinerary />
        </div>
      </section>
      {/* End Itinerary */}
      <section className="accordion">
        <h3>What's Included</h3>
        <p className="expand-all">Expand All</p>
        <IncludedAccordion />
      </section>

      <section className="faq">
        <h3>FAQ</h3>
        <p className="expand-all">Expand All</p>
        <Faq />
      </section>
      {/* End Faq about sections */}
    </>
  );
};

export default TourSingleV1Dynamic;
