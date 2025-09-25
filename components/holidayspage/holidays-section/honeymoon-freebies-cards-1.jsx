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



// Authorization and claims headers (similar to recommendation-slider.jsx)
const CLAIMS = {
  AUTHENTICATED: "true",
  org_id: "0631f265-d8de-4608-9622-6b4e148793c4",
  OTP_VERFICATION_REQD: "false",
  USER_ID: "0af402d1-98f0-18ae-8198-f493454d0001",
  refreshtoken: "false",
  client_ip: "14.99.174.62",
  USER_ID_LONG: "563",
  USER_NAME: "codetezteam@gmail.com",
  "authorized-domains":
    "b603f35d-9242-11f0-b493-fea20be86931, b603edb7-9242-11f0-b493-fea20be86931, b603e748-9242-11f0-b493-fea20be86931, b603d5d9-9242-11f0-b493-fea20be86931",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
};

export default function HoneymoonFreebiesCards1() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

  const getAuthHeaders = () => {
    return {
      "Content-Type": "application/json",
      claims: JSON.stringify(CLAIMS),
    };
  };

  // Fetch sections data
  const fetchSectionsData = async () => {
    try {
      const sectionsResponse = await fetch(
        "https://gokite-sit-b2c.convergentechnologies.com/api/cms/api/v2/list/custom/data/pages-sections",
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
        "https://gokite-sit-b2c.convergentechnologies.com/api/cms/api/v2/list/custom/data/sections-holiday-cards",
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
    // Fallback images from the original destinations array
    const fallbackImages = [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=250&fit=crop",
    ];

    return apiData.map((item, index) => {
      // Extract itinerary icons text safely
      const itineraryIcons = item.itineraryIcons || [];
      const flights = itineraryIcons[0]?.text || "2 Flights";
      const hotels = itineraryIcons[1]?.text || "1 Hotel";
      const transfers = itineraryIcons[2]?.text || "2 Transfers";
      const activities = itineraryIcons[3]?.text || "4 Activities";

      // Use fallback image based on index
      const imageUrl = fallbackImages[index % fallbackImages.length];

      return {
        id: item.sectionHolidayCardId,
        image: imageUrl,
        title: item.cardJson.packageName,
        rating: parseFloat(item.cardJson.packageRating || 4.5),
        duration: `${item.cardJson.days} Days ${item.cardJson.nights} Nights` || "3Days 4 Nights",
        flights: flights,
        hotels: hotels,
        transfers: transfers,
        activities: activities,
        features: item.cardJson.inclusions || [
          "Tour combo with return airport transfer",
          "City Tour",
          "Curious Corner",
        ],
        originalPrice: `${item.currency} ${parseFloat(item.oldPrice || 98952).toLocaleString()}`,
        discountedPrice: `${item.currency} ${parseFloat(item.newPrice || 88952).toLocaleString()}`,
        priceContent: item.cardJson.priceContent
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

        // Fallback to default data if API fails
        setDestinations([
          {
            id: 1,
            image:
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
            title: "Swiss Alps",
            rating: 4.7,
            duration: "3Days 4 Nights",
            flights: "2 Flights",
            hotels: "1 Hotel",
            transfers: "2 Transfers",
            activities: "4 Activities",
            features: [
              "Tour combo with return airport transfer",
              "City Tour",
              "Curious Corner",
            ],
            originalPrice: "₹98,952",
            discountedPrice: "₹88,952",
          },
        ]);
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

  // Loading and error states
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Loading honeymoon destinations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Error loading honeymoon destinations: {error}</p>
        <p>Showing default content...</p>
      </div>
    );
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
