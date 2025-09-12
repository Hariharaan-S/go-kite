"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const TravelVisaCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Add responsive check
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial load
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const VISIBLE_CARDS_PER_ROW = isMobile ? 1 : 4;

  const destinations = [
    {
      id: 1,
      country: "United Arab Emirates",
      price: "₹6,500",
      additionalFee: "+ ₹8,500 (Fees +Tax)",
      visaType: "Visa in 5 Days",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=240&fit=crop",
      badge: null,
      visaDate: "Visa on 20 Mar, 11:03PM",
      visaLogo: true,
    },
    {
      id: 2,
      country: "Singapore",
      price: "₹6,500",
      additionalFee: "+ ₹8,500 (Fees +Tax)",
      visaType: "Visa in 5 Days",
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=240&fit=crop",
      badge: null,
      visaDate: null,
      visaLogo: false,
    },
    {
      id: 3,
      country: "Japan",
      price: "₹6,500",
      additionalFee: "+ ₹8,500 (Fees +Tax)",
      visaType: "Visa in 5 Days",
      image:
        "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=240&fit=crop",
      badge: "Hurry! pricing ends in 47 Days",
      visaDate: "Visa on 20 Mar, 11:03PM",
      visaLogo: true,
    },
    {
      id: 4,
      country: "Srilanka",
      price: "₹6,500",
      additionalFee: "+ ₹8,500 (Fees +Tax)",
      visaType: "Visa in 5 Days",
      image:
        "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=240&fit=crop",
      badge: null,
      visaDate: null,
      visaLogo: false,
    },
    {
      id: 5,
      country: "Africa",
      price: "₹6,500",
      additionalFee: "+ ₹8,500 (Fees +Tax)",
      visaType: "Visa in 5 Days",
      image:
        "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&h=240&fit=crop",
      badge: null,
      visaDate: "Visa on 20 Mar, 11:03PM",
      visaLogo: true,
    },
    {
      id: 6,
      country: "Australia",
      price: "₹6,500",
      additionalFee: "+ ₹8,500 (Fees +Tax)",
      visaType: "Visa in 5 Days",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop",
      badge: null,
      visaDate: null,
      visaLogo: false,
    },
    {
      id: 7,
      country: "Thailand",
      price: "₹6,500",
      additionalFee: "+ ₹8,500 (Fees +Tax)",
      visaType: "Visa in 5 Days",
      image:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=240&fit=crop",
      badge: null,
      visaDate: null,
      visaLogo: false,
    },
    {
      id: 8,
      country: "Russia",
      price: "₹6,500",
      additionalFee: "+ ₹8,500 (Fees +Tax)",
      visaType: "Visa in 5 Days",
      image:
        "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=400&h=240&fit=crop",
      badge: null,
      visaDate: null,
      visaLogo: false,
    },
  ];

  const categories = [
    "Popular",
    "Visa in a week",
    "Easy Visa",
    "Season",
    "Business Visa",
    "Visa Free",
  ];

  const totalSlides = destinations.length;

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev + VISIBLE_CARDS_PER_ROW >= totalSlides
        ? 0
        : prev + VISIBLE_CARDS_PER_ROW
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev - VISIBLE_CARDS_PER_ROW < 0
        ? totalSlides -
        (totalSlides % VISIBLE_CARDS_PER_ROW || VISIBLE_CARDS_PER_ROW)
        : prev - VISIBLE_CARDS_PER_ROW
    );
  };

  // Compute the visible cards window with wrapping for first row
  const getVisibleDestinations = () => {
    if (totalSlides <= VISIBLE_CARDS_PER_ROW) return destinations;
    if (currentSlide + VISIBLE_CARDS_PER_ROW <= totalSlides) {
      return destinations.slice(
        currentSlide,
        currentSlide + VISIBLE_CARDS_PER_ROW
      );
    } else {
      return [
        ...destinations.slice(currentSlide),
        ...destinations.slice(
          0,
          (currentSlide + VISIBLE_CARDS_PER_ROW) % totalSlides
        ),
      ];
    }
  };

  const visibleDestinations = getVisibleDestinations();
  const router = useRouter();

  return (
    <div
      style={{
        padding: isMobile ? "10px" : "20px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Search and Category Section */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          gap: isMobile ? "15px" : "0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: "20px",
            width: isMobile ? "100%" : "auto",
          }}
        >
          {/* Search Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: "50px",
              padding: "12px 20px",
              border: "2px solid #e5e7eb",
              minWidth: isMobile ? "100%" : "300px",
              width: isMobile ? "100%" : "auto",
              marginBottom: isMobile ? "10px" : "0",
            }}
          >
            <span
              style={{ color: "#f59e0b", marginRight: "8px", fontSize: "20px" }}
            >
              ✈️
            </span>
            <input
              type="text"
              placeholder="Search Country"
              style={{
                border: "none",
                outline: "none",
                fontSize: "16px",
                color: "#9ca3af",
                backgroundColor: "transparent",
                width: "100%",
              }}
            />
          </div>

          {/* Category Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: isMobile ? "center" : "flex-start",
              width: isMobile ? "100%" : "auto",
            }}
          >
            {categories.map((category, index) => (
              <button
                key={index}
                style={{
                  padding: "8px 16px",
                  backgroundColor: index === 0 ? "#f59e0b" : "transparent",
                  color: index === 0 ? "white" : "#6b7280",
                  border: "none",
                  borderRadius: "20px",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontWeight: index === 0 ? "500" : "400",
                  margin: isMobile ? "5px" : "0",
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: isMobile ? "10px" : "0",
            justifyContent: isMobile ? "center" : "flex-end",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <button
            onClick={prevSlide}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#374151",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={20} color="white" />
          </button>
          <button
            onClick={nextSlide}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#374151",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronRight size={20} color="white" />
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* First Row with Carousel */}
        {visibleDestinations.map((destination) => (
          <div
            key={destination.id}
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              position: "relative",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              width: "100%",
              maxWidth: isMobile ? "100%" : "auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
            onClick={() => router.push('/details-page')}
          >
            {/* Image Container */}
            <div
              style={{
                position: "relative",
                height: isMobile ? "250px" : "200px",
                backgroundImage: `url(${destination.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            >
              {/* Badge */}
              {destination.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    backgroundColor: "#f59e0b",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  {destination.badge}
                </div>
              )}

              {/* Visa Date and Logo */}
              {destination.visaDate && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {destination.visaDate}
                  </span>
                  {destination.visaLogo && (
                    <div
                      style={{
                        backgroundColor: "#1e40af",
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      VISA
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: "16px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  marginBottom: "8px",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0",
                    marginBottom: isMobile ? "10px" : "0",
                    flex: 1,
                  }}
                >
                  {destination.country}
                </h3>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginLeft: isMobile ? "0" : "8px",
                  }}
                >
                  {destination.visaType}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "4px",
                    }}
                  >
                    {destination.price}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    {destination.additionalFee}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Remaining Rows */}
        {destinations.slice(VISIBLE_CARDS_PER_ROW).map((destination) => (
          <div
            key={destination.id}
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              position: "relative",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              width: "100%",
              maxWidth: isMobile ? "100%" : "auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
            onClick={() => router.push('/details-page')}
          >
            {/* Identical card rendering as above */}
            <div
              style={{
                position: "relative",
                height: isMobile ? "250px" : "200px",
                backgroundImage: `url(${destination.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            >
              {/* Badge */}
              {destination.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    backgroundColor: "#f59e0b",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  {destination.badge}
                </div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: "16px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  marginBottom: "8px",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0",
                    marginBottom: isMobile ? "10px" : "0",
                    flex: 1,
                  }}
                >
                  {destination.country}
                </h3>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginLeft: isMobile ? "0" : "8px",
                  }}
                >
                  {destination.visaType}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "4px",
                    }}
                  >
                    {destination.price}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    {destination.additionalFee}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelVisaCards;
