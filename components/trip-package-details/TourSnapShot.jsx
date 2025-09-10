import './styles/tour-snapshot.css'

const TourSnapShot = () => {
  return (
    <div className="row y-gap-10  tour-snapshot-section">
      <div className="snapshot-part-1">
        <div className="col-md-auto snapshot-part">
          <div className="d-flex trip-nav-btn trip-nav-active">
            <div className="text-18 lh-15 trip-nav-head">
              Overview
            </div>
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-auto snapshot-part">
          <div className="d-flex trip-nav-btn">
            <div className="text-18 lh-15 trip-nav-head">
              Itinerary
            </div>
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-auto snapshot-part">
          <div className="d-flex trip-nav-btn">

            <div className="text-18 lh-15 trip-nav-head">
              What's Included
            </div>
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-auto snapshot-part">
          <div className="d-flex trip-nav-btn">
            <div className="text-18 lh-15 trip-nav-head">
              FAQs
            </div>
          </div>
        </div>
      </div>
      <div className="snapshot-part-2">
        <div className="brochure-download">
          <p>Plan your adventure</p>
          <p className='dowload'>Download PDF Brochure</p>
        </div>
      </div>
      {/* End .col */}

    </div>
  );
};

export default TourSnapShot;
