"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Clock, Users, Star } from "lucide-react";
import "./HotelProperties.css";

const HotelProperties = () => {
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    const updateResponsiveSettings = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
    };

    updateResponsiveSettings();
    window.addEventListener("resize", updateResponsiveSettings);
    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);

  const hotelsData = [
    {
      id: 1,
      tag: "Breakfast Included",
      img: "https://media.istockphoto.com/id/1331465591/photo/3d-render-of-a-luxury-hotel-swimming-pool.jpg?s=612x612&w=0&k=20&c=oK3vEzPg3mZrCXgairNgU5qM-vf0jMab9N7udzzVDk0=",
      title: "The Montcalm At Brewery London City",
      location: "Westminster Borough, London",
      ratings: "4.7",
      numberOfReviews: "3014",
      price: "72",
      delayAnimation: "100",
      city: "new_york",
      category: "hotel",
      duration: "3 Days 2 Night",
      persons: "2 Person",
    },
    {
      id: 2,
      tag: "",
      img: "https://media.istockphoto.com/id/1331465591/photo/3d-render-of-a-luxury-hotel-swimming-pool.jpg?s=612x612&w=0&k=20&c=oK3vEzPg3mZrCXgairNgU5qM-vf0jMab9N7udzzVDk0=",
      title: "Staycity Aparthotels Deptford Bridge Station",
      location: "Ciutat Vella, Barcelona",
      ratings: "4.8",
      numberOfReviews: "2345",
      price: "85",
      delayAnimation: "200",
      city: "london",
      category: "tour",
      duration: "4 Days 3 Night",
      persons: "2 Person",
    },
    {
      id: 3,
      tag: "best seller",
      img: "https://media.istockphoto.com/id/1331465591/photo/3d-render-of-a-luxury-hotel-swimming-pool.jpg?s=612x612&w=0&k=20&c=oK3vEzPg3mZrCXgairNgU5qM-vf0jMab9N7udzzVDk0=",
      title: "The Westin New York at Times Square West",
      location: "Manhattan, New York",
      ratings: "4.7",
      numberOfReviews: "3014",
      price: "68",
      delayAnimation: "300",
      city: "new_york",
      category: "activity",
      duration: "5 Days 4 Night",
      persons: "4 Person",
    },
    {
      id: 4,
      tag: "top rated",
      img: "https://media.istockphoto.com/id/1331465591/photo/3d-render-of-a-luxury-hotel-swimming-pool.jpg?s=612x612&w=0&k=20&c=oK3vEzPg3mZrCXgairNgU5qM-vf0jMab9N7udzzVDk0=",
      title: "DoubleTree by Hilton Hotel New York Times Square West",
      location: "Vaticano Prati, Rome",
      ratings: "4.5",
      numberOfReviews: "5633",
      price: "89",
      delayAnimation: "400",
      city: "new_york",
      category: "cruise",
      duration: "3 Days 2 Night",
      persons: "2 Person",
    },
    {
      id: 5,
      tag: "top rated",
      img: "https://media.istockphoto.com/id/1331465591/photo/3d-render-of-a-luxury-hotel-swimming-pool.jpg?s=612x612&w=0&k=20&c=oK3vEzPg3mZrCXgairNgU5qM-vf0jMab9N7udzzVDk0=",
      title: "DoubleTree by Hilton Hotel New York Times Square West",
      location: "Vaticano Prati, Rome",
      ratings: "4.5",
      numberOfReviews: "5633",
      price: "89",
      delayAnimation: "400",
      city: "new_york",
      category: "cruise",
      duration: "3 Days 2 Night",
      persons: "2 Person",
    },   {
      id: 6,
      tag: "top rated",
      img: "https://media.istockphoto.com/id/1331465591/photo/3d-render-of-a-luxury-hotel-swimming-pool.jpg?s=612x612&w=0&k=20&c=oK3vEzPg3mZrCXgairNgU5qM-vf0jMab9N7udzzVDk0=",
      title: "DoubleTree by Hilton Hotel New York Times Square West",
      location: "Vaticano Prati, Rome",
      ratings: "4.5",
      numberOfReviews: "5633",
      price: "89",
      delayAnimation: "400",
      city: "new_york",
      category: "cruise",
      duration: "3 Days 2 Night",
      persons: "2 Person",
    },
  ];

  const cardWidthValue = windowWidth < 640 ? "100%" : "calc(50% - 24px)";

  return (
    <div className="hotel-properties-container">
      {hotelsData.slice(0, 6).map((hotel) => (
        <div
          key={hotel.id}
          className="hotel-card"
          style={{
            width: cardWidthValue,
            minWidth: windowWidth < 640 ? "280px" : "400px",
            maxWidth: windowWidth < 640 ? "400px" : "600px",
            height: windowWidth < 640 ? "auto" : "500px",
          }}
        >
          {/* Image */}
          <div
            className="hotel-image-wrapper"
            style={{
              height:
                windowWidth < 640
                  ? "180px"
                  : windowWidth < 768
                  ? "300px"
                  : "400px",
            }}
          >
            <img src={hotel.img} alt="Hotel Room" className="hotel-image" />
            {hotel.tag && (
              <div className="hotel-featured-label">{hotel.tag}</div>
            )}
          </div>

          {/* Content */}
          <div
            className="hotel-content"
            style={{
              padding: windowWidth < 640 ? "16px" : "24px",
            }}
          >
            <h3
              className="hotel-name"
              style={{
                fontSize: windowWidth < 640 ? "18px" : "24px",
              }}
            >
              {hotel.title}
            </h3>

            {/* Location */}
            <div className="hotel-location">
              <MapPin
                size={windowWidth < 640 ? 14 : 20}
                className="location-icon"
              />
              <span className="location-text">{hotel.location}</span>
            </div>

            {/* Duration and Persons */}
            <div
              className={`duration-persons ${
                windowWidth < 640 ? "column-layout" : "row-layout"
              }`}
              style={{
                gap: windowWidth < 640 ? "8px" : "24px",
              }}
            >
              <div className="duration pt-3">
                <Clock
                  size={windowWidth < 640 ? 14 : 20}
                  className="duration-icon"
                />
                <span className="duration-text">
                  {windowWidth < 640
                    ? hotel.duration
                        .replace(" Night", "N")
                        .replace(" Days", "D")
                    : hotel.duration}
                </span>
              </div>
              <div className="persons">
                <Users
                  size={windowWidth < 640 ? 14 : 20}
                  className="persons-icon"
                />
                <span className="persons-text">{hotel.persons}</span>
              </div>
            </div>

            {/* Price and Rating */}
            <div
              className={`price-rating ${
                windowWidth < 480 ? "column-layout" : "row-layout"
              }`}
              style={{ gap: windowWidth < 480 ? "8px" : 0 }}
            >
              <div className="price">
                <span className="price-prefix">From</span>
                <span className="price-value">US${hotel.price}</span>
              </div>
              <div className="rating">
                <Star
                  size={windowWidth < 640 ? 12 : 18}
                  className="star-icon"
                />
                <span className="rating-value">{hotel.ratings}</span>
                <span className="reviews-text">
                  ({hotel.numberOfReviews}
                  {windowWidth < 480 ? "" : " Reviews"})
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelProperties;
