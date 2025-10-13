"use client";
import React from "react";
import "./styles/sidebar.styles.css";
import PirceSlider from "./sidebar/PirceSlider";

const Sidebar = () => {
  const [destination, setDestination] = React.useState("");
  const [activity, setActivity] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState("");
  const [guests, setGuests] = React.useState(2);

  const incrementGuests = () => setGuests((g) => g + 1);
  const decrementGuests = () => setGuests((g) => (g > 1 ? g - 1 : 1));

  return (
    <div className="filter-card">
      <div className="sidebar__item -no-border">
        <div className="filter-section-title">
          <i className="icon-up-down mr-10" />
          <span>Search By Filter</span>
        </div>
        <div className="filter-divider" />

        <div className="y-gap-14">
          <div className="tile">
            <div className="tile-icon-left"><i className="icon-destination" /></div>
            <div className="tile-body">
              <div className="tile-label">Destination</div>
              <input
                className="tile-input"
                placeholder="Goa"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="tile">
            <div className="tile-body">
              <div className="tile-label">Desert Safari</div>
              <select
                className="tile-input select"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option value="">Activity Type</option>
                <option value="sightseeing">Sightseeing</option>
                <option value="adventure">Adventure</option>
                <option value="beach">Beach</option>
              </select>
            </div>
            <div className="tile-icon-right"><i className="icon-chevron-down" /></div>
          </div>

          <div className="tile">
            <div className="tile-icon-left"><i className="icon-calendar" /></div>
            <div className="tile-body">
              <div className="tile-label">Date From</div>
              <input
                type="date"
                className="tile-input"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
          </div>

          <div className="tile">
            <div className="tile-icon-left"><i className="icon-user" /></div>
            <div className="tile-body">
              <div className="tile-label">Guests</div>
              <div className="guests-counter">
                <span className="guests-count">{guests.toString().padStart(2, '0')}</span>
              </div>
            </div>
            <div className="tile-icon-right">
              <button type="button" className="icon-btn" onClick={decrementGuests}><i className="icon-minus" /></button>
              <button type="button" className="icon-btn" onClick={incrementGuests}><i className="icon-plus" /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar__item">
        <div className="filter-section-title">
          <span className="mr-10">$</span>
          <span>Filter By Price</span>
        </div>
        <div className="filter-divider" />
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
            <PirceSlider />
          </div>
        </div>
        <div className="d-flex justify-between mt-10">
          <div className="text-14 text-light-1">Price: $10 – 3,00</div>
          <button className="button -blue-1 h-36 px-20 rounded-100">Apply</button>
        </div>
      </div>

      <div className="sidebar__item">
        <div className="filter-section-title">
          <i className="icon-star mr-10" />
          <span>Traveler Rating</span>
        </div>
        <div className="filter-divider" />
        <div className="row x-gap-10 y-gap-10">
          {[1,2,3,4,5].map((n) => (
            <div className="col-auto" key={n}>
              <button className={`rating-pill ${n===2 ? 'active' : ''}`}>
                <span className="num">{n}</span>
                <i className="icon-star ml-6" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar__item">
        <div className="filter-section-title"><span>Travello</span></div>
        <div className="filter-divider" />
        <div className="sidebar-checkbox">
          <div className="row y-gap-10 items-center">
            <div className="col-12">
              <div className="form-checkbox d-flex items-center">
                <input type="checkbox" />
                <div className="form-checkbox__mark"><div className="form-checkbox__icon icon-check" /></div>
                <div className="text-15 ml-10">Pickup Available</div>
              </div>
            </div>
            <div className="col-12">
              <div className="form-checkbox d-flex items-center">
                <input type="checkbox" />
                <div className="form-checkbox__mark"><div className="form-checkbox__icon icon-check" /></div>
                <div className="text-15 ml-10">No Pickup needed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
