import './styles/overview.css'

const Overview = () => {
  return (
    <>
      <div className="row x-gap-40 y-gap-40 overview-section">
        <div className="col-12 overview-section-part-1">
          <h3 className="text-40 fw-500">Bromo Mountain</h3>

          <p className="text-dark-1 text-15 mt-20 lh-1.2 overview-para">
            Bromo Mountain (Gunung Bromo) is an iconic active volcano located in East Java,Indonesia, within the Bromo Tengger Semeru National Park.
            It stands about 2,329meters (7,641 feet) above sea level and features a dramatic landscape, including a smoking crater and a vast "sea of sand" around it.
            Known for its frequent volcanicactivity, Bromo offers spectacular sunrise views, with popular activities including sunrise tours, horseback riding, and hiking to the crater.
          </p>

          <a
            href="#"
            className="d-block text-14 text-blue-1 fw-500 underline mt-10"
          >
            Read More
          </a>
        </div>
      </div>

      <div className="place-to-visit">
        <h2>Places You'll See</h2>
        <div className="arrow-div">
          <div className="prev-btn">
            <img src="img/trip-package/prev-btn.png" alt="" srcset="" width='50px' height='50px' />
          </div>
          <div className="next-btn">
            <img src="img/trip-package/next-btn.png" alt="" width='50px' height='50px' />
          </div>
        </div>
        <div className="place-to-visit-wrapper">
          <div className="place">
            <img src="img/trip-package/place1.png" alt="" />
            <p>Batok Mountain</p>
          </div>
          <div className="place">
            <img src="img/trip-package/place1.png" alt="" />
            <p>Batok Mountain</p>
          </div>
          <div className="place">
            <img src="img/trip-package/place1.png" alt="" />
            <p>Batok Mountain</p>
          </div>
          <div className="place">
            <img src="img/trip-package/place1.png" alt="" />
            <p>Batok Mountain</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
