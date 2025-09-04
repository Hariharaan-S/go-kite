"use client";

import Link from "next/link";
import MobileMenu from "../MobileMenu";
import { usePathname } from "next/navigation"; // for active state route matching

const navLinks = [
  { href: "/flights", label: "FLIGHT", icon: "/img/landingpage/icons/flight.png" },
  { href: "/activities", label: "ATTRACTION", icon: "/img/landingpage/icons/activity.png" },
  { href: "/holidays", label: "HOLIDAYS", icon: "/img/landingpage/icons/holiday.png" },
  { href: "/hotels", label: "HOTEL", icon: "/img/landingpage/icons/hotel.png" },
  { href: "/visa", label: "VISA", icon: "/img/landingpage/icons/visa.png" },
  { href: "/more", label: "MORE", icon: "/img/landingpage/icons/more.png" },
];

const Header1 = () => {
  const pathname = usePathname();

  return (
    <>
      <header className="header bg-white is-sticky">
        <div className="header__container px-30 sm:px-20">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link href="/" className="header-logo mr-20">
                  <img src="/img/general/logo.svg" alt="logo icon" />
                </Link>

                {/* Navigation Icons */}
                <div className="d-flex items-center ml-40 xl:d-none" style={{ gap: "36px" }}>
                  {navLinks.map((link) => {
                    // For exact match or subpages highlight
                    const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                    return (
                      <Link
                        href={link.href}
                        key={link.label}
                        className="d-flex flex-column items-center text-decoration-none"
                        style={{
                          color: isActive ? "#007bff" : "#333",
                          borderBottom: isActive ? "3px solid #ffb400" : "3px solid transparent",
                          paddingBottom: "4px",
                          fontWeight: 500,
                          transition: "color 0.18s, border-bottom 0.18s"
                        }}
                      >
                        <img
                          src={link.icon}
                          alt={link.label}
                          style={{
                            width: 32,
                            height: 32,
                            marginBottom: 3,
                            filter: isActive ? "none" : "grayscale(35%)"
                          }}
                        />
                        <span style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: isActive ? "#007bff" : "#333"
                        }}>
                          {link.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Search Bar and User Section */}
            <div className="col-auto d-flex items-center" style={{ gap: "20px" }}>
              {/* Search Bar */}
              <div className="xl:d-none" style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  style={{
                    width: "300px",
                    height: "45px",
                    padding: "0 20px 0 45px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "25px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "#f8f9fa"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#007bff";
                    e.target.style.backgroundColor = "#fff";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e0e0e0";
                    e.target.style.backgroundColor = "#f8f9fa";
                  }}
                />
                <div style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#999",
                  fontSize: "18px"
                }}>
                  🔍
                </div>
              </div>

              {/* User Button */}
              <div className="is-menu-opened-hide md:d-none" style={{ borderRadius: "20px" }}>
                <Link
                  href="/login"
                  style={{ borderRadius: "30px" }}
                  className="button px-30 fw-400 text-14 -white bg-black h-50 text-white"
                >
                  Hi, Usman
                </Link>
              </div>

              {/* Mobile Menu Icon */}
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
                    style={{
                      background: "none",
                      border: "none",
                      color: "#333",
                      fontSize: "24px"
                    }}
                  >
                    ☰
                  </button>
                  <div
                    className="offcanvas offcanvas-start mobile_menu-contnet"
                    tabIndex={-1}
                    id="mobile-sidebar_menu"
                    aria-labelledby="offcanvasMenuLabel"
                    data-bs-scroll="true"
                  >
                    <MobileMenu />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header1;
