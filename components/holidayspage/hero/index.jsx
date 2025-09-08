import HotelSearch from "../hotel-search/hotel-search";
import HolidayHeroBG from "./holiday-hero-background";

const holidayHeroStyles = `
    .hero {
        height: 90%;
        width: 100%;
        position: relative;
        margin-top: 91px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 8rem;
    }
    .hero h1 {
        font-weight: 700;
        font-size: 61px;
        line-height: 2;
        color: #FFFFFF;
    }

    .hero p {
        font-weight: 400;
        font-size: 22px;
        line-height: 2;
        color: #FFFFFF;
    }

    .book-agent {
        position: realtive;
        margin-top: 1rem;
        font-size: 1.7rem !important;
        cursor: pointer;
    }

    @media screen and (max-width: 400px) {
        .hero h1, .hero .hero-subtopic {
            display: none;
        }

        .book-agent {
            margin-top: 2rem;
            font-size: 1.2rem !important;
        }
    }
`

const HolidaysHero = () => {
    return (
        <>
            <style>{holidayHeroStyles}</style>
            <HolidayHeroBG />
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