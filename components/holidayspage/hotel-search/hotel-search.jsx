
const styles = `

    .book-holiday {
        position: relative;
        background: #FFFFFF;
        width: 95%;
        height: 60%;
        padding: 5rem 1rem;
        border-radius: 10px;
        margin-top: 2rem;
    }

    .book-holiday h2 {
        position: absolute;
        top: .5rem;
        left: 2rem;
        font-size: 1.7rem;
    }

    .book-holiday .search-hotel {
        display:flex;
        flex-direction: row;
        width: 100%;
    }

    .search-hotel .hotel-search-box {
        border: 0.5px solid #EAEBEE;
        border-radius: 25px;
        position: relative;
        padding-left: 65px;
        padding-top: 15px;
        padding-bottom: 15px;
        padding-right: 15px;
        width: 100%;
        height: 14vh;
    }

    .search-hotel .hotel-search-box::placeholder {
        margin-left: 5rem;
    }

    .search-hotel .hotel-search-box-submit {
        position: relative;
        margin-left: 1rem;
        width: 20%;
        text-align: center;
        background: #000000;
        color: #FFFFFF;
        border-radius: 10px;
        font-size: 1.2rem;
    }

    .hotel-search-icon {
        margin-top: -5px;
        margin-right: 5px;
    }
    
    .google-review-icon {
        position: absolute;
        right: 2rem;
    }
    
    .rating {
        position: absolute;
        bottom: 1.2rem;
        right: 1.7rem;
        color: #000000 !important;
        font-size: .5rem !important;
    }

    .search-info {
        position: absolute;
        color: #071516 !important;
        font-size: 1rem !important;
        opacity: .2;
        top: 5.5rem;
        left: 5rem;
    }

    @media screen and (max-width: 400px) {
        .book-holiday {
            height: 40%;
            margin-top: -2rem;
        }
        .book-holiday .search-hotel {
            display:flex ;
            flex-direction: column ;
            row-gap: 1rem;
        }

        .search-hotel .hotel-search-box::placeholder {
            margin-left: 0rem !important;
        }

        .search-info {
            top: 5.3rem;
            left: 3rem;
        }

        .search-hotel .hotel-search-box-submit {
            margin: 0 auto;
            padding: 5px;
            width: 30%;    
        }

        .google-review-icon, .rating {
            display: none;
        }
    }
`


const HotelSearch = () => {
    return (
        <>
            <style>{styles}</style>
            <div className="book-holiday">
                <h2>Book Holiday</h2>
                <div className="search-hotel">
                    <input className="hotel-search-box" type="search" name="" id="" placeholder="Select Destination/Hotel" />
                    <button className="hotel-search-box-submit" type="submit"><span><img className="hotel-search-icon" src="img/holidays/search.svg" width="20px" height="20px" /></span>Hotel</button>

                </div>
                <p className="search-info">Where are you staying?</p>
                <img className="google-review-icon" src="img/holidays/google review.png" alt="Google Review Image" width="120px" height="80px" />
                <p className="rating">4.4</p>
            </div>
        </>

    )
}

export default HotelSearch;