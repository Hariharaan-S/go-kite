"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { US, IN, SG, CH, ES, TR, LK, AU, BD, GB, FR, AE } from "country-flag-icons/react/3x2";
import "./styles/popularvisa-card.css";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePageContext } from "../common/PageContext";

const VISIBLE_CARDS = 5;
const VISIBLE_VACCINATION_CARDS = 1; // Show one card at a time for mobile

// Country flag mapping
const countryFlagMap = {
  US: US,
  USA: US,
  "United States": US,
  IN: IN,
  India: IN,
  SG: SG,
  Singapore: SG,
  CH: CH,
  Switzerland: CH,
  ES: ES,
  Spain: ES,
  TR: TR,
  Turkey: TR,
  LK: LK,
  "Sri Lanka": LK,
  AU: AU,
  Australia: AU,
  BD: BD,
  Bangladesh: BD,
  GB: GB,
  UK: GB,
  "United Kingdom": GB,
  FR: FR,
  France: FR,
  AE: AE,
  UAE: AE,
  "United Arab Emirates": AE,
};

const VisaCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentVaccinationSlide, setCurrentVaccinationSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [popularVisas, setPopularVisas] = useState([]);
  const [vaccinationCountries, setVaccinationCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const vaccinationContainerRef = useRef(null);
  const sliderRef = useRef(null);
  const router = useRouter();
  const { getPageIdWithFallback, loading: pageLoading } = usePageContext();

  // Read cookie helper; proxies attach token server-side, but keep header consistent
  function getCookie(name) {
    if (typeof document === "undefined") return "";
    const match = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split("=")[1]) : "";
  }

  const getAuthHeaders = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = getCookie("accesstoken");
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  // Dynamic page id from context with fallback
  const PAGE_ID = getPageIdWithFallback('visa', 10);

  // Fetch sections data
  const fetchSectionsData = async () => {
    try {
      const sectionsResponse = await fetch(
        "/api/cms/pages-sections",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            pageId: PAGE_ID,
          }),
        }
      );

      if (!sectionsResponse.ok) {
        throw new Error("Failed to fetch sections data");
      }

      const sectionsData = await sectionsResponse.json();
      return sectionsData.data || [];
    } catch (err) {
      console.error("Error fetching sections:", err);
      throw err;
    }
  };

  // Fetch visa cards data for each section id, return flattened array
  const fetchVisaCardsData = async (sectionIds) => {
    const aggregated = [];
    for (const sectionId of sectionIds) {
      try {
        const response = await fetch(
          "/api/cms/sections-visa-cards",
          {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({
              pageSectionId: sectionId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch visa cards data");
        }

        const data = await response.json();
        const items = Array.isArray(data?.data) ? data.data : [];
        aggregated.push(...items);
      } catch (err) {
        console.error("Error fetching visa cards for section", sectionId, err);
      }
    }
    return aggregated;
  };

  // Get country flag component
  const getCountryFlag = (countryName) => {
    // Try exact match first
    if (countryFlagMap[countryName]) {
      return countryFlagMap[countryName];
    }

    // Try case-insensitive match
    const lowerCountryName = countryName.toLowerCase();
    const matchingKey = Object.keys(countryFlagMap).find(
      (key) => key.toLowerCase() === lowerCountryName
    );

    if (matchingKey) {
      return countryFlagMap[matchingKey];
    }

    // Default fallback
    return US;
  };

  // Transform API data to component format
  const transformVisaData = (apiData, sectionId) => {
    return apiData
      .filter((item) => item.pageSectionId === sectionId)
      .map((item) => ({
        Flag: getCountryFlag(item.visaCardJson.flagImage || "US"),
        country: item.visaCardTitle || "Unknown Country",
        type: item.visaCardJson.subTitle || "Tourist visa",
        price: `${item.currency} ${item.newPrice}` || "₹1,60,500",
        priceText: item.visaCardJson.priceContent || "per adult",
        subtitle:
          item.subtitle || item.description || "Get your Visa by 24hours",
        hasVisaIcon: item.visaCardJson.eVisa || false,
        countryId: item.visaCardCountryId,
      }));
  };

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch sections first
        const sections = await fetchSectionsData();
        console.log(sections);

        // Find relevant section IDs
        const popularVisaSection = sections.find(
          (section) =>
            section.title === "popular-visa" && section.contentType === "VISA"
        );

        const vacationSection = sections.find(
          (section) =>
            section.title === "Vacation Trending countries" &&
            section.contentType === "VISA"
        );

        if (!popularVisaSection && !vacationSection) {
          throw new Error("Required sections not found");
        }

        const sectionIds = [
          popularVisaSection?.pageSectionId,
          vacationSection?.pageSectionId,
        ].filter(Boolean);

        // Fetch visa cards data
        const visaCardsData = await fetchVisaCardsData(sectionIds);
        console.log(visaCardsData);

        // Transform and set data
        if (popularVisaSection) {
          const popularVisaData = transformVisaData(
            visaCardsData,
            popularVisaSection.pageSectionId
          );
          console.log(popularVisaData);
          setPopularVisas(popularVisaData);
        }

        if (vacationSection) {
          const vacationData = transformVisaData(
            visaCardsData,
            vacationSection.pageSectionId
          );
          setVaccinationCountries(vacationData);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);

        // Enhanced fallback data if API fails
        const fallbackPopularVisas = [
          {
            Flag: GB,
            country: "United Kingdom",
            type: "Tourist visa",
            price: "₹8,500",
            priceText: "per adult",
            subtitle: "Get your Visa by 24hours",
          },
          {
            Flag: US,
            country: "United States",
            type: "Green card visa",
            price: "₹1,60,500",
            priceText: "per adult",
            subtitle: "Get your Visa by 24hours",
          },
          {
            Flag: AE,
            country: "United Arab Emirates",
            type: "Tourist visa",
            price: "₹6,500",
            priceText: "per adult",
            subtitle: "Get your Visa by 24hours",
          },
          {
            Flag: FR,
            country: "France",
            type: "Schengen visa",
            price: "₹9,500",
            priceText: "per adult",
            subtitle: "Get your Visa by 48hours",
          },
          {
            Flag: AU,
            country: "Australia",
            type: "Tourist visa",
            price: "₹12,500",
            priceText: "per adult",
            subtitle: "Get your Visa by 72hours",
          },
          {
            Flag: SG,
            country: "Singapore",
            type: "Tourist visa",
            price: "₹5,500",
            priceText: "per adult",
            subtitle: "Get your Visa by 24hours",
          },
        ];

        const fallbackVacationCountries = [
          {
            Flag: LK,
            country: "Sri Lanka",
            subtitle: "Get your Visa by 24hours",
            price: "₹6,500",
            priceText: "per adult",
            hasVisaIcon: true,
          },
          {
            Flag: TR,
            country: "Turkey",
            subtitle: "Get your Visa by 48hours",
            price: "₹7,200",
            priceText: "per adult",
            hasVisaIcon: true,
          },
          {
            Flag: IN,
            country: "India",
            subtitle: "Get your Visa by 24hours",
            price: "₹4,500",
            priceText: "per adult",
            hasVisaIcon: true,
          },
          {
            Flag: ES,
            country: "Spain",
            subtitle: "Get your Visa by 72hours",
            price: "₹9,800",
            priceText: "per adult",
            hasVisaIcon: true,
          },
        ];

        setPopularVisas(fallbackPopularVisas);
        setVaccinationCountries(fallbackVacationCountries);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalSlides = popularVisas.length;
  const totalVaccinationSlides = vaccinationCountries.length;

  const nextSlide = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
  };

  const nextVaccinationSlide = () => {
    setCurrentVaccinationSlide((prev) =>
      prev + 1 >= totalVaccinationSlides ? 0 : prev + 1
    );
  };

  const prevVaccinationSlide = () => {
    setCurrentVaccinationSlide((prev) =>
      prev - 1 < 0 ? totalVaccinationSlides - 1 : prev - 1
    );
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - vaccinationContainerRef.current.offsetLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - vaccinationContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;

    if (walk > 100) {
      prevVaccinationSlide();
      setIsDragging(false);
    } else if (walk < -100) {
      nextVaccinationSlide();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Adjusted settings for Vacation slider based on data length
  const sliderSettingsVacation = (() => {
    const count = vaccinationCountries.length || 1;
    const base = { ...sliderSettings };
    base.slidesToShow = Math.min(4, count);
    base.infinite = count > base.slidesToShow;
    base.autoplay = count > 1;
    base.responsive = sliderSettings.responsive.map((r) => ({
      ...r,
      settings: {
        ...r.settings,
        slidesToShow: Math.min(r.settings.slidesToShow, count),
      },
    }));
    return base;
  })();

  const VisaIcon = () => <div className="visa-icon">E-VISA</div>;

  // Loading state only
  if (loading) {
    return (
      <div className="visa-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading visa information...</p>
        </div>
      </div>
    );
  }

  // If there's an error but we have fallback data, show the cards without error message
  // Only show error if no data at all
  if (error && popularVisas.length === 0 && vaccinationCountries.length === 0) {
    return (
      <div className="visa-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Unable to load visa information. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="visa-container">
      {/* Header */}
      <div className="visa-header">
        <h1 className="visa-title">Popular Visa</h1>
        <div className="visa-controls">
          <span
            className="view-all"
            style={{
              background: "#f2f0f0",
              padding: "10px 20px",
              borderRadius: "12px",
            }}
            onClick={() => router.push("/apply_visa")}
          >
            View All
          </span>
        </div>
      </div>

      {/* Popular Visa Cards */}
      {popularVisas.length > 0 && (
        <div className="visa-card-list">
          <Slider ref={sliderRef} {...sliderSettings} style={{ width: "90%" }}>
            {popularVisas.map((visa, index) => (
              <div key={index} style={{ padding: "0 12px" }}>
                <div
                  className="visa-card"
                  onClick={() => {
                    try {
                      if (typeof window !== "undefined") {
                        window.sessionStorage.setItem("applyVisaCountryId", String(visa.countryId || ""));
                      }
                    } catch (e) { }
                    router.push("/apply_visa");
                  }}
                >
                  <div className="card-header">
                    <visa.Flag className="flag" />
                    <div className="card-content">
                      <h3 className="visa-country">{visa.country}</h3>
                      <p className="visa-type">{visa.type}</p>
                    </div>
                  </div>
                  <div className="visa-price-row">
                    <div className="price-section">
                      <span className="visa-price">{visa.price}</span>
                      <span className="visa-price-text">{visa.priceText}</span>
                    </div>
                    <ChevronRight size={20} className="arrow-icon" />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Vaccination Countries */}
      {vaccinationCountries.length > 0 && (
        <>
          <h2 className="section-title">Vacation – Trending Countries</h2>
          <div className="visa-card-list">
            <Slider ref={sliderRef} {...sliderSettingsVacation} style={{ width: "90%" }}>
              {vaccinationCountries.map((country, index) => (
                <div key={index} style={{ padding: "0 12px" }}>
                  <div
                    className="vaccination-card"
                    onClick={() => {
                      try {
                        if (typeof window !== "undefined") {
                          window.sessionStorage.setItem("applyVisaCountryId", String(country.countryId || ""));
                        }
                      } catch (e) { }
                      router.push("/apply_visa");
                    }}
                  >
                    {country.hasVisaIcon && <VisaIcon />}
                    <div className="card-header">
                      <country.Flag className="flag" />
                      <div className="card-content">
                        <h3 className="visa-country">{country.country}</h3>
                        <p className="visa-type">{country.subtitle}</p>
                      </div>
                    </div>
                    <div className="visa-price-row">
                      <div className="price-section">
                        <span className="visa-price">{country.price}</span>
                        <span className="visa-price-text">{country.priceText}</span>
                      </div>
                      <ChevronRight size={20} className="arrow-icon" />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}

      {/* Visa Rules Image */}
      <div className="visa-rules">
        <h2 className="section-title">Visa Rules Announcement</h2>
        <div className="rules-card">
          <img
            src="/img/general/visa-card.png"
            alt="Visa Rules"
            className="rules-img"
          />
        </div>
      </div>
    </div>
  );
};

export default VisaCards;