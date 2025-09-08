"use client"
import { useState } from "react";
import "./menu.css";

const GlassmorphMenu = () => {
    const [active, setActive] = useState(0);

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

    return (
        <div className="glassmorph-menu">
            <div className="menu-items">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`menu-item ${active === index ? "active" : ""}`}
                        onClick={() => setActive(index)}
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
    );
};

export default GlassmorphMenu;
