const styles = `
  .book-holiday {
    position: relative;
    background: #FFFFFF;
    width: 100%;
    max-width: 70vw;
    min-height: 180px;
    padding: 2rem 1rem;
    border-radius: 10px;
    margin-top: 1.25rem;
    box-shadow: 0 2px 14px 0 rgba(40,80,120,.07);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .book-holiday h2 {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    position: static;
    left: auto; top: auto;
  }

  .book-holiday .search-hotel {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 0.8rem;
    align-items: center;
  }

  .search-hotel .hotel-search-box {
    border: 0.5px solid #EAEBEE;
    border-radius: 25px;
    padding: 0.6rem 0.7rem 0.6rem 2.7rem;
    width: 100%;
    font-size: 1rem;
    height: 2.5rem;
    box-sizing: border-box;
  }

  .hotel-search-box::placeholder {
    color: #acb3be;
    font-size: 1rem;
    opacity: 0.8;
  }

  .search-hotel .hotel-search-box-submit {
    width: 22%;
    min-width: 76px;
    background: #000000;
    color: #FFFFFF;
    border-radius: 10px;
    font-size: 1.08rem;
    padding: 0.5rem 0;
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

  /* Place Google review icon and rating at the container bottom right */
  .google-review-container {
    position: absolute;
    bottom: 1rem;
    right: 1.7rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .google-review-icon {
    width: 86px;
    height: 48px;
    margin: 0;
  }

  .rating {
    color: #000000 !important;
    font-size: 0.95rem !important;
    font-weight: 500;
    margin-left: 0.1rem;
  }

  .search-info {
    color: #071516 !important;
    font-size: 1.01rem !important;
    opacity: 0.45;
    margin: 0.6rem 0 0 0.5rem;
    position: static;
  }

  @media (max-width: 600px) {
    .book-holiday {
      max-width: 99%;
      padding: 1.4rem 0.5rem;
    }
    .book-holiday .search-hotel {
      flex-direction: column;
      gap: 0.7rem;
    }
    .search-hotel .hotel-search-box-submit {
      width: 100%;
      margin: 0 auto;
    }
    .google-review-container {
      display: none; /* Hide on small screens */
    }

  }

  @media (max-width: 400px) {
    .book-holiday {
      min-height: 120px;
      padding: 1rem 0.25rem;
      margin-top: -1rem;
    }
    .book-holiday h2 {
      font-size: 1.05rem;
    }
  }
`;

const HotelSearch = () => (
  <>
    <style>{styles}</style>
    <div className="book-holiday">
      <h2>Book Holiday</h2>
      <div className="search-hotel">
        <input
          className="hotel-search-box"
          type="search"
          placeholder="Select Destination/Hotel"
        />
        <button className="hotel-search-box-submit" type="submit">
          <span>
            <img
              className="hotel-search-icon"
              src="img/holidays/search.svg"
              width="20px"
              height="20px"
              alt="Search Icon"
            />
          </span>
          Hotel
        </button>
      </div>
      <p className="search-info">Where are you staying?</p>

      <div className="google-review-container">
        <img
          className="google-review-icon"
          src="img/holidays/google review.png"
          alt="Google review"
          width="86px"
          height="48px"
        />
        <span className="rating">4.4</span>
      </div>
    </div>
  </>
);

export default HotelSearch;
