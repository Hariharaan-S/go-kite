"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import "./styles/hotels.css";

const PopularActivities = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const activitiesData = [
    {
      id: 1,
      slideImg: [
        "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      ],
      img: "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      title: "The unique character as a symbol of taste of Turkey",
      location: "Istanbul, Turkey",
      country: "Turkey",
      countryFlag: "🇹🇷",
      ratings: "4.5",
      numberOfReviews: "3014",
      price: "1,500",
      duration: "7 days tour",
      tag: "4 DAYS / 5 NIGHT",
    },
    {
      id: 2,
      slideImg: [
        "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      ],
      img: "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      title: "Experience the elegance of Paris Activity and Visit's",
      location: "Paris, France",
      country: "France",
      countryFlag: "🇫🇷",
      ratings: "4.8",
      numberOfReviews: "2345",
      price: "1,900",
      duration: "10 days tour",
      tag: "4 DAYS / 5 NIGHT",
    },
    {
      id: 3,
      slideImg: [
        "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      ],
      img: "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      title: "Great Pyramid of",
      location: "Egypt",
      country: "Egypt",
      countryFlag: "🇪🇬",
      ratings: "4.7",
      numberOfReviews: "1852",
      price: "1,500",
      duration: "10 days tour",
      tag: "4 DAYS / 5 NIGHT",
    },
    {
      id: 4,
      slideImg: [
        "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      ],
      img: "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
      title: "Great Pyramid of",
      location: "Egypt",
      country: "Egypt",
      countryFlag: "🇪🇬",
      ratings: "4.7",
      numberOfReviews: "1852",
      price: "1,500",
      duration: "10 days tour",
      tag: "4 DAYS / 5 NIGHT",
    },
    // {
    //   id: 5,
    //   slideImg: [
    //     "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
    //   ],
    //   img: "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
    //   title: "Great Pyramid of",
    //   location: "Egypt",
    //   country: "Egypt",
    //   countryFlag: "🇪🇬",
    //   ratings: "4.7",
    //   numberOfReviews: "1852",
    //   price: "1,500",
    //   duration: "10 days tour",
    //   tag: "4 DAYS / 5 NIGHT",
    // },
    // {
    //   id: 6,
    //   slideImg: [
    //     "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
    //   ],
    //   img: "https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg",
    //   title: "Another Destination",
    //   location: "Some Country",
    //   country: "Country",
    //   countryFlag: "🌍",
    //   ratings: "4.6",
    //   numberOfReviews: "2000",
    //   price: "1,700",
    //   duration: "5 days tour",
    //   tag: "3 DAYS / 4 NIGHT",
    // },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    // Check initial screen size
    checkMobile();

    // Add event listener to check screen size on resize
    window.addEventListener("resize", checkMobile);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const VISIBLE_CARDS = isMobile ? 1 : 4;
  const totalSlides = Math.ceil(activitiesData.length / VISIBLE_CARDS);

  const nextSlide = () => {
    if (carouselRef.current) {
      const cardWidth =
        carouselRef.current.querySelector(".activity-card").offsetWidth;
      const scrollAmount = isMobile
        ? cardWidth + 20
        : (cardWidth + 20) * VISIBLE_CARDS;

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }

    setCurrentSlide((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      const cardWidth =
        carouselRef.current.querySelector(".activity-card").offsetWidth;
      const scrollAmount = isMobile
        ? cardWidth + 20
        : (cardWidth + 20) * VISIBLE_CARDS;

      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }

    setCurrentSlide((prev) => (prev - 1 < 0 ? totalSlides - 1 : prev - 1));
  };

  const getVisibleActivities = () => {
    if (totalSlides <= VISIBLE_CARDS) return activitiesData;

    const visibleCards = [];
    for (let i = 0; i < VISIBLE_CARDS; i++) {
      const index = (currentSlide + i) % totalSlides;
      visibleCards.push(activitiesData[index]);
    }
    return visibleCards;
  };

  const visibleActivities = getVisibleActivities();

  return (
    <div className="popular-activities-wrapper">
      <div className="popular-activities-header">
        <h2 className="popular-activities-title">Popular Activities</h2>
        <div className="popular-activities-actions">
          <span className="view-all">View All</span>
          <button onClick={prevSlide} className="nav-button">
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextSlide} className="nav-button">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div ref={carouselRef} className="activities-cards-container">
        {activitiesData.map((item) => (
          <div key={item.id} className="activity-card">
            <div className="image-container">
              <img src={item.img} alt={item.title} />
              <div className="country-flag">{item.countryFlag}</div>
              <div className="duration-tag">{item.tag}</div>
              <button className="heart-button">
                <Heart size={16} color="#666" />
              </button>
            </div>

            <div className="activity-content">
              <div>
                <h4 title={item.title}>{item.title}</h4>
                <p title={item.location}>{item.location}</p>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={12}
                      fill={
                        star <= Math.floor(Number(item.ratings))
                          ? "#ffc107"
                          : "#e9ecef"
                      }
                      color={
                        star <= Math.floor(Number(item.ratings))
                          ? "#ffc107"
                          : "#e9ecef"
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="price-duration">
                <div className="price">${item.price}</div>
                <div className="duration">{item.duration}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularActivities;
