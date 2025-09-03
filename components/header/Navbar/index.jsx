"use client";

import Link from "next/link";
// Removed useEffect and useState since scroll logic is no longer needed
import MobileMenu from "../MobileMenu";

const Header1 = () => {
  return (
    <>
      <header className="header bg-white is-sticky">
        <div className="header__container px-30 sm:px-20">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link href="/" className="header-logo mr-20">
                  <img src="/img/general/logo.svg" alt="logo icon" />
                  <img src="/img/general/logo.svg" alt="logo icon" />
                </Link>
                {/* Other left-side menu items can go here if any */}
              </div>
            </div>
            {/* Move the Hi, Usman button to a separate container at the far right side */}
            <div className="col-auto d-flex items-center">
              <div className="is-menu-opened-hide md:d-none" style={{ borderRadius: "20px" }}>
                <Link
                  href="/login"
                  style={{ borderRadius: "30px" }}
                  className="button px-30 fw-400 text-14 -white bg-black h-50 text-white"
                >
                  Hi, Usman
                </Link>
              </div>
              {/* Start mobile menu icon */}
              <div className="d-none xl:d-flex x-gap-20 items-center pl-30 text-white">
                <div>
                  <Link
                    href="/login"
                    className="d-flex items-center icon-user text-inherit text-22"
                  />
                </div>
                <div>
                  <button
                    className="d-flex items-center icon-menu text-inherit text-20"
                    data-bs-toggle="offcanvas"
                    aria-controls="mobile-sidebar_menu"
                    data-bs-target="#mobile-sidebar_menu"
                  />
                  <div
                    className="offcanvas offcanvas-start  mobile_menu-contnet "
                    tabIndex={-1}
                    id="mobile-sidebar_menu"
                    aria-labelledby="offcanvasMenuLabel"
                    data-bs-scroll="true"
                  >
                    <MobileMenu />
                    {/* End MobileMenu */}
                  </div>
                </div>
              </div>
              {/* End mobile menu icon */}
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
    </>
  );
};

export default Header1;
