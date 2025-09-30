"use client";
import GoKiteFooter from "@/components/footer/footer-gokite";
import Header1 from "@/components/header/IconNav";
import BromoMountainBanner from "@/components/trip-details/banner";
import AboutSection from "@/components/trip-details/about";
import PlacesCarousel from "@/components/trip-details/place";
import ItineraryAccordion from "@/components/trip-details/dropdown";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Use local proxy; server will attach Authorization from cookie
const getAuthHeaders = () => ({ "Content-Type": "application/json" });

async function fetchSectionsData(holidayId) {
  const sectionsResponse = await fetch(
    "/api/cms/holiday-itinerary-details",
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
