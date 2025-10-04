"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { US, IN, SG, CH, ES, TR, LK, AU, BD } from "country-flag-icons/react/3x2";
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
};

const VisaCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentVaccinationSlide, setCurrentVaccinationSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [popularVisas, setPopularVisas] = useState([]);
  const [vaccinationCountries, setVaccinationCountries] = useState([]);
  const [visaRulesData, setVisaRulesData] = useState([]);
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
  const PAGE_ID = getPageIdWithFallback('visa-landing-page', '66'); // Fallback to default visa page ID
  console.log("PAGE_ID");
  console.log(PAGE_ID);


  // Fetch sections data
  const fetchSectionsData = async () => {
    try {
      console.log(" in fetchSectionsData PAGE_ID");
      console.log(PAGE_ID);
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

  // Fetch visa rules data using proxy endpoint
  const fetchVisaRulesData = async (sectionId) => {
    try {
      const response = await fetch(
        "/api/cms/sections-visa-cards-rules",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            pageSectionId: sectionId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch visa rules data");
      }

      const data = await response.json();
      return Array.isArray(data?.data) ? data.data : [];
    } catch (err) {
      console.error("Error fetching visa rules data for section", sectionId, err);
      return [];
    }
  };

  // Get country flag component or image URL
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

  // Generate flag image URL using the proxy endpoint
  const getFlagImageUrl = (imageName) => {
    if (!imageName) {
      console.log("No flag image name provided");
      return null;
    }
    const url = `/api/cms/file-download?image=${encodeURIComponent(imageName)}`;
    console.log(`Generated flag image URL: ${url}`);
    return url;
  };

  // Transform API data to component format
  const transformVisaData = (apiData, sectionId) => {
    return apiData
      .filter((item) => item.pageSectionId === sectionId)
      .map((item) => {
        console.log(`Processing visa card for ${item.visaCardTitle}:`, {
          flagImage: item.visaCardJson?.flagImage,
          countryId: item.visaCardCountryId
        });

        return {
          Flag: getCountryFlag(item.visaCardJson.flagImage || "US"),
          flagImageUrl: getFlagImageUrl(item.visaCardJson.flagImage),
          country: item.visaCardTitle || "Unknown Country",
          type: item.visaCardJson.subTitle || "Tourist visa",
          price: `${item.currency} ${item.newPrice}` || "₹1,60,500",
          priceText: item.visaCardJson.priceContent || "per adult",
          subtitle:
            item.subtitle || item.description || "Get your Visa by 24hours",
          hasVisaIcon: item.visaCardJson.eVisa || false,
          countryId: item.visaCardCountryId,
        };
      });
  };

  // Transform visa rules data to component format
  const transformVisaRulesData = (apiData) => {
    return apiData.map((item) => ({
      Flag: getCountryFlag(item.visaCardCountryId || "US"),
      flagImageUrl: getFlagImageUrl(item.visaCardJson.flagImage),
      country: item.visaCardTitle || "Unknown Country",
      type: item.visaCardJson.subTitle || "Visa Rules",
      description: item.visaCardJson.description || "",
      cardImage: item.visaCardJson.cardImage || "",
      flagImage: item.visaCardJson.flagImage || "",
      expiryDate: item.expiryDate || "",
      countryId: item.visaCardCountryId,
      uniqueId: item.sectionVisaCardUniqueId,
    }));
  };

  // Load data on component mount
  useEffect(() => {
    // Wait for page context to load before fetching data
    if (pageLoading || !PAGE_ID) return;

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
            section.title === "Popular Countries" && section.contentType === "VISA"
        );

        const vacationSection = sections.find(
          (section) =>
            section.title === "Vacation - Trending Countries" &&
            section.contentType === "VISA"
        );

        const visaRulesSection = sections.find(
          (section) =>
            section.title === "Visa Rules Announcement" && section.contentType === "VISA"
        );

        if (!popularVisaSection && !vacationSection && !visaRulesSection) {
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

        // Fetch visa rules data if section exists
        if (visaRulesSection) {
          const visaRulesData = await fetchVisaRulesData(visaRulesSection.pageSectionId);
          const transformedRulesData = transformVisaRulesData(visaRulesData);
          setVisaRulesData(transformedRulesData);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);

        // Fallback to default data if API fails
        setPopularVisas([
          {
            Flag: US,
            country: "US Visa",
            type: "Green card visa",
            price: "₹1,60,500",
            priceText: "per adult",
            subtitle: "Get your Visa by 24hours",
          },
          {
            Flag: IN,
            country: "India",
            type: "Tourist visa",
            price: "₹1,60,500",
            priceText: "per adult",
            subtitle: "Get your Visa by 24hours",
          },
        ]);

        setVaccinationCountries([
          {
            Flag: LK,
            country: "Sri Lanka",
            subtitle: "Get your Visa by 24hours",
            price: "₹6,500",
            priceText: "per adult",
            hasVisaIcon: true,
          },
        ]);

        // Fallback visa rules data
        setVisaRulesData([
          {
            title: "Important Visa Updates",
            description: "Please check the latest visa requirements before traveling.",
            content: "<p>Stay updated with the latest visa rules and regulations.</p>",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [pageLoading, PAGE_ID]);

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
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
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
    base.slidesToShow = Math.min(5, count);
    base.infinite = count > base.slidesToShow;
    base.autoplay = count > 1;
    base.arrows = false;
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

  if (loading) {
    return (
      <div className="visa-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading visa information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="visa-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Error loading data: {error}</p>
          <p>Showing default content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="visa-container">
      <style>{`
        .visa-card-list .slick-slide { padding: 0 4px; }
        .visa-card-list .slick-list { margin: 0 -4px; }
      `}</style>
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
      <div className="visa-card-list">
        <Slider ref={sliderRef} {...sliderSettings} style={{ width: "100%" }}>
          {popularVisas.map((visa, index) => (
            <div key={index}>
              <div
                className="visa-card"
                onClick={() => {
                  try {
                    if (typeof window !== "undefined") {
                      window.sessionStorage.setItem("applyVisaCountryId", String(visa.countryId || "AE"));
                    }
                  } catch (e) { }
                  router.push("/apply_visa");
                }}
              >
                <div className="visa-card-header">
                  {visa.flagImageUrl ? (
                    <img
                      src={visa.flagImageUrl}
                      alt={`${visa.country} flag`}
                      className="flag"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        // Fallback to component flag
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'block';
                      }}
                      onLoad={(e) => {
                        console.log(`Flag image loaded for ${visa.country}`);
                      }}
                    />
                  ) : null}
                  <visa.Flag
                    className="flag"
                    style={{ display: visa.flagImageUrl ? 'none' : 'block' }}
                  />
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

      {/* Vaccination Countries */}
      <h2 className="section-title" style={{ marginBottom: 12 }}>Vacation – Trending Countries</h2>
      <div className="visa-card-list" style={{ marginBottom: 16 }}>
        <Slider ref={sliderRef} {...sliderSettingsVacation} style={{ width: "100%" }}>
          {vaccinationCountries.map((country, index) => (
            <div key={index}>
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
                  {country.flagImageUrl ? (
                    <img
                      src={country.flagImageUrl}
                      alt={`${country.country} flag`}
                      className="flag"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        // Fallback to component flag
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'block';
                      }}
                      onLoad={(e) => {
                        console.log(`Flag image loaded for ${country.country}`);
                      }}
                    />
                  ) : null}
                  <country.Flag
                    className="flag"
                    style={{ display: country.flagImageUrl ? 'none' : 'block' }}
                  />
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

      {/* Visa Rules Cards */}
      <div className="visa-rules">
        <h2 className="section-title">Visa Rules Announcement</h2>
        <div className="visa-card-list">
          {visaRulesData.length > 0 ? (
            visaRulesData.map((rule, index) => (
              <div key={rule.uniqueId || index} className="visa-card visa-rule-card">
                {/* Top Section */}
                <div className="visa-rule-top-section">
                  <div className="visa-rule-header">
                    {rule.flagImageUrl ? (
                      <img
                        src={rule.flagImageUrl}
                        alt={`${rule.country} flag`}
                        className="visa-rule-flag"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          // Fallback to component flag
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextSibling.style.display = 'block';
                        }}
                        onLoad={(e) => {
                          console.log(`Flag image loaded for ${rule.country}`);
                        }}
                      />
                    ) : null}
                    <rule.Flag
                      className="visa-rule-flag"
                      style={{ display: rule.flagImageUrl ? 'none' : 'block' }}
                    />
                    <h3 className="visa-rule-country">{rule.country}</h3>
                  </div>
                  <div className="visa-rule-id-card">
                    <div className="id-card-illustration">
                      <img src="/img/visa/visa-rules-id.png" alt="ID Card" />
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="visa-rule-bottom-section">
                  <p className="visa-rule-announcement">{rule.description}</p>
                  <div className="visa-rule-footer">
                    <div className="visa-rule-go-kite">
                      <img width={50} height={50} src="/img/general/logo.svg" alt="Go Kite" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-rules-message">
              <p>No visa rules announcements available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisaCards;