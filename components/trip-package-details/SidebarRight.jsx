import './styles/side-bar-right.css'
const SidebarRight = ({ tour }) => {
  return (
    <div className="d-flex justify-end js-pin-content sidebar-right-section">
      <div className="w-360 lg:w-full d-flex flex-column items-center">
        <div className="px-30 py-30 rounded-4 border-light bg-white shadow-4">
          <h2 className="sidebar-heading">Bromo Mountain</h2>

          {/* <div className="row y-gap-20 pt-30">
            <FilterBox />
          </div> */}
          <div className="trip-place">
            <div className="trip-place-details">
              <div className="trip-icon">
                <img src="img/trip-package/trip-icon.png" width='20px' height='20px' alt="" />
              </div>
              <p className="trip-place-name">Dubai, Desert</p>
            </div>
            <div className="timings">
              <div className="trip-clock-icon">
                <img src="img/trip-package/clock.jpg" width='20px' height='20px' alt="" />
              </div>
              <p>1 Days - 2 Night</p>
            </div>
          </div>

          <div className="trip-price">
            <p><span>$ 290/</span>person</p>
          </div>

          <button type="submit" className="enquire-btn">Enquire</button>
          {/* End div */}


        </div>
        {/* End px-30 */}

        <div className="px-30 fillDiv">
          <div className="text-14 text-light-1 mt-30">

          </div>
        </div>
        {/* End div */}
      </div>
    </div>
  );
};

export default SidebarRight;
