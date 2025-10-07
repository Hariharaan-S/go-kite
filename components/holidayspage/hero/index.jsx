"use client";
import React from "react";
import HotelSearch from "../hotel-search/hotel-search";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/holidays-hero.css";

const FALLBACK_IMAGE = "/img/holidays/holidayHeroBG.jpg";

function getCookie(name) {
  if (typeof document === "undefined") return "";
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : "";
}

const HolidaysHero = () => {
  const [images, setImages] = React.useState([FALLBACK_IMAGE]);
  const [searchType, setSearchType] = React.useState("city");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const getAuthHeaders = () => {
    const token = getCookie("accesstoken");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  React.useEffect(() => {
    const loadBanner = async () => {
      try {
        const sectionsRes = await fetch("/api/cms/pages-sections", {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({ pageId: 63 }),
        });
        if (!sectionsRes.ok) throw new Error("Failed to load sections");
        const sectionsJson = await sectionsRes.json();
        const sections = Array.isArray(sectionsJson?.data)
          ? sectionsJson.data
          : [];
        const bannerSection = sections.find((s) => s.contentType === "BANNER");
        if (!bannerSection?.pageSectionId)
          throw new Error("Banner section not found");

        const bannerRes = await fetch("/api/cms/section-banners", {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({ pageSectionId: bannerSection.pageSectionId }),
        });
        if (!bannerRes.ok) throw new Error("Failed to load banner");
        const bannerJson = await bannerRes.json();
        const bannersArr = Array.isArray(bannerJson?.data)
          ? bannerJson.data
          : [];
        const imgs = bannersArr
          .map((b) => b?.bannerImageUrl)
          .filter(Boolean)
          .map(
            (name) => `/api/cms/file-download?image=${encodeURIComponent(name)}`
          );
        setImages(imgs.length ? imgs : [FALLBACK_IMAGE]);
      } catch (_) {
        setImages([FALLBACK_IMAGE]);
      }
    };
    loadBanner();
  }, []);

  // Slider settings for banner carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
  };

  return (
    <>
      <div className="hero-carousel-container">
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index}>
              <div
                className="hero"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h1>A Lifetime Memory of Holidays</h1>
                <p className="hero-subtopic">
                  Plan your holiday with our Tailored Packages for your Solo
                  Trip, Honeymoon, Family Trip, Corporate Workstation
                </p>

                <HotelSearch
                  searchType={searchType}
                  setSearchType={setSearchType}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  suggestions={suggestions}
                  setSuggestions={setSuggestions}
                  showDropdown={showDropdown}
                  setShowDropdown={setShowDropdown}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />

                <p className="book-agent">
                  Book a Meeting with our Travel Agent{" "}
                  <img
                    src="img/holidays/arrow.svg"
                    width="20px"
                    height="20px"
                  />
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default HolidaysHero;
