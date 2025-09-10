"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
    { href: "/flights", label: "FLIGHT", icon: "/img/landingpage/icons/flight.png" },
    { href: "/activities", label: "ATTRACTION", icon: "/img/landingpage/icons/activity.png" },
    { href: "/holidays", label: "HOLIDAYS", icon: "/img/landingpage/icons/holiday.png" },
    { href: "/hotels", label: "HOTEL", icon: "/img/landingpage/icons/hotel.png" },
    { href: "/visa", label: "VISA", icon: "/img/landingpage/icons/visa.png" },
    { href: "/more", label: "MORE", icon: "/img/landingpage/icons/more.png" },
];

const CustomHeader = () => {
    const pathname = usePathname();
    const [isSmall, setIsSmall] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 400px)");
        const update = () => setIsSmall(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    return (
        <header className="header bg-white" style={{ position: "relative" }}>
            <div className="header__container px-30 sm:px-20">
                <div className="row justify-between items-center">
                    <div className="col-auto" style={{ width: "100%" }}>
                        <div className="d-flex items-center">
                            <div
                                className="d-flex items-center ml-40"
                                style={{
                                    gap: isSmall ? "12px" : "36px",
                                    marginLeft: isSmall ? "0" : "40px",
                                    flexWrap: isSmall ? "wrap" : "nowrap",
                                    justifyContent: isSmall ? "space-between" : "flex-start",
                                    width: "100%",
                                }}
                            >
                                {navLinks.map((link) => {
                                    const isActive =
                                        pathname === link.href || pathname.startsWith(link.href + "/");
                                    return (
                                        <Link
                                            href={link.href}
                                            key={link.label}
                                            className="d-flex flex-column items-center text-decoration-none"
                                            style={{
                                                color: isActive ? "#007bff" : "#333",
                                                borderBottom: isActive
                                                    ? "3px solid #ffb400"
                                                    : "3px solid transparent",
                                                paddingBottom: "4px",
                                                fontWeight: 500,
                                                transition: "color 0.18s, border-bottom 0.18s",
                                            }}
                                        >
                                            <img
                                                src={link.icon}
                                                alt={link.label}
                                                style={{
                                                    width: isSmall ? 24 : 32,
                                                    height: isSmall ? 24 : 32,
                                                    marginBottom: 3,
                                                    filter: isActive ? "none" : "grayscale(35%)",
                                                }}
                                            />
                                            <span
                                                style={{
                                                    fontSize: isSmall ? 10 : 12,
                                                    fontWeight: 500,
                                                    color: isActive ? "#007bff" : "#333",
                                                }}
                                            >
                                                {link.label}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default CustomHeader;
