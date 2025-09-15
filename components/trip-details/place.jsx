"use client";
import React, { useRef } from "react";

const cardsData = [
  {
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=400&q=80",
    label: "Sunrise Point",
  },
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80",
    label: "Batok Mountain",
  },
  {
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?fit=crop&w=400&q=80",
    label: "Bromo Crater",
  },
  {
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=400&q=80",
    label: "Bromo Savanna",
  },
];

const PlacesCarousel = () => {
  const scrollRef = useRef();

  const scroll = (dir) => {
    const scroller = scrollRef.current;
    if (scroller) {
      const width = scroller.offsetWidth;
      scroller.scrollBy({ left: dir * width * 0.75, behavior: "smooth" });
    }
  };

  return (
    <div
      style={{ width: "100%", maxWidth: 1250, margin: "0 auto", padding: 24 }}
    >
      <h2
        style={{
          margin: "0 0 24px 0",
          fontSize: 28,
          fontWeight: 600,
          color: "#222",
          letterSpacing: 0.2,
        }}
      >
        Place You'll See
      </h2>
      <div
        style={{
          position: "relative",
          overflow: "visible",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Left Arrow */}
        <button
          aria-label="previous"
          onClick={() => scroll(-1)}
          style={{
            position: "absolute",
            left: -24,
            zIndex: 2,
            border: "none",
            background: "#222",
            color: "#fff",
            width: 36,
            height: 36,
            borderRadius: 18,
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px #0001",
          }}
        >
          &#8592;
        </button>
        {/* Card Container */}
        <div
          ref={scrollRef}
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gridTemplateColumns: `repeat(${cardsData.length}, minmax(160px, 1fr))`,
            gap: 24,
            overflowX: "auto",
            scrollBehavior: "smooth",
            paddingBottom: 8,
            width: "100%",
            scrollbarWidth: "none",
          }}
        >
          {cardsData.map((card, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 2px 12px #0001",
                minWidth: 160,
                maxWidth: 230,
                width: "100%",
                padding: 0,
                overflow: "hidden",
                transition: "transform 0.15s",
              }}
            >
              <img
                src={card.img}
                alt={card.label}
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  borderRadius: "16px 16px 0 0",
                  display: "block",
                }}
              />
              <div
                style={{
                  fontSize: 17,
                  color: "#232323",
                  fontWeight: 500,
                  textAlign: "left",
                  padding: "12px 10px 16px",
                  background: "#fff",
                  borderRadius: "0 0 16px 16px",
                  width: "100%",
                }}
              >
                {card.label}
              </div>
            </div>
          ))}
        </div>
        {/* Right Arrow */}
        <button
          aria-label="next"
          onClick={() => scroll(1)}
          style={{
            position: "absolute",
            right: 30,
            zIndex: 2,
            border: "none",
            background: "#222",
            color: "#fff",
            width: 36,
            height: 36,
            borderRadius: 18,
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px #0001",
          }}
        >
          &#8594;
        </button>
      </div>
      {/* Responsive Adjustments */}
      <style>
        {`
          @media (max-width: 800px) {
            div[ref] {
              grid-template-columns: repeat(${cardsData.length}, minmax(135px, 1fr));
              gap: 14px;
            }
            h2 {
              font-size: 20px !important;
            }
          }
          @media (max-width: 500px) {
            div[ref] {
              grid-template-columns: repeat(${cardsData.length}, minmax(125px, 1fr));
              gap: 8px;
            }
            div[ref] div {
              min-width: 125px !important;
              max-width: 170px !important;
            }
            h2 {
              font-size: 17px !important;
              margin-bottom: 14px !important;
            }
            button[aria-label="next"] {
              right: -18px !important;
            }
          }
          /* Hide scrollbars for aesthetics */
          div[ref]::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default PlacesCarousel;
