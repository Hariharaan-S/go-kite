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
import "../styles/honeymoon-freebies-cards-2.css";

// Read cookie helper; token is actually read server-side by proxies
function getCookie(name) {
  if (typeof document === "undefined") return "";
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : "";
}

export default function HoneymoonFreebiesCards2({ customStyle }) {
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
            pageId: 11, // Same page ID as recommendation-dest-2.jsx
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

      return {
        id: item.sectionHolidayCardId,
        image: item.heroImage || "",
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

        // Find the third section (you may need to adjust this based on your API structure)
        const thirdSection = sections.find(
          (section) =>
            section.title === "Holiday-section-2" &&
            section.contentType === "HOLIDAY"
        );

        console.log(thirdSection);

        if (!thirdSection) {
          throw new Error("Holiday section 3 not found");
        }

        // Fetch holiday cards for this section
        const holidayCardsData = await fetchHolidayCardsData(
          thirdSection.pageSectionId
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
  const router = useRouter();

  // Loading state only
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Loading holiday destinations...</p>
      </div>
    );
  }

  // If there's an error or no data, don't display anything
  if (error || destinations.length === 0) {
    return null;
  }



  return (
    <>
      {/* Section header with navigation */}
      <div className="recommendation-slider-section-3">
        {/* Destinations Container */}
        <div className="dest2">
          <Slider ref={sliderRef} {...sliderSettings} className="slider-wrapper-3">
            {destinations.map((destination) => (
              <div
                className="card"
                key={destination.id}
                onClick={() => router.push("/trip-details")}
              >
                {/* Image Section */}
                <div className="image-wrapper-3">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="image-3"
                  />
                  <button className="wishlist-btn-3">
                    <Heart size={20} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="card-body-3">
                  {/* Title and Rating */}
                  <div className="card-header-3">
                    <h3 className="card-title-3">
                      {destination.title}
                    </h3>
                    <div className="rating-3">
                      <span className="rating-star-3">
                        ★
                      </span>
                      <span className="rating-value-3">
                        {destination.rating}
                      </span>
                    </div>
                  </div>

                  {/* Duration */}
                  <p className="duration-3">
                    {destination.duration}
                  </p>

                  {/* Icons Section */}
                  <div className="icons-row-3">
                    <div className="icon-item-3">
                      <Plane size={24} />
                      <p className="icon-label-3">
                        {destination.flights}
                      </p>
                    </div>
                    <div className="icon-item-3">
                      <Building2 size={24} />
                      <p className="icon-label-3">
                        {destination.hotels}
                      </p>
                    </div>
                    <div className="icon-item-3">
                      <Car size={24} />
                      <p className="icon-label-3">
                        {destination.transfers}
                      </p>
                    </div>
                    <div className="icon-item-3">
                      <Users size={24} />
                      <p className="icon-label-3">
                        {destination.activities}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="features-list-3">
                    {destination.features.map((feature, index) => (
                      <li key={index}>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Pricing */}
                  <div className="pricing-3">
                    <span className="original-price-3">
                      {destination.originalPrice}
                    </span>
                    <span className="discounted-price-3">
                      {destination.discountedPrice}
                    </span>
                    <span className="price-content-3">
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
