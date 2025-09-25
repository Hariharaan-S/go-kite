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



// Authorization and claims headers (similar to recommendation-dest-2.jsx)
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

export default function HoneymoonFreebiesCards2({ customStyle }) {
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

  // Loading and error states
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Loading holiday destinations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Error loading holiday destinations: {error}</p>
        <p>Showing default content...</p>
      </div>
    );
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
