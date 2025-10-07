"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TravelVisaCards = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Popular");
  const [searchTerm, setSearchTerm] = useState("");
  const sliderRefRow1 = useRef(null);

  // Fetch countries data from API
  const fetchCountriesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/cms/countries-dd");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // API returns { success, data: { success, data: [...] } }
      if (result?.success && result?.data) {
        const upstream = result.data;
        const itemsArray = Array.isArray(upstream?.data) ? upstream.data : [];
        setCountriesData(itemsArray);
      } else {
        throw new Error(result.message || "Failed to fetch countries data");
      }
    } catch (err) {
      console.error("Error fetching countries data:", err);
      setError(err.message);
      // Fallback to default data if API fails
      setCountriesData([
        { id: "1", label: "United Arab Emirates" },
        { id: "2", label: "Singapore" },
        { id: "3", label: "Japan" },
        { id: "4", label: "Srilanka" },
        { id: "5", label: "Africa" },
        { id: "6", label: "Australia" },
        { id: "7", label: "Thailand" },
        { id: "8", label: "Russia" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Add responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch countries data on component mount
  useEffect(() => {
    fetchCountriesData();
  }, []);

  // Reset slider when category or search term changes
  useEffect(() => {
    if (sliderRefRow1.current) {
      sliderRefRow1.current.slickGoTo(0);
    }
    setCurrentSlide(0);
  }, [selectedCategory, searchTerm]);

  // Generate destinations from API data
  const generateDestinations = () => {
    if (!countriesData || countriesData.length === 0) {
      return [];
    }
    const formatPrice = (currency, amount) => {
      if (!amount) return "";
      const numeric = Number(amount);
      if (Number.isNaN(numeric)) return `${currency || ""} ${amount}`.trim();
      return `${currency || ""} ${numeric.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`.trim();
    };
    return countriesData.map((item, index) => {
      const title = item?.visaCardJson?.title || item?.visaCardTitle || "";
      const imageName = item?.visaCardJson?.image || "";
      const tagNames = item?.visaCardJson?.tagNames || [];
      const processingDays =
        item?.visaCardJson?.processing_days ||
        item?.visaCardJson?.processing_time ||
        "5";
      return {
        id: item?.visaCardId || index,
        country: title,
        price: formatPrice(item?.currency, item?.newPrice),
        additionalFee: "+ ₹8,500 (Fees + Tax)",
        visaType: `Visa in ${processingDays} Days`,
        processingDays: processingDays,
        image: imageName
          ? `/api/cms/file-download?image=${encodeURIComponent(imageName)}`
          : "",
        badge: null,
        visaDate: null,
        visaLogo: index % 3 === 0,
        tagNames: tagNames,
      };
    });
  };

  const allDestinations = generateDestinations();

  const categories = [
    "Popular",
    "Visa in a week",
    "Easy Visa",
    "Season",
    "Business Visa",
    "Visa Free",
  ];

  // Filter destinations based on selected category and search term
  const destinations = allDestinations.filter((destination) => {
    // First check if it matches the category
    if (!destination.tagNames || destination.tagNames.length === 0) {
      return false;
    }
    const matchesCategory = destination.tagNames.some(
      (tag) =>
        tag.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
    );

    if (!matchesCategory) {
      return false;
    }

    // Then check if it matches the search term (if any)
    if (searchTerm.trim() === "") {
      return true; // No search term, show all matching category
    }

    const searchLower = searchTerm.toLowerCase().trim();
    const countryLower = destination.country.toLowerCase();

    // Match if country contains the search term
    return countryLower.includes(searchLower);
  });

  const VISIBLE_CARDS_PER_ROW = isMobile ? 1 : 4;

  const nextSlide = () => {
    if (sliderRefRow1.current) sliderRefRow1.current.slickNext();
  };

  const prevSlide = () => {
    if (sliderRefRow1.current) sliderRefRow1.current.slickPrev();
  };

  const router = useRouter();

  // Always show as many as possible, no vertical stack
  const slidesToShow = isMobile ? 1 : Math.min(4, destinations.length);

  const sliderSettings = {
    dots: false,
    infinite: destinations.length > slidesToShow,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: destinations.length > slidesToShow, // optional: only autoplay if multiple
    autoplaySpeed: 3000,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, destinations.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, destinations.length),
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

  // Card Component to avoid duplication
  const CardComponent = ({ destination }) => (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        width: "100%",
        height: "100%",
        maxWidth: isMobile ? "100%" : "270px",
        maxHeight: isMobile ? "100%" : "400px",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
      }}
      onClick={() => router.push("/apply_visa")}
    >
      <div
        style={{
          position: "relative",
          height: "180px",
          backgroundImage: `url(${destination.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        {destination.badge && (
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              backgroundColor: "#ff6b35",
              color: "white",
              padding: "3px 8px",
              borderRadius: "12px",
              fontSize: "10px",
              fontWeight: "500",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              maxWidth: "220px",
              textAlign: "center",
            }}
          >
            {destination.badge}
          </div>
        )}
        {destination.visaDate && (
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              backgroundColor: "white",
              borderRadius: "6px",
              padding: "4px 8px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              width: "146px",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                color: "#333",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: "400",
                lineHeight: "1.1",
              }}
            >
              {destination.visaDate}
            </span>
            <span
              style={{
                fontSize: "9px",
                color: "#333",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: "400",
                lineHeight: "1.1",
              }}
            >
              + ₹13,500 (Fees + Tax)
            </span>
            {destination.visaLogo && (
              <img
                style={{ position: "absolute", top: "8px", right: "8px" }}
                src="/img/landingpage/visa-card-image.png"
                width={30}
                height={20}
                alt=""
                srcSet=""
              />
            )}
          </div>
        )}
      </div>
      <div style={{ padding: "12px 12px 0px 12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "8px",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#1a1a1a",
              margin: "0",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              lineHeight: "1.2",
              flex: 1,
            }}
          >
            {destination.country}
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "8px",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "#666666",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                lineHeight: "1",
              }}
            >
              Visa in
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "black",
                fontWeight: "bold",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                lineHeight: "1",
              }}
            >
              {destination.processingDays} Days
            </span>
          </div>
        </div>
        <div style={{ marginBottom: "4px" }}>
          <span
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#1a1a1a",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              lineHeight: "1.2",
            }}
          >
            {destination.price}
          </span>
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#666666",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            lineHeight: "1.2",
            marginBottom: "8px",
          }}
        >
          {destination.additionalFee}
        </div>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div
        style={{
          padding: isMobile ? "10px" : "20px",
          backgroundColor: "#f8f9fa",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{ fontSize: "18px", color: "#666", marginBottom: "10px" }}
          >
            Loading countries...
          </div>
          <div style={{ fontSize: "14px", color: "#999" }}>
            Please wait while we fetch the latest visa destinations
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && (!destinations || destinations.length === 0)) {
    return (
      <div
        style={{
          padding: isMobile ? "10px" : "20px",
          backgroundColor: "#f8f9fa",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{ fontSize: "18px", color: "#e74c3c", marginBottom: "10px" }}
          >
            Error loading countries
          </div>
          <div
            style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}
          >
            {error}
          </div>
          <button
            onClick={fetchCountriesData}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f59e0b",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: isMobile ? "10px" : "20px",
        backgroundColor: "#f8f9fa",
        minHeight: "auto",
        marginBottom: isMobile ? 8 : 12,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                fontSize: "16px",
                color: "#1a1a1a",
                backgroundColor: "transparent",
                width: "100%",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: "8px 16px",
                  backgroundColor:
                    selectedCategory === category ? "#f59e0b" : "transparent",
                  color: selectedCategory === category ? "white" : "#6b7280",
                  border: "none",
                  borderRadius: "20px",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontWeight: selectedCategory === category ? "500" : "400",
                  margin: isMobile ? "5px" : "0",
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
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
      {/* Always render the carousel if we have destinations */}
      {destinations && destinations.length > 0 ? (
        <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <Slider
            ref={sliderRefRow1}
            {...sliderSettings}
            style={{ width: "100%" }}
          >
            {destinations.map((destination) => (
              <div key={`row-${destination.id}`} style={{ padding: "0 4px" }}>
                <CardComponent destination={destination} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>✈️</div>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#1a1a1a",
              marginBottom: "8px",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            No Destinations Found
          </h3>
          <p
            style={{
              fontSize: "16px",
              color: "#666666",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            {searchTerm.trim() !== ""
              ? `No visa destinations found matching "${searchTerm}" in "${selectedCategory}" category.`
              : `No visa destinations available for "${selectedCategory}" category.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default TravelVisaCards;
