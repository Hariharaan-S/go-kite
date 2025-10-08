"use client";
import React from "react";

const styles = `
  .book-holiday {
    position: relative;
    background: #FFFFFF;
    width: 100%;
    max-width: 85vw;
    min-height: 180px;
    padding: 2rem 1rem;
    padding-bottom: 3rem;
    border-radius: 10px;
    margin-top: 1.25rem;
    margin-left: 3rem; 
    box-shadow: 0 2px 14px 0 rgba(40,80,120,.07);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    z-index: 10;
  }

  .book-holiday h2 {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    position: static;
    left: auto; top: auto;
  }

  .search-type-toggle {
    display: inline-flex;
    background: #E5E5E5;
    border-radius: 50px;
    padding: 4px;
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    width: fit-content;
  }

  .toggle-button {
    padding: 0.6rem 2rem;
    border: none;
    background: transparent;
    border-radius: 50px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.3s ease;
    color: #000000;
    white-space: nowrap;
  }

  .toggle-button:hover {
    opacity: 0.8;
  }

  .toggle-button.active {
    background: #000000;
    color: #FFFFFF;
  }

  .book-holiday .search-hotel {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 24rem;
    align-items: center;
  }

  .search-input-wrapper {
    position: relative;
    width: 100%;
    max-width: 50%;
  }

  .search-hotel .hotel-search-box {
    border: 0.5px solid #EAEBEE;
    border-radius: 10px;
    width: 100%;
    padding-top: 3rem;
    padding-bottom: 2rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    font-size: 1rem;
    height: 2.5rem;
    box-sizing: border-box;
  }

  .hotel-search-box::placeholder {
    color: #acb3be;
    font-size: 1rem;
    opacity: 0.8;
  }

  .autocomplete-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #FFFFFF;
    border: 1px solid #EAEBEE;
    border-radius: 10px;
    margin-top: 0.5rem;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    z-index: 1000;
  }

  .autocomplete-item {
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    border-bottom: 1px solid #f5f5f5;
    font-size: 0.95rem;
    transition: background 0.2s ease;
  }

  .autocomplete-item:hover {
    background: #f8f9fa;
  }

  .autocomplete-item:last-child {
    border-bottom: none;
  }

  .autocomplete-item .item-label {
    font-weight: 500;
    color: #071516;
  }

  .autocomplete-item .item-country {
    font-size: 0.85rem;
    color: #8b95a1;
    margin-left: 0.5rem;
  }

  .no-results {
    padding: 1rem 1.5rem;
    text-align: center;
    color: #8b95a1;
    font-size: 0.9rem;
  }

  .search-hotel .hotel-search-box-submit {
    width: 22%;
    min-width: 76px;
    background: #000000;
    color: #FFFFFF;
    border-radius: 10px;
    font-size: 1.08rem;
    padding: 1.4rem 0;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
  }

  .hotel-search-icon {
    margin-right: 4px;
    vertical-align: middle;
  }

  .search-info {
    color: #071516 !important;
    font-size: 1.01rem !important;
    opacity: 0.45;
    bottom: 5.5rem;
    left: 2.5rem;
    position: absolute;
  }

  /* Base styles */
.responsive-section {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
.responsive-card {
  flex: 1 1 22%;
  min-width: 220px;
  max-width: 300px;
  padding: 1rem;
  border-radius: 12px;
  background: #fff;
}

/* 1440px */
@media (max-width: 1440px) {
  .responsive-section {
    max-width: 1100px;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  .responsive-card {
    max-width: 260px;
  }
}

/* 1280px */
@media (max-width: 1280px) {
  .book-holiday {
      max-width: 90%;
      padding: 1.4rem 0.5rem;
      margin: 0;
      margin-top: 1rem;
      margin-left: 2rem;
    }
    .book-holiday .search-hotel {
      flex-direction: row;
      gap: 7rem;
    }

    .search-input-wrapper {
      max-width: 65%;
    }

    .search-info {
      top: 4.7rem;
      left: 2rem;
    }
}

/* 1024px */
@media (max-width: 1024px) {
  .book-holiday {
      max-width: 90%;
      padding: 1.4rem 0.5rem;
      margin: 0;
      margin-top: 1rem;
      margin-left: 2rem;
    }
    .book-holiday .search-hotel {
      flex-direction: row;
      gap: 7rem;
    }

    .search-input-wrapper {
      max-width: 60%;
    }

    .search-info {
      top: 9.7rem;
      left: 2rem;
    }
}

/* 768px */
@media (max-width: 768px) {
    .book-holiday {
      max-width: 99%;
      padding: 1.4rem 0.5rem;
      margin: 0;
      margin-top: 1rem;
    }

    .book-holiday .search-hotel {
      flex-direction: row;
      gap: 7rem;
    }

    .search-input-wrapper {
      max-width: 60%;
    }

    .search-info {
      top: 4.3rem;
      left: 2rem;
    }
} 

/* 480px */
@media (max-width: 480px) {
  .responsive-section {
    padding: 0.2rem;
    gap: 0.4rem;
  }
  .responsive-card {
    padding: 0.5rem;
    max-width: 99vw;
    font-size: 0.95rem;
  }
}

  @media (max-width: 600px) {
    .book-holiday {
      max-width: 99%;
      padding: 1.4rem 0.5rem;
      margin: 0;
      margin-top: 1rem;
    }
    .book-holiday .search-hotel {
      flex-direction: column;
      gap: 0.7rem;
    }

    .search-input-wrapper {
      max-width: 100%;
    }

    .search-hotel .hotel-search-box {
      padding-top: 3rem;
    }
    .search-info {
      display: block !important;
      font-size: 0.9rem !important;
      bottom: 9.8rem;
      left: 2rem;
    }
    .search-hotel .hotel-search-box-submit {
      width: 100%;
      margin: 0 auto;
    }

  }

  @media (max-width: 400px) {
    .book-holiday {
      min-height: 220px;
      min-width: 100px;
      margin: 0;
      margin-top: 1rem;
    }
    .book-holiday h2 {
      font-size: 1.05rem;
    }

    .search-input-wrapper {
      max-width: 100%;
    }

    .search-hotel .hotel-search-box {
      padding-top: 3rem;
    }

    .search-info {
      display: block !important;
      font-size: 0.9rem !important;
      bottom: 9.8rem;
      left: 2rem;
    }

    .toggle-button {
      padding: 0.5rem 1.5rem;
      font-size: 0.85rem;
    }
`;

const HotelSearch = ({
  searchType,
  setSearchType,
  searchQuery,
  setSearchQuery,
  suggestions,
  setSuggestions,
  showDropdown,
  setShowDropdown,
  selectedCountry,
  setSelectedCountry,
  isLoading,
  setIsLoading,
}) => {
  // Debounce timer
  const debounceTimer = React.useRef(null);

  // Helper to fetch suggestions immediately (used on focus)
  const fetchSuggestionsNow = React.useCallback(async (value) => {
    if (!value || !value.trim()) return;
    try {
      setIsLoading(true);
      setShowDropdown(true);

      const endpoint =
        searchType === "country"
          ? "/api/holiday-country-autocomplete"
          : "/api/holiday-city-autocomplete";

      const params = new URLSearchParams({ query: value });

      if (searchType === "city" && selectedCountry) {
        params.append("country", selectedCountry);
      }

      const response = await fetch(`${endpoint}?${params}`);
      const data = await response.json();

      if (data.success && data.data) {
        setSuggestions(data.data);
        setShowDropdown(true);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchType, selectedCountry, setIsLoading, setShowDropdown, setSuggestions]);

  // Handle search input change
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (value.trim().length < 1) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    // Show loading immediately
    setIsLoading(true);
    setShowDropdown(true);

    // Debounce API call with reduced delay
    debounceTimer.current = setTimeout(async () => {
      try {
        const endpoint =
          searchType === "country"
            ? "/api/holiday-country-autocomplete"
            : "/api/holiday-city-autocomplete";

        const params = new URLSearchParams({ query: value });

        // If searching cities and a country is selected, filter by country
        if (searchType === "city" && selectedCountry) {
          params.append("country", selectedCountry);
        }

        const response = await fetch(`${endpoint}?${params}`);
        const data = await response.json();

        if (data.success && data.data) {
          setSuggestions(data.data);
          setShowDropdown(true);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 150);
  };

  // Show suggestions consistently on focus after refresh
  const handleInputFocus = async () => {
    setShowDropdown(true);
    if (searchQuery && (!suggestions || suggestions.length === 0)) {
      await fetchSuggestionsNow(searchQuery);
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (item) => {
    setSearchQuery(item.label);
    setShowDropdown(false);

    // If a country is selected, store it to filter cities
    if (searchType === "country") {
      setSelectedCountry(item.value);
    }

    // If a city is selected, persist city id for listing page
    if (searchType === "city" && item?.id) {
      try { sessionStorage.setItem("holidayCityId", String(item.id)); } catch (_) {}
    }
  };

  // Handle search type toggle
  const handleToggleSearchType = (type) => {
    setSearchType(type);
    setSearchQuery("");
    setSuggestions([]);
    setShowDropdown(false);

    // Clear selected country if switching to country search
    if (type === "country") {
      setSelectedCountry(null);
    }
  };

  // Handle search submission
  const handleSearch = async () => {
    const query = (searchQuery || "").trim();
    if (!query) return;

    try {
      let countryId = null;

      if (searchType === "country") {
        // Prefer selectedCountry (from suggestion)
        if (selectedCountry) {
          countryId = selectedCountry;
        } else {
          // Fallback: lookup by typed query via proxy autocomplete
          const res = await fetch(`/api/holiday-country-autocomplete?query=${encodeURIComponent(query)}`);
          const data = await res.json();
          const match = Array.isArray(data?.data)
            ? data.data.find((item) =>
                String(item?.label || "").toLowerCase() === query.toLowerCase()
              ) || data.data[0]
            : null;
          if (match?.value) countryId = match.value;
        }
      }

      if (countryId) {
        try { sessionStorage.setItem("holidayCountryId", String(countryId)); } catch (_) {}
      }

      // Navigate to holiday list page
      if (typeof window !== "undefined") {
        window.location.href = "/holiday_list";
      }
    } catch (_) {
      // no-op on failure; still navigate to listing
      if (typeof window !== "undefined") {
        window.location.href = "/holiday_list";
      }
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="book-holiday">
        <h2>Book Holiday</h2>

        <div className="search-type-toggle">
          <button
            className={`toggle-button ${searchType === "city" ? "active" : ""}`}
            onClick={() => handleToggleSearchType("city")}
          >
            Search by City
          </button>
          <button
            className={`toggle-button ${
              searchType === "country" ? "active" : ""
            }`}
            onClick={() => handleToggleSearchType("country")}
          >
            Search by Country
          </button>
        </div>

        <div className="search-hotel">
          <p className="search-info">Where are you going for holiday?</p>

          <div
            className="search-input-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              className="hotel-search-box"
              type="search"
              placeholder={
                searchType === "city" ? "Select City" : "Select Country"
              }
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />

            {showDropdown && (
              <div className="autocomplete-dropdown">
                {isLoading ? (
                  <div className="no-results">Loading...</div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((item) => (
                    <div
                      key={item.id}
                      className="autocomplete-item"
                      onClick={() => handleSelectSuggestion(item)}
                    >
                      <span className="item-label">{item.label}</span>
                      {searchType === "city" && (
                        <span className="item-country">({item.country})</span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="no-results">No results found</div>
                )}
              </div>
            )}
          </div>

          <button
            className="hotel-search-box-submit"
            type="submit"
            onClick={handleSearch}
          >
            <span>
              <img
                className="hotel-search-icon"
                src="img/holidays/search.svg"
                width="20px"
                height="20px"
                alt="Search Icon"
              />
            </span>
            Search Plan
          </button>
        </div>
      </div>
    </>
  );
};

export default HotelSearch;
