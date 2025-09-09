import '../styles/itinerary.css'

const index = () => {
  return (
    <div>
      <div>
        <div className="relative">
          <div className="accordion -map row y-gap-20" id="itineraryContent">
            <div className="iti-wrapper">
              <div className="iti-track">
                <img src="img/trip-package/dot.png" width='20px' height='20px' alt="" srcset="" />
                <div className="line"></div>
                <img src="img/trip-package/dot.png" width='20px' height='20px' alt="" srcset="" />
                <div className="line"></div>
                <img src="img/trip-package/dot.png" width='20px' height='20px' alt="" srcset="" />
              </div>
              <div className="iti-places">
                <div className="iti-place">
                  <p>Day 1 Malang ( 06.00 wIB ) - Explore Bromo 7 Spot</p>
                  <img src="img/trip-package/down-arrow.png" width='30px' height='10px' alt="" />
                </div>
                <div className="iti-place">
                  <p>Day 1 Malang ( 11.00 wIB ) - Back to Rest Area</p>
                  <img src="img/trip-package/down-arrow.png" width='30px' height='10px' alt="" />
                </div>
                <div className="iti-place">
                  <p>Day 1 Malang ( 14.00 wIB ) - Drop point to Malang city</p>
                  <img src="img/trip-package/down-arrow.png" width='30px' height='10px' alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End col-lg-8 */}
    </div>
  );
};

export default index;
