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

  // Show loading page while data is being fetched
  if (loading) {
    return (
      <>
        <Header1 />
        <div style={containerStyle}>
          <div className="loading-page">
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
            <h2>Loading Holiday Details...</h2>
            <p>Please wait while we fetch your holiday information</p>
          </div>
        </div>
        <GoKiteFooter />
        <style jsx>{`
          .loading-page {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            text-align: center;
            padding: 2rem;
          }
          .loading-spinner {
            margin-bottom: 1.5rem;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .loading-page h2 {
            color: #333;
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
          }
          .loading-page p {
            color: #666;
            font-size: 1rem;
          }
        `}</style>
      </>
    );
  }

  // Show error page if there's an error
  if (error) {
    return (
      <>
        <Header1 />
        <div style={containerStyle}>
          <div className="error-page">
            <div className="error-icon">⚠️</div>
            <h2>Error Loading Holiday Details</h2>
            <p>{error}</p>
            <button
              className="retry-btn"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
        <GoKiteFooter />
        <style jsx>{`
          .error-page {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            text-align: center;
            padding: 2rem;
          }
          .error-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
          .error-page h2 {
            color: #e74c3c;
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
          }
          .error-page p {
            color: #666;
            margin-bottom: 1.5rem;
            font-size: 1rem;
          }
          .retry-btn {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s;
          }
          .retry-btn:hover {
            background-color: #2980b9;
          }
        `}</style>
      </>
    );
  }

  // Show no data page if holidaysDetails is empty or null
  if (!holidaysDetails || (Array.isArray(holidaysDetails) && holidaysDetails.length === 0)) {
    return (
      <>
        <Header1 />
        <div style={containerStyle}>
          <div className="no-data-page">
            <div className="no-data-icon">🏖️</div>
            <h2>Holiday destination does not exist</h2>
            <p>The holiday package you're looking for could not be found or may have been removed.</p>
            <button
              className="back-btn"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </div>
        <GoKiteFooter />
        <style jsx>{`
          .no-data-page {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            text-align: center;
            padding: 2rem;
          }
          .no-data-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
            opacity: 0.7;
          }
          .no-data-page h2 {
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: 1.8rem;
            font-weight: 600;
          }
          .no-data-page p {
            color: #7f8c8d;
            margin-bottom: 2rem;
            font-size: 1.1rem;
            max-width: 500px;
            line-height: 1.6;
          }
          .back-btn {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 0.875rem 2rem;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(52, 152, 219, 0.2);
          }
          .back-btn:hover {
            background-color: #2980b9;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
          }
        `}</style>
      </>
    );
  }

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
    <Suspense fallback={
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <h2 style={{ marginTop: '1rem', color: '#333' }}>Loading...</h2>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    }>
      <TripDetailsPageInner />
    </Suspense>
  );
}
