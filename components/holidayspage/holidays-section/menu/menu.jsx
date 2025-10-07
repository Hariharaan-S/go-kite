"use client"
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "./menu.css";
import HolidaysSectionCards from "../holidays-section-cards";

const GlassmorphMenu = ({ styles, onSelect }) => {
    const pathname = usePathname();
    const [active, setActive] = useState(0);
    const [selectedLabel, setSelectedLabel] = useState("Beaches");

    const menuItems = [
        { src: "img/holidays/beach.png", label: "Beaches" },
        { src: "img/holidays/adventure.png", label: "Adventure" },
        { src: "img/holidays/world wonder.png", label: "World Wonder" },
        { src: "img/holidays/iconic city.png", label: "Iconic City" },
        { src: "img/holidays/country side.png", label: "CountrySide" },
        { src: "img/holidays/kids wonderland.png", label: "Kids Wonderland" },
        { src: "img/holidays/skiing.png", label: "Skiing" },
        { src: "img/holidays/wildlife.png", label: "Wildlife" },
    ];

    useEffect(() => {
        if (!selectedLabel) return;
        const idx = menuItems.findIndex((item) => item.label === selectedLabel);
        if (idx !== -1 && idx !== active) {
            setActive(idx);
        }
    }, [selectedLabel]);

    const handleItemClick = (index, label) => {
        setActive(index);
        setSelectedLabel(label);
        if (typeof onSelect === "function") {
            try { onSelect(label); } catch (_) {}
        }
    };

    return (
        <div>
            <div className="glassmorph-menu" style={styles}>
                <div className="menu-items">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className={`menu-item ${active === index ? "active" : ""}`}
                            onClick={() => handleItemClick(index, item.label)}
                        >
                            <img src={item.src} alt={item.label} />
                            <p>{item.label}</p>
                        </div>
                    ))}

                    {/* Underline that slides */}
                    <div
                        className="underline"
                        style={{ transform: `translateX(${active * 1.6 * 100}%)` }}
                    />
                </div>
            </div>
            {pathname !== "/holiday_list" && (
                <HolidaysSectionCards selectedCategory={selectedLabel} />
            )}
        </div>
    );
};

export default GlassmorphMenu;
