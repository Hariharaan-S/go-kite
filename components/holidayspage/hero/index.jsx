import HotelSearch from "../hotel-search/hotel-search";

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
        padding-bottom: 2rem;
        background-image: url("img/holidays/holidayHeroBG.jpg");
        background-size: 100% auto; 
        background-position: top center;  
        background-repeat: no-repeat;
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
        position: relative;
        margin-top: 1rem;
        font-size: 1.7rem !important;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    /* 1440px */
    @media screen and (max-width: 1440px) {
        .hero {
            padding-top: 6rem;
        }
        .hero h1 {
            font-size: 48px;
            line-height: 1.5;
        }
        .hero p {
            font-size: 20px;
            line-height: 1.7;
        }
        .book-agent {
            font-size: 1.4rem !important;
        }
    }

    /* 1280px */
    @media screen and (max-width: 1280px) {
        .hero {
            padding-top: 4rem;
        }
        .hero h1 {
            font-size: 38px;
            line-height: 1.3;
        }
        .hero p {
            font-size: 18px;
            line-height: 1.5;
        }
        .book-agent {
            font-size: 1.2rem !important;
        }
    }

    /* 1024px */
    @media screen and (max-width: 1024px) {
        .hero {
            padding-top: 2rem;
            padding-bottom: 2rem;
        }
        .hero h1 {
            font-size: 28px;
        }
        .hero p {
            font-size: 16px;
        }
        .book-agent {
            font-size: 1rem !important;
        }
    }

    /* 768px */
    @media screen and (max-width: 768px) {
        .hero {
            margin-top: 5.8rem;
            padding: 1rem;
        }
        .hero h1 {
            font-size: 2rem !important;
        }

        .hero p {
            display: none;
        }
        .book-agent {
            display: block !important;
            margin-top: 1.5rem;
            font-size: 0.95rem !important;
        }
    }

    /* 480px */
    @media screen and (max-width: 400px) {
        .hero {
            margin-top: 5.5rem;
            padding-top: 0.5rem;
        }
        .hero h1, .hero .hero-subtopic {
            display: none;
        }
        .book-agent {
            margin-top: 2rem;
            font-size: 0.85rem !important;
        }
    }
`

const HolidaysHero = () => {
    return (
        <>
            <style>{holidayHeroStyles}</style>
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