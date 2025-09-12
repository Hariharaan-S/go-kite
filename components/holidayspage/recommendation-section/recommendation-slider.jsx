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
import React, { useState } from "react";

const VISIBLE_CARDS = 4;

export default function RecommendationDestinations() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const destinations = [
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
        {
            id: 2,
            image:
                "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop",
            title: "Hallstatt",
            rating: 4.9,
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
        {
            id: 3,
            image:
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
            title: "Faroe Island",
            rating: 4.5,
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
        {
            id: 4,
            image:
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
            title: "Innsbruck",
            rating: 4.8,
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
        {
            id: 5,
            image:
                "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=250&fit=crop",
            title: "Another Destination",
            rating: 4.6,
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
        {
            id: 6,
            image:
                "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=250&fit=crop",
            title: "Another Destination",
            rating: 4.6,
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
        {
            id: 7,
            image:
                "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=250&fit=crop",
            title: "Another Destination",
            rating: 4.6,
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
    ];

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

    const styles = `
        .recommendation-slider-section-1 {
            display: flex;
            flex-direction: column;
            position: relative;
            margin-top: 12rem;
        }

        @media screen and (max-width: 1500px) {
            .recommendation-slider-section-1 {
                top: 5rem;
            }
            .dest {
                    margin-left: 0 !important;
                }
        }

        @media screen and (max-width: 400px) {

            .recom-slid-section-1 {
                padding: 2.3rem;
            }
        
            .heading {
                position: absolute !important;
                color: #000 !important;
                margin-top: 2.5rem;
                margin-left: -57rem !important;
            }
            
            .button-group {
                position: absolute;
                left: 17rem;
                top: 2.3rem;
            }

            .view-all-btn {
                display: none !important;
            }

            .prev-btn, .next-btn {
                width: 40px !important;
                height: 40px !important;
            }

            .dest {
                margin-left: 2rem !important;
            }
            
        }
    `
    const router = useRouter();

    return (
        <>
            <style>{styles}</style>
            {/* Section header with navigation */}
            <div className="recommendation-slider-section-1">
                <div className="recom-slid-section-1"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: 'relative',
                        marginLeft: '2rem',
                        marginTop: '3rem',
                        columnGap: "67rem",
                        marginBottom: "2rem"
                    }}
                >
                    <h2 className="heading" style={{ color: '#FFFFFF', position: 'relative', marginLeft: '1.2rem' }}>Beaches</h2>
                    <div className="button-group"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                        }}
                    >
                        <button className="view-all-btn"
                            style={{
                                width: "100%",
                                height: "60%",
                                borderRadius: "20px",
                                border: "none",
                                backgroundColor: "#FFFFFF",
                                color: "black",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "7px",
                                fontSize: ".8rem"
                            }}
                        >
                            View All
                        </button>
                        <button className="prev-btn"
                            onClick={prevSlide}
                            style={{
                                width: "70px",
                                height: "40px",
                                borderRadius: "50%",
                                border: "none",
                                backgroundColor: "#000",
                                color: "white",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            className="next-btn"
                            onClick={nextSlide}
                            style={{
                                width: "70px",
                                height: "40px",
                                borderRadius: "50%",
                                border: "none",
                                backgroundColor: "#000",
                                color: "white",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Destinations Container */}
                <div className="dest"
                    style={{
                        display: "flex",
                        gap: "24px",
                        justifyContent: "center",
                        alignItems: "stretch",
                        paddingBottom: "10px",
                        maxWidth: "100%",
                        overflowX: "hidden",
                        marginLeft: "2rem"
                    }}
                >
                    {visibleDestinations.map((destination) => (
                        <div
                            key={destination.id}
                            style={{
                                width: "calc(25% - 16px)", // Changed from calc(33.33% - 16px)
                                minWidth: "250px", // Reduced from 320px
                                maxWidth: "300px", // Added max-width for consistency
                                backgroundColor: "white",
                                borderRadius: "16px",
                                boxShadow:
                                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.boxShadow =
                                    "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
                            }}
                            onClick={() => router.push('/details-page')}
                        >
                            {/* Image Section */}
                            <div style={{ position: "relative" }}>
                                <img
                                    src={destination.image}
                                    alt={destination.title}
                                    style={{
                                        width: "100%",
                                        height: "220px",
                                        objectFit: "cover",
                                        borderTopLeftRadius: "16px",
                                        borderTopRightRadius: "16px",
                                    }}
                                />
                                <button
                                    style={{
                                        position: "absolute",
                                        top: "16px",
                                        right: "16px",
                                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "40px",
                                        height: "40px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        transition: "background-color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            "rgba(255, 255, 255, 1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor =
                                            "rgba(255, 255, 255, 0.9)";
                                    }}
                                >
                                    <Heart size={20} style={{ color: "#64748b" }} />
                                </button>
                            </div>

                            {/* Content Section */}
                            <div
                                style={{
                                    padding: "20px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    flex: 1,
                                }}
                            >
                                {/* Title and Rating */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: "24px",
                                            fontWeight: "600",
                                            color: "#1e293b",
                                            margin: "0",
                                        }}
                                    >
                                        {destination.title}
                                    </h3>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                        }}
                                    >
                                        <span style={{ color: "#fbbf24", fontSize: "18px" }}>★</span>
                                        <span
                                            style={{
                                                fontSize: "18px",
                                                fontWeight: "600",
                                                color: "#1e293b",
                                            }}
                                        >
                                            {destination.rating}
                                        </span>
                                    </div>
                                </div>

                                {/* Duration */}
                                <p
                                    style={{
                                        color: "#64748b",
                                        fontSize: "14px",
                                        margin: "0 0 16px 0",
                                    }}
                                >
                                    {destination.duration}
                                </p>

                                {/* Icons Section */}
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(4, 1fr)",
                                        gap: "16px",
                                        marginBottom: "16px",
                                        paddingBottom: "16px",
                                        borderBottom: "1px solid #e2e8f0",
                                    }}
                                >
                                    <div style={{ textAlign: "center" }}>
                                        <Plane
                                            size={24}
                                            style={{
                                                color: "#64748b",
                                                marginBottom: "8px",
                                                display: "block",
                                                margin: "0 auto 8px auto",
                                            }}
                                        />
                                        <p
                                            style={{
                                                fontSize: "12px",
                                                color: "#64748b",
                                                margin: "0",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {destination.flights}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <Building2
                                            size={24}
                                            style={{
                                                color: "#64748b",
                                                marginBottom: "8px",
                                                display: "block",
                                                margin: "0 auto 8px auto",
                                            }}
                                        />
                                        <p
                                            style={{
                                                fontSize: "12px",
                                                color: "#64748b",
                                                margin: "0",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {destination.hotels}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <Car
                                            size={24}
                                            style={{
                                                color: "#64748b",
                                                marginBottom: "8px",
                                                display: "block",
                                                margin: "0 auto 8px auto",
                                            }}
                                        />
                                        <p
                                            style={{
                                                fontSize: "12px",
                                                color: "#64748b",
                                                margin: "0",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {destination.transfers}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <Users
                                            size={24}
                                            style={{
                                                color: "#64748b",
                                                marginBottom: "8px",
                                                display: "block",
                                                margin: "0 auto 8px auto",
                                            }}
                                        />
                                        <p
                                            style={{
                                                fontSize: "12px",
                                                color: "#64748b",
                                                margin: "0",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {destination.activities}
                                        </p>
                                    </div>
                                </div>

                                {/* Features List */}
                                <ul
                                    style={{
                                        listStyle: "none",
                                        padding: "0",
                                        margin: "0 0 20px 0",
                                    }}
                                >
                                    {destination.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                fontSize: "14px",
                                                color: "#64748b",
                                                marginBottom: "6px",
                                                paddingLeft: "12px",
                                                position: "relative",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    left: "0",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    width: "4px",
                                                    height: "4px",
                                                    backgroundColor: "#64748b",
                                                    borderRadius: "50%",
                                                }}
                                            ></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Pricing */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            color: "#94a3b8",
                                            textDecoration: "line-through",
                                        }}
                                    >
                                        {destination.originalPrice}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: "24px",
                                            fontWeight: "700",
                                            color: "#1e293b",
                                        }}
                                    >
                                        {destination.discountedPrice}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            color: "#64748b",
                                        }}
                                    >
                                        Per person
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
}
