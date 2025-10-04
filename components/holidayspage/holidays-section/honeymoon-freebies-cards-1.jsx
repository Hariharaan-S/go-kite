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
import "../styles/honeymoon-freebies-cards-1.css";

const FALLBACK_IMAGE = "/img/general/fallback-image.jpg";

// Read cookie helper; proxies read token server-side, but this keeps headers consistent
function getCookie(name) {
  if (typeof document === "undefined") return "";
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : "";
}

export default function HoneymoonFreebiesCards1() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

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
            pageId: 11, // Same page ID as recommendation-slider.jsx
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

  // Fetch holiday cards data for a specific section
  const fetchHolidayCardsData = async (sectionId) => {
    try {
      const response = await fetch(
        "/api/cms/sections-holiday-cards",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            pageSectionId: sectionId,
            limitValue: 4
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch holiday cards data");
      }

      const data = await response.json();
      return Array.isArray(data?.data) ? data.data : [];
    } catch (err) {
      console.error("Error fetching holiday cards:", err);
      throw err;
    }
  };

  // Transform holiday data
  const transformHolidayData = (apiData) => {
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
        priceContent: item.cardJson.priceContent || ""
      };
    });
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

        // Find the honeymoon section
        const honeymoonSection = sections.find(
          (section) =>
            section.title === "Honeymoon Freebies Special" &&
            section.contentType === "HOLIDAY"
        );

        console.log(honeymoonSection);

        if (!honeymoonSection) {
          throw new Error("Honeymoon section not found");
        }

        // Fetch holiday cards for this section
        const holidayCardsData = await fetchHolidayCardsData(
          honeymoonSection.pageSectionId
        );

        console.log(holidayCardsData);

        // Transform and set destinations
        const transformedDestinations = transformHolidayData(holidayCardsData);
        setDestinations(transformedDestinations);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const nextSlide = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
  };
  const router = useRouter();

  // Loading state only
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Loading honeymoon destinations...</p>
      </div>
    );
  }

  // If there's an error or no data, don't display anything
  if (error || destinations.length === 0) {
    return null;
  }



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

  return (
    <>
      {/* Section header with navigation */}
      <div className="recommendation-slider-section-2">
        <div className="rec-slide-subsec-2">
          <h2 className="heading1">
            Honeymoon Freebies Special
          </h2>
          <div className="button-group1">
            <button className="prev-btn1" onClick={prevSlide}>
              <ChevronLeft size={18} />
            </button>
            <button className="next-btn1" onClick={nextSlide}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Destinations Container */}
        <div className="dest1">
          <Slider ref={sliderRef} {...sliderSettings} className="slider-wrapper-2">
            {destinations.map((destination) => (
              <div
                className="card"
                key={destination.id}

                onClick={() => router.push("/trip-details")}
              >
                {/* Image Section */}
                <div className="image-wrapper-2">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="image-2"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    onLoad={(e) => {
                      // Image loaded successfully
                      console.log(`Image loaded for ${destination.title}`);
                    }}
                  />
                  <button className="wishlist-btn-2">
                    <Heart size={20} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="card-body-2">
                  {/* Title and Rating */}
                  <div className="card-header-2">
                    <h3 className="card-title-2">
                      {destination.title}
                    </h3>
                    <div className="rating-2">
                      <span className="rating-star-2">
                        ★
                      </span>
                      <span className="rating-value-2">
                        {destination.rating}
                      </span>
                    </div>
                  </div>

                  {/* Duration */}
                  <p className="duration-2">
                    {destination.duration}
                  </p>

                  {/* Icons Section */}
                  <div className="icons-row-2">
                    <div className="icon-item-2">
                      <Plane size={24} />
                      <p className="icon-label-2">
                        {destination.flights}
                      </p>
                    </div>
                    <div className="icon-item-2">
                      <Building2 size={24} />
                      <p className="icon-label-2">
                        {destination.hotels}
                      </p>
                    </div>
                    <div className="icon-item-2">
                      <Car size={24} />
                      <p className="icon-label-2">
                        {destination.transfers}
                      </p>
                    </div>
                    <div className="icon-item-2">
                      <Users size={24} />
                      <p className="icon-label-2">
                        {destination.activities}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="features-list-2">
                    {destination.features.map((feature, index) => (
                      <li key={index}>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Pricing */}
                  <div className="pricing-2">
                    <span className="original-price-2">
                      {destination.originalPrice}
                    </span>
                    <span className="discounted-price-2">
                      {destination.discountedPrice}
                    </span>
                    <span className="price-content-2">
                      {destination.priceContent}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
