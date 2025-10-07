"use client";
import {
  Heart,
  Plane,
  Building2,
  Car,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/holidays-section-cards.styles.css";
import { usePageContext } from "../../common/PageContext";
import GlassmorphMenu from "./menu/menu";

const FALLBACK_IMAGE = "/img/general/fallback-image.jpg";

const VISIBLE_CARDS = 4;

// Category mapping for menu items (packageCategoryId)
const CATEGORY_MAPPING = {
  'Beaches': 1,        // Default category
  'Adventure': 2,
  'World Wonder': 3,
  'Iconic City': 4,
  'CountrySide': 5,
  'Kids Wonderland': 6,
  'Skiing': 7,
  'Wildlife': 8
};

// Read cookie helper (not strictly required, proxies read cookie server-side)
function getCookie(name) {
  if (typeof document === "undefined") return "";
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : "";
}

export default function HolidaysSectionCards({ selectedCategory: selectedCategoryProp }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Beaches');
  const sliderRef = useRef(null);
  const router = useRouter();
  const { getPageIdWithFallback, loading: pageLoading } = usePageContext();

  const styles = `
  .recommendation-slider-section-1 {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .dest {
    display: flex;
    gap: 24px;
    margin-left: 6rem;
    align-items: stretch;
    padding-bottom: 10px;
    max-width: 100%;
    overflow-x: hidden;
  }

  .card {
    width: calc(25% - 16px);
    min-width: 250px;
    max-width: 300px;
  }

  /* 1440px */
  @media screen and (max-width: 1440px) {
    .recommendation-slider-section-1 {
      margin-top: 3rem;
    }
    .dest {
    margin-top: 3rem;
      gap: 18px;
    }
    .card {
      width: calc(25% - 12px);
      min-width: 220px;
      max-width: 320px;
      height: 100%;
    }
      .card-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .features-list {
      max-height: 100px;
}
  }

  /* 1280px */
  @media screen and (max-width: 1280px) {
    .recommendation-slider-section-1 {
      margin-top: -3rem;
    }
    .dest {
      gap: 14px;
      max-width: 90% !important;
      margin-left: 6rem;
    }
    .card {
      width: calc(33.33% - 10px);
      min-width: 200px;
    }
  }

  /* 1024px */
  @media screen and (max-width: 1024px) {
    .recommendation-slider-section-1 {
      margin-top: -2rem;
    }
    .dest {
      flex-wrap: wrap;
      gap: 8px;
      margin-left: 5rem;
    }
    .card {
      width: 90vw;
      min-width: 150px;
    }
  }

  /* 768px */
  @media screen and (max-width: 768px) {
    .recommendation-slider-section-1 {
      margin-top: -4rem;
    }
      .recom-slid-section-1 {
       column-gap: 25rem !important;
      }
    .dest {
      flex-wrap: wrap;
      gap: 8px;
      margin-left: 5rem;
    }
    .card {
      width: 90vw;
      min-width: 150px;
    }
  }

  /* 400px */
  @media screen and (max-width: 400px) {
    .recommendation-slider-section-1 {
      margin-top: -1rem;
    }
      .recom-slid-section-1 {
       column-gap: 15rem !important;
      }
    .dest {
      display: grid !important;
      grid-template-columns: 1fr !important;
      gap: 6px !important;
      margin-left: 2.5rem !important;
    }
    .card {
      width: 98vw !important;
      min-width: 120px;
    }
  }
`;

  const getAuthHeaders = () => {
    const token = getCookie("accesstoken");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  // Fetch sections data
  const fetchSectionsData = async () => {
    try {
      const sectionsResponse = await fetch(
        "/api/cms/pages-sections",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            pageId: getPageIdWithFallback('holidays', 11), // Use dynamic page ID with fallback
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

  // Fetch holiday categories data
  const fetchHolidayCategoriesData = async (packageCategoryId = 1) => {
    try {
      const response = await fetch(
        "/api/cms/holiday-categories",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            packageCategoryId: packageCategoryId
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch holiday categories data");
      }

      const payload = await response.json();
      // Unwrap proxy shapes:
      // 1) { data: [ ... ] }
      // 2) { data: { data: [ ... ] } }
      // 3) [ ... ]
      const rows = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload?.data?.data)
        ? payload.data.data
        : Array.isArray(payload)
        ? payload
        : [];
      return rows;
    } catch (err) {
      console.error("Error fetching holiday categories:", err);
      throw err;
    }
  };

  // Fetch recommendation cards data for a specific section
  const fetchRecommendationCardsData = async (sectionId) => {
    try {
      const response = await fetch(
        "/api/cms/sections-holiday-cards",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            pageSectionId: sectionId,
            // Fetch all records available from backend for this section
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendation cards data");
      }

      const data = await response.json();
      return Array.isArray(data?.data) ? data.data : [];
    } catch (err) {
      console.error("Error fetching recommendation cards:", err);
      throw err;
    }
  };

  // Transform holiday categories data
  const transformHolidayCategoriesData = (apiData) => {
    return apiData.map((item) => {
      // Extract itinerary icons text safely
      const itineraryIcons = item.cardJson?.itineraryIcons || [];
      const flights = itineraryIcons[0]?.text || "";
      const hotels = itineraryIcons[1]?.text || "";
      const transfers = itineraryIcons[2]?.text || "";
      const activities = itineraryIcons[3]?.text || "";

      // Generate image URL using the proxy endpoint
      const getImageUrl = (imageName) => {
        if (!imageName) return FALLBACK_IMAGE;
        return `/api/cms/file-download?image=${encodeURIComponent(imageName)}`;
      };

      return {
        id: item.holidayId,
        image: getImageUrl(item?.cardJson?.heroImage),
        title: item.cardJson?.packageName || item.title || "",
        rating: parseFloat(item.cardJson?.packageRating || item.packageRating || 0),
        duration: `${item.cardJson?.days || item.noOfDays || 0} Days ${item.cardJson?.nights || item.noOfNights || 0} Nights`,
        flights: flights,
        hotels: hotels,
        transfers: transfers,
        activities: activities,
        features: item.cardJson?.inclusions || [],
        originalPrice: `${item.currency} ${parseFloat(item.oldPrice || 0).toLocaleString()}`,
        discountedPrice: `${item.currency} ${parseFloat(item.newPrice || 0).toLocaleString()}`,
        priceContent: item.cardJson?.priceContent || "",
        holidayId: item.holidayId
      };
    });
  };

  // Transform recommendation data (keeping for backward compatibility)
  const transformRecommendationData = (apiData) => {
    return apiData.map((item) => {
      // Extract itinerary icons text safely
      const itineraryIcons = item.itineraryIcons || [];
      const flights = itineraryIcons[0]?.text || "";
      const hotels = itineraryIcons[1]?.text || "";
      const transfers = itineraryIcons[2]?.text || "";
      const activities = itineraryIcons[3]?.text || "";

      // Generate image URL using the proxy endpoint
      const getImageUrl = (imageName) => {
        if (!imageName) return FALLBACK_IMAGE;
        return `/api/cms/file-download?image=${encodeURIComponent(imageName)}`;
      };

      return {
        id: item.sectionHolidayCardId,
        image: getImageUrl(item?.cardJson?.heroImage),
        title: item.cardJson.packageName || "",
        rating: parseFloat(item.cardJson.packageRating || 0),
        duration: `${item.cardJson.days} Days ${item.cardJson.nights} Nights` || "",
        flights: flights,
        hotels: hotels,
        transfers: transfers,
        activities: activities,
        features: item.cardJson.inclusions || [],
        originalPrice: `${item.currency} ${parseFloat(item.oldPrice || 0).toLocaleString()}`,
        discountedPrice: `${item.currency} ${parseFloat(item.newPrice || 0).toLocaleString()}`,
        priceContent: item.cardJson.priceContent || "",
        holidayId: item.holidayId
      };
    });
  };

  // Handle category selection
  const handleCategorySelect = async (categoryName) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedCategory(categoryName);

      const packageCategoryId = CATEGORY_MAPPING[categoryName] || 1; // Default to 1 if category not found
      console.log(`Fetching data for ${categoryName} with packageCategoryId: ${packageCategoryId}`);

      // Fetch holiday categories data
      const categoriesData = await fetchHolidayCategoriesData(packageCategoryId);
      console.log(`Fetched data for ${categoryName}:`, categoriesData);

      // Transform and set destinations
      const transformedDestinations = transformHolidayCategoriesData(categoriesData);
      console.log(`Transformed destinations for ${categoryName}:`, transformedDestinations);
      setDestinations(transformedDestinations);
    } catch (err) {
      console.error(`Error loading data for ${categoryName}:`, err);
      setError(err.message);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  // Load data when page context is ready or when selectedCategoryProp changes
  useEffect(() => {
    if (pageLoading) return;
    const categoryToLoad = selectedCategoryProp || 'Beaches';
    handleCategorySelect(categoryToLoad);
  }, [pageLoading, selectedCategoryProp, getPageIdWithFallback]);

  const totalSlides = destinations.length;

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev + VISIBLE_CARDS >= totalSlides ? 0 : prev + VISIBLE_CARDS
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev - VISIBLE_CARDS < 0
        ? totalSlides - (totalSlides % VISIBLE_CARDS || VISIBLE_CARDS)
        : prev - VISIBLE_CARDS
    );
  };

  // Compute the visible cards window with wrapping
  const getVisibleDestinations = () => {
    if (totalSlides <= VISIBLE_CARDS) return destinations;
    if (currentSlide + VISIBLE_CARDS <= totalSlides) {
      return destinations.slice(currentSlide, currentSlide + VISIBLE_CARDS);
    } else {
      return [
        ...destinations.slice(currentSlide),
        ...destinations.slice(0, (currentSlide + VISIBLE_CARDS) % totalSlides),
      ];
    }
  };

  const visibleDestinations = getVisibleDestinations();

  const computedSlidesToShow = Math.max(1, Math.min(4, destinations.length || 1));
  const sliderSettings = {
    dots: false,
    infinite: destinations.length > computedSlidesToShow,
    speed: 500,
    slidesToShow: computedSlidesToShow,
    slidesToScroll: 1,
    autoplay: destinations.length > computedSlidesToShow,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.max(1, Math.min(3, destinations.length || 1)),
          slidesToScroll: 1,
          infinite: destinations.length > 3,
          autoplay: destinations.length > 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.max(1, Math.min(2, destinations.length || 1)),
          slidesToScroll: 1,
          infinite: destinations.length > 2,
          autoplay: destinations.length > 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: destinations.length > 1,
          autoplay: destinations.length > 1,
        },
      },
    ],
  };

  return (
    <>
      <style>{styles}</style>
      {/* Section header */}
      <div className="recommendation-slider-section-1">
        <div
          className="recom-slid-section-1"
        >
          <h2
            className="heading"
          >
            {selectedCategory}
          </h2>
          <div
            className="button-group"
          >
            <button
              className="view-all-btn"
              onClick={() => router.push("/holiday_list")}
            >
              View All
            </button>

          </div>
        </div>

        {/* Destinations Container */}
        <div
          className="dest"
        >
          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem", width: "100%" }}>
              <p>Loading holiday destinations...</p>
            </div>
          ) : destinations.length > 0 ? (
            destinations.length <= 1 ? (
              destinations.map((destination) => (
                <div
                  className="card"
                  key={destination.id}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      try {
                        window.sessionStorage.setItem("holidayId", String(destination.holidayId));
                      } catch (e) {}
                    }
                    const slug = encodeURIComponent(
                      String(destination.title || "trip").toLowerCase().replace(/\s+/g, "-")
                    );
                    router.push(`/trip-details/${slug}`);
                  }}
                >
                  {/* Image Section */}
                  <div className="image-wrapper">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="card-img"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                    <button className="wishlist-btn">
                      <Heart size={20} style={{ color: "#64748b" }} />
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="card-header">
                      <h3 className="card-title">{destination.title}</h3>
                      <div className="rating">
                        <span className="rating-star">★</span>
                        <span className="rating-value">{destination.rating}</span>
                      </div>
                    </div>
                    <p className="duration">{destination.duration}</p>
                    <div className="icons-row">
                      <div className="icon-item">
                        <Plane size={24} style={{ color: "#64748b", marginBottom: "8px" }} />
                        <p className="icon-label">{destination.flights}</p>
                      </div>
                      <div className="icon-item">
                        <Building2 size={24} style={{ color: "#64748b", marginBottom: "8px" }} />
                        <p className="icon-label">{destination.hotels}</p>
                      </div>
                      <div className="icon-item">
                        <Car size={24} style={{ color: "#64748b", marginBottom: "8px" }} />
                        <p className="icon-label">{destination.transfers}</p>
                      </div>
                      <div className="icon-item">
                        <Users size={24} style={{ color: "#64748b", marginBottom: "8px" }} />
                        <p className="icon-label">{destination.activities}</p>
                      </div>
                    </div>
                    <ul className="features-list">
                      {destination.features.map((feature, index) => (
                        <li key={index}>
                          <span className="bullet"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pricing">
                      <span className="original-price">{destination.originalPrice}</span>
                      <span className="discounted-price">{destination.discountedPrice}</span>
                      <span className="price-content">{destination.priceContent}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Slider ref={sliderRef} {...sliderSettings} className="slider-wrapper">
              {destinations.map((destination) => (
                <div
                  className="card"
                  key={destination.id}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      try {
                        window.sessionStorage.setItem("holidayId", String(destination.holidayId));
                      } catch (e) {
                        // ignore storage errors
                      }
                    }
                    const slug = encodeURIComponent(
                      String(destination.title || "trip").toLowerCase().replace(/\s+/g, "-")
                    );
                    router.push(`/trip-details/${slug}`);
                  }}
                >
                  {/* Image Section */}
                  <div className="image-wrapper">
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="card-img"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
                      onLoad={(e) => {
                        // Image loaded successfully
                        console.log(`Image loaded for ${destination.title}`);
                      }}
                    />
                    <button
                      className="wishlist-btn"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                      }}
                    >
                      <Heart size={20} style={{ color: "#64748b" }} />
                    </button>
                  </div>

                  {/* Content Section */}
                  <div className="card-body">
                    {/* Title and Rating */}
                    <div className="card-header">
                      <h3 className="card-title">{destination.title}</h3>
                      <div className="rating">
                        <span className="rating-star">★</span>
                        <span className="rating-value">{destination.rating}</span>
                      </div>
                    </div>

                    {/* Duration */}
                    <p className="duration">{destination.duration}</p>

                    {/* Icons Section */}
                    <div className="icons-row">
                      <div className="icon-item">
                        <Plane size={24} style={{ color: "#64748b", marginBottom: "8px" }} />
                        <p className="icon-label">{destination.flights}</p>
                      </div>
                      <div className="icon-item">
                        <Building2 size={24} style={{ color: "#64748b", marginBottom: "8px" }} />
                        <p className="icon-label">{destination.hotels}</p>
                      </div>
                      <div className="icon-item">
                        <Car size={24} style={{ color: "#64748b", marginBottom: "8px" }} />
                        <p className="icon-label">{destination.transfers}</p>
                      </div>
                      <div className="icon-item">
                        <Users size={24} style={{ color: "#64748b", marginBottom: "8px" }} />
                        <p className="icon-label">{destination.activities}</p>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="features-list">
                      {destination.features.map((feature, index) => (
                        <li key={index}>
                          <span className="bullet"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Pricing */}
                    <div className="pricing">
                      <span className="original-price">{destination.originalPrice}</span>
                      <span className="discounted-price">{destination.discountedPrice}</span>
                      <span className="price-content">{destination.priceContent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            )
          ) : (
            <div style={{ 
              textAlign: "center", 
              padding: "2rem", 
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "200px"
            }}>
              {error ? (
                <div>
                  <p style={{ color: "#ef4444", marginBottom: "1rem" }}>
                    Unable to load holiday destinations
                  </p>
                  <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                    {error}
                  </p>
                </div>
              ) : (
                <div>
                  <p style={{ color: "#64748b", marginBottom: "1rem" }}>
                    No holiday destinations available at the moment
                  </p>
                  <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                    Please check back later for exciting holiday packages
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div >
    </>
  );
}
