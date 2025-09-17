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
    gap: 24rem;
    align-items: center;
  }


  .search-hotel .hotel-search-box {
    border: 0.5px solid #EAEBEE;
    border-radius: 10px;
    width: 100%;
    max-width: 50%;
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

    .search-hotel .hotel-search-box {
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

    .search-hotel .hotel-search-box {
      max-width: 60%;
    }

    .search-info {
      top: 4.7rem;
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

    .search-hotel .hotel-search-box {
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

    .search-hotel .hotel-search-box {
      max-width: 100%;
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

    .search-hotel .hotel-search-box {
      max-width: 100%;
      padding-top: 3rem;
    }

    .search-info {
      display: block !important;
      font-size: 0.9rem !important;
      bottom: 9.8rem;
      left: 2rem;
    }
`;

const HotelSearch = () => (
  <>
    <style>{styles}</style>
    <div className="book-holiday">
      <h2>Book Holiday</h2>
      <div className="search-hotel">
        <p className="search-info">Where are you going for holiday?</p>
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
          Search Plan
        </button>
      </div>
    </div>
  </>
);

export default HotelSearch;
