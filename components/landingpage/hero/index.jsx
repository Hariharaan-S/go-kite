"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addCurrentTab } from "../../../features/hero/findPlaceSlice";

// Icon button using images
const IconButton = ({ imgSrc, label, isActive = false }) => (
  <div className="text-center cursor-pointer">
    <div
      className={`mx-auto mb-2 d-flex align-items-center justify-center rounded-circle transition-all shadow-sm ${
        isActive
          ? "bg-orange-500 border-orange-500"
          : "bg-white border-white hover:bg-gray-50"
      }`}
      style={{
        width: "64px",
        height: "64px",
        border: "2px solid",
        borderColor: isActive ? "#f97316" : "#e5e7eb",
      }}
    >
      <img
        src={imgSrc}
        alt={label}
        className="object-contain"
        style={{ width: "45px", height: "45px" }}
      />
    </div>
    <span className="text-12 fw-500 text-white d-block">{label}</span>
  </div>
);

// Icon Row Component
const IconRow = () => {
  const [activeIcon, setActiveIcon] = useState("Flight");

  const iconData = [
    {
      id: "Flight",
      label: "Flight",
      imgSrc: "/img/landingpage/icons/flight.png",
    },
    {
      id: "Activities",
      label: "Activities",
      imgSrc: "/img/landingpage/icons/activity.png",
    },
    {
      id: "Holidays",
      label: "Holidays",
      imgSrc: "/img/landingpage/icons/holiday.png",
    },
    { id: "Hotel", label: "Hotel", imgSrc: "/img/landingpage/icons/hotel.png" },
    { id: "Visa", label: "Visa", imgSrc: "/img/landingpage/icons/visa.png" },
    { id: "More", label: "More", imgSrc: "/img/landingpage/icons/more.png" },
  ];

  return (
    <div
      className="d-flex justify-center align-items-center mt-40 mb-20"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "24px",
        flexWrap: "nowrap",
      }}
      data-aos="fade-up"
      data-aos-delay="150"
    >
      {iconData.map((icon) => (
        <div
          key={icon.id}
          onClick={() => setActiveIcon(icon.id)}
          style={{ flex: "none" }}
        >
          <IconButton
            imgSrc={icon.imgSrc}
            label={icon.label}
            isActive={activeIcon === icon.id}
          />
        </div>
      ))}
    </div>
  );
};

// Counter component for GuestSearch
const Counter = ({ name, defaultValue, onCounterChange }) => {
  const [count, setCount] = useState(defaultValue);
  const incrementCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCounterChange(name, newCount);
  };
  const decrementCount = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      onCounterChange(name, newCount);
    }
  };

  return (
    <>
      <div className="row y-gap-10 justify-between items-center">
        <div className="col-auto">
          <div className="text-15 lh-12 fw-500">{name}</div>
          {name === "Children" && (
            <div className="text-14 lh-12 text-light-1 mt-5">Ages 0 - 17</div>
          )}
        </div>
        <div className="col-auto">
          <div className="d-flex items-center js-counter">
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down"
              onClick={decrementCount}
            >
              <i className="icon-minus text-12" />
            </button>
            <div className="flex-center size-20 ml-15 mr-15">
              <div className="text-15 js-count">{count}</div>
            </div>
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-up"
              onClick={incrementCount}
            >
              <i className="icon-plus text-12" />
            </button>
          </div>
        </div>
      </div>
      <div className="border-top-light mt-24 mb-24" />
    </>
  );
};

// Location Search Component
const LocationSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const locationSearchContent = [
    { id: 1, name: "London", address: "Greater London, United Kingdom" },
    { id: 2, name: "New York", address: "New York State, United States" },
    { id: 3, name: "Paris", address: "France" },
    { id: 4, name: "Madrid", address: "Spain" },
    { id: 5, name: "Santorini", address: "Greece" },
  ];

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);
  };

  return (
    <div className="searchMenu-loc px-30 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="true"
        data-bs-offset="0,22"
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">Location</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <input
            autoComplete="off"
            type="search"
            placeholder="Where are you going?"
            className="js-search js-dd-focus"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="shadow-2 dropdown-menu min-width-400">
        <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
          <ul className="y-gap-5 js-results">
            {locationSearchContent.map((item) => (
              <li
                className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                  selectedItem && selectedItem.id === item.id ? "active" : ""
                }`}
                key={item.id}
                role="button"
                onClick={() => handleOptionClick(item)}
              >
                <div className="d-flex">
                  <div className="icon-location-2 text-light-1 text-20 pt-4" />
                  <div className="ml-10">
                    <div className="text-15 lh-12 fw-500 js-search-option-target">
                      {item.name}
                    </div>
                    <div className="text-14 lh-12 text-light-1 mt-5">
                      {item.address}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Guest Search Component
const GuestSearch = () => {
  const counters = [
    { name: "Adults", defaultValue: 2 },
    { name: "Children", defaultValue: 1 },
    { name: "Rooms", defaultValue: 1 },
  ];

  const [guestCounts, setGuestCounts] = useState({
    Adults: 2,
    Children: 1,
    Rooms: 1,
  });

  const handleCounterChange = (name, value) => {
    setGuestCounts((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="searchMenu-guests px-30 lg:py-20 lg:px-0 js-form-dd js-form-counters position-relative">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        data-bs-offset="0,22"
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">Guest</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <span className="js-count-adult">{guestCounts.Adults}</span> adults -{" "}
          <span className="js-count-child">{guestCounts.Children}</span>{" "}
          children - <span className="js-count-room">{guestCounts.Rooms}</span>{" "}
          room
        </div>
      </div>

      <div className="shadow-2 dropdown-menu min-width-400">
        <div className="bg-white px-30 py-30 rounded-4 counter-box">
          {counters.map((counter) => (
            <Counter
              key={counter.name}
              name={counter.name}
              defaultValue={counter.defaultValue}
              onCounterChange={handleCounterChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Hero Component
const HeroSection = () => {
  const { tabs, currentTab } = useSelector((state) => state.hero) || {};
  const dispatch = useDispatch();
  const Router = useRouter();

  const counters = [
    { name: "Adults", defaultValue: 2 },
    { name: "Children", defaultValue: 1 },
    { name: "Rooms", defaultValue: 1 },
  ];

  // State for location search
  const [flyingFromSearchValue, setFlyingFromSearchValue] = useState("");
  const [flyingFromSelectedItem, setFlyingFromSelectedItem] = useState(null);
  const [flyingToSearchValue, setFlyingToSearchValue] = useState("");
  const [flyingToSelectedItem, setFlyingToSelectedItem] = useState(null);

  // State for filter selects
  const [returnValue, setReturnValue] = useState("Return");
  const [economyValue, setEconomyValue] = useState("Economy");
  const [bagsValue, setBagsValue] = useState("0 Bags");

  // State for guest search
  const [guestCounts, setGuestCounts] = useState({
    Adults: 2,
    Children: 1,
    Rooms: 1,
  });

  const locationSearchContent = [
    { id: 1, name: "London", address: "Greater London, United Kingdom" },
    { id: 2, name: "New York", address: "New York State, United States" },
    { id: 3, name: "Paris", address: "France" },
    { id: 4, name: "Madrid", address: "Spain" },
    { id: 5, name: "Santorini", address: "Greece" },
  ];

  const handleLocationOptionClick = (setter, itemSetter) => (item) => {
    setter(item.name);
    itemSetter(item);
  };

  const handleCounterChange = (name, value) => {
    setGuestCounts((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <section className="masthead -type-1 z-5">
      <div className="masthead__bg">
        <img alt="image" src="/img/landingpage/hero.png" className="js-lazy" />
      </div>
      <div className="container">
        <div className="row justify-center">
          <div className="col-auto">
            <div className="text-center" style={{ marginTop: "-100px" }}>
              <h1
                className="text-60 lg:text-40 md:text-30 text-black"
                data-aos="fade-up"
              >
                Travel to your Dream Destination!
              </h1>
              <p
                className="text-black mt-6 md:mt-10"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Flight booking made faster and efficient
              </p>
            </div>

            {/* Icon row section */}
            <IconRow />

            <div
              className="tabs -underline mt-60 js-tabs"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="mainSearch -col-4 -w-1070 bg-white shadow-1 rounded-4 pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 mt-15">
                <div className="button-grid items-center">
                  {/* Flying From Location */}
                  <div className="searchMenu-loc px-24 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
                    <div
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="true"
                      data-bs-offset="0,22"
                    >
                      <h4 className="text-15 fw-500 ls-2 lh-16">Flying From</h4>
                      <div className="text-15 text-light-1 ls-2 lh-16">
                        <input
                          autoComplete="off"
                          type="search"
                          placeholder="Where are you going?"
                          className="js-search js-dd-focus"
                          value={flyingFromSearchValue}
                          onChange={(e) =>
                            setFlyingFromSearchValue(e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="shadow-2 dropdown-menu min-width-400">
                      <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
                        <ul className="y-gap-5 js-results">
                          {locationSearchContent.map((item) => (
                            <li
                              className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                                flyingFromSelectedItem &&
                                flyingFromSelectedItem.id === item.id
                                  ? "active"
                                  : ""
                              }`}
                              key={item.id}
                              role="button"
                              onClick={() =>
                                handleLocationOptionClick(
                                  setFlyingFromSearchValue,
                                  setFlyingFromSelectedItem
                                )(item)
                              }
                            >
                              <div className="d-flex">
                                <div className="icon-location-2 text-light-1 text-20 pt-4" />
                                <div className="ml-10">
                                  <div className="text-15 lh-12 fw-500 js-search-option-target">
                                    {item.name}
                                  </div>
                                  <div className="text-14 lh-12 text-light-1 mt-5">
                                    {item.address}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Flying To Location */}
                  <div className="searchMenu-loc px-24 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
                    <div
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="true"
                      data-bs-offset="0,22"
                    >
                      <h4 className="text-15 fw-500 ls-2 lh-16">Flying To</h4>
                      <div className="text-15 text-light-1 ls-2 lh-16">
                        <input
                          autoComplete="off"
                          type="search"
                          placeholder="Where are you going?"
                          className="js-search js-dd-focus"
                          value={flyingToSearchValue}
                          onChange={(e) =>
                            setFlyingToSearchValue(e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="shadow-2 dropdown-menu min-width-400">
                      <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
                        <ul className="y-gap-5 js-results">
                          {locationSearchContent.map((item) => (
                            <li
                              className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                                flyingToSelectedItem &&
                                flyingToSelectedItem.id === item.id
                                  ? "active"
                                  : ""
                              }`}
                              key={item.id}
                              role="button"
                              onClick={() =>
                                handleLocationOptionClick(
                                  setFlyingToSearchValue,
                                  setFlyingToSelectedItem
                                )(item)
                              }
                            >
                              <div className="d-flex">
                                <div className="icon-location-2 text-light-1 text-20 pt-4" />
                                <div className="ml-10">
                                  <div className="text-15 lh-12 fw-500 js-search-option-target">
                                    {item.name}
                                  </div>
                                  <div className="text-14 lh-12 text-light-1 mt-5">
                                    {item.address}
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Depart Date */}
                  <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
                    <div>
                      <h4 className="text-15 fw-500 ls-2 lh-16">Depart</h4>
                      <input type="date" className="form-control" />
                    </div>
                  </div>

                  {/* Return Date */}
                  <div className="searchMenu-date px-30 lg:py-20 lg:px-0 js-form-dd js-calendar">
                    <div>
                      <h4 className="text-15 fw-500 ls-2 lh-16">Return</h4>
                      <input type="date" className="form-control" />
                    </div>
                  </div>

                  {/* Guest Search */}
                  <div className="searchMenu-guests px-24 lg:py-20 lg:px-0 js-form-dd js-form-counters">
                    <div
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      aria-expanded="false"
                      data-bs-offset="0,22"
                    >
                      <h4 className="text-15 fw-500 ls-2 lh-16">Travellers</h4>
                      <div className="text-15 text-light-1 ls-2 lh-16">
                        <span className="js-count-adult">
                          {guestCounts.Adults}
                        </span>{" "}
                        adults -{" "}
                        <span className="js-count-child">
                          {guestCounts.Children}
                        </span>{" "}
                        children -{" "}
                        <span className="js-count-room">
                          {guestCounts.Rooms}
                        </span>{" "}
                        room
                      </div>
                    </div>

                    <div className="shadow-2 dropdown-menu min-width-400">
                      <div className="bg-white px-30 py-30 rounded-4 counter-box">
                        {counters.map((counter) => (
                          <Counter
                            key={counter.name}
                            name={counter.name}
                            defaultValue={counter.defaultValue}
                            onCounterChange={handleCounterChange}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="button-item">
                    <button
                      className="mainSearch__submit button -blue-1 py-15 px-35 h-60 col-12 rounded-4 bg-dark-1 text-white"
                      onClick={() => Router.push("/flight-list-v1")}
                    >
                      <i className="icon-search text-20 mr-10" />
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
