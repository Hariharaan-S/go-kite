"use client";

import React, { useState } from "react";
import SidebarRight from "@/components/trip-package-details/SidebarRight";
import Overview from "@/components/trip-package-details/Overview";
import TourSnapShot from "@/components/trip-package-details/TourSnapShot";

import ModalVideo from "../common/ModalVideo";
import "./styles/tour-gallery.css";

export default function TourGallery({ tour }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <ModalVideo isOpen={isOpen} videoId="oqNZOOWF8qM" setIsOpen={setOpen} />
      <section className="pt-40 js-pin-container">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-12">
              <div className="trip-images">
                {/* First column */}
                <div className="trip-image trip-image-1">
                  <img src="img/trip-package/trip-image-1.jpg" alt="" />
                </div>

                {/* Second column */}
                <div className="trip-image-group">
                  <div className="trip-image image2">
                    <img src="img/trip-package/trip-image-2.jpg" alt="" />
                  </div>
                  <div className="trip-image image3">
                    <img src="img/trip-package/trip-image-3.jpg" alt="" />
                  </div>
                </div>

                {/* Third column */}
                <SidebarRight tour={tour} />
              </div>

              {/* End relative */}

              {/* slider gallery */}

              <TourSnapShot />
              {/* End toursnapshot */}

              <Overview />
              {/* End  Overview */}
            </div>
            {/* End .col-xl-8 */}

            {/* End .col-xl-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* End container */}
      </section>
    </>
  );
}
