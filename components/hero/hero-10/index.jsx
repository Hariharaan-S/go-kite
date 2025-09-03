"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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

const Index = () => {
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

  const dropdownOptions = [
    {
      title: "Return",
      value: returnValue,
      list: [
        { label: "Animation" },
        { label: "Design" },
        { label: "Illustration" },
        { label: "Lifestyle" },
        { label: "Business" },
      ],
      onChange: setReturnValue,
    },
    {
      title: "Economy",
      value: economyValue,
      list: [{ label: "Economy" }, { label: "Middle" }, { label: "Business" }],
      onChange: setEconomyValue,
    },
    {
      title: "Bags",
      value: bagsValue,
      list: [
        { label: "0 Bags" },
        { label: "1 Bag" },
        { label: "2 Bags" },
        { label: "3 Bags" },
        { label: "4 Bags" },
      ],
      onChange: setBagsValue,
    },
  ];

  return (
    <section className="masthead -type-10">
      <div className="container-1500">
        <div className="row">
          <div className="col-lg-auto">
            <div className="masthead__content">
              <h1
                className="text-60 lg:text-40 sm:text-30"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Where do You Want To Fly
              </h1>
              <p className="mt-5" data-aos="fade-up" data-aos-delay="200">
                Discover amazing places at exclusive deals
              </p>
              <div data-aos="fade-up" data-aos-delay="300">
                <div className="row y-gap-20 items-center pt-30">
                  {dropdownOptions.map((option, index) => (
                    <div className="col-auto" key={index}>
                      <div className="dropdown js-dropdown">
                        <div
                          className="dropdown__button d-flex items-center text-15"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="true"
                          data-bs-offset="0,0"
                        >
                          <span className="js-dropdown-title">
                            {option.value}
                          </span>
                          <i className="icon icon-chevron-sm-down text-7 ml-10" />
                        </div>
                        <div className="toggle-element -dropdown js-click-dropdown dropdown-menu">
                          <div className="text-14 y-gap-15 js-dropdown-list">
                            {option.list.map((item, itemIndex) => (
                              <div key={itemIndex}>
                                <div
                                  role="button"
                                  className={`${
                                    item.label === option.value
                                      ? "text-blue-1 "
                                      : ""
                                  }d-block js-dropdown-link`}
                                  onClick={() => option.onChange(item.label)}
                                >
                                  {item.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mainSearch -col-4 -w-1070 bg-white shadow-1 rounded-4 pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 mt-15">
                  <div className="button-grid items-center">
                    {/* Flying From Location */}
                    <div className="searchMenu-loc px-24 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
                      <div
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="true"
                        data-bs-offset="0,22"
                      >
                        <h4 className="text-15 fw-500 ls-2 lh-16">
                          Flying From
                        </h4>
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
                        <h4 className="text-15 fw-500 ls-2 lh-16">
                          Travellers
                        </h4>
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

        <div
          className="masthead__image"
          data-aos="fade-left"
          data-aos-delay="500"
        >
          <div className="row y-gap-30 flex-nowrap">
            <div className="col-auto">
              <img
                src="/img/masthead/10/1.png"
                alt="image"
                className="rounded-16"
              />
            </div>
            <div className="col-auto">
              <img
                src="/img/masthead/10/2.png"
                alt="image"
                className="rounded-16"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
