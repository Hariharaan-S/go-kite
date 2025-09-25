import HotelSearch from "../hotel-search/hotel-search";
import "../styles/holidays-hero.css";

const HolidaysHero = () => {
    return (
        <>
            <div className="hero">
                <h1>A Lifetime Memory of Holidays</h1>
                <p className="hero-subtopic">Plan your holiday with our Tailored Packages for your Solo Trip, Honeymoon, Family Trip, Corporate Workstation</p>

                <HotelSearch />

                <p className="book-agent">Book a Meeting with our Travel Agent <img src="img/holidays/arrow.svg" width="20px" height="20px" /></p> {/* With an arrow at the end*/}
            </div>
        </>

    )
}

export default HolidaysHero;