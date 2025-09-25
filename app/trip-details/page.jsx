"use client";
import GoKiteFooter from "@/components/footer/footer-gokite";
import Header1 from "@/components/header/IconNav";
import BromoMountainBanner from "@/components/trip-details/banner";
import AboutSection from "@/components/trip-details/about";
import PlacesCarousel from "@/components/trip-details/place";
import ItineraryAccordion from "@/components/trip-details/dropdown";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Authorization and claims headers (replicated from holidays-section-cards.jsx)
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

const getAuthHeaders = () => {
  return {
    "Content-Type": "application/json",
    claims: JSON.stringify(CLAIMS),
  };
};

async function fetchSectionsData(holidayId) {
  const sectionsResponse = await fetch(
    "https://gokite-sit-b2c.convergentechnologies.com/api/cms/api/v2/list/custom/data/holiday-itinerary-details",
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ holidayId: holidayId }),
    }
  );

  if (!sectionsResponse.ok) {
    throw new Error("Failed to fetch sections data");
  }

  const sectionsData = await sectionsResponse.json();
  console.log(sectionsData);
  return sectionsData.data || [];
}

// export const metadata = {
//   title: "GoKite - Travel & Tour ",
//   description: "GoKite - Travel & Tour ",
// };

const TripDetailsPageInner = () => {
  const [holidaysDetails, setHolidaysDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [holidayId, setHolidayId] = useState(null);
  const searchParams = useSearchParams();

  // Resolve holidayId: prefer query param, else sessionStorage
  useEffect(() => {
    const idFromQuery = searchParams.get("holidayId");
    if (idFromQuery) {
      setHolidayId(idFromQuery);
      return;
    }
    if (typeof window !== "undefined") {
      try {
        const stored = window.sessionStorage.getItem("holidayId");
        if (stored) {
          setHolidayId(stored);
        }
      } catch (e) {
        // ignore storage errors
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (!holidayId) return;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const sections = await fetchSectionsData(holidayId);
        console.log(sections);
        setHolidaysDetails(sections[0]);
      } catch (err) {
        console.error("Error fetching sections:", err);
        setError("Failed to load holiday details");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [holidayId]);

  const containerStyle = {
    maxWidth: 1600,
    margin: "0 auto",
    padding: "0 15px",
    boxSizing: "border-box",
  };

  const sectionSpacingStyle = {
    marginBottom: "20px", // Reduced spacing between sections
  };

  return (
    <>
      <Header1 />

      <div style={containerStyle}>
        <div>
          <BromoMountainBanner holidayId={holidayId} holidaysDetails={holidaysDetails} loading={loading} error={error} />
        </div>

        <div style={sectionSpacingStyle}>
          <AboutSection holidayId={holidayId} holidaysDetails={holidaysDetails} />
        </div>
        <div style={sectionSpacingStyle}>
          <PlacesCarousel holidayId={holidayId} holidaysDetails={holidaysDetails} />
        </div>
        <div style={sectionSpacingStyle}>
          <ItineraryAccordion holidayId={holidayId} holidaysDetails={holidaysDetails} />
        </div>
      </div>

      <GoKiteFooter />
    </>
  );
};

export default function TripDetailsPage() {
  return (
    <Suspense fallback={null}>
      <TripDetailsPageInner />
    </Suspense>
  );
}
