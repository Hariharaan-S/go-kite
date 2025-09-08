import HolidayDestinations from "@/components/landingpage/holiday-destintion";
import GlassmorphMenu from "./menu/menu";
import RecommendationHeroBG from "./recommendationbg";
import './recommendation.css'
import RecommendationDestinations from "./recommendation-slider";
import RecommendationDestinations2 from "./recommendation-dest-2";
import RecommendationDestinations3 from "./recommendation-dest-3";

const RecommendationSection = () => {

    return (
        <>
            <div className="recommendation-section">
                <RecommendationHeroBG />
                <div className="section-header">
                    <div className="section-header-part-1">
                        <div className="section-header-part-1-1"><h3>Trip Packages</h3></div>
                        <div className="section-header-part-1-2"><h2>Best Recommendation <br /> Destination For You</h2></div>
                    </div>
                    <div className="section-header-part-2"><p>Discover your next adventure with our curated list of the best recommendation trips tailored just for you! . whether you’re seeking relaxation, adventure or exploration, let us guide you to unforgettable destination that will create
                        lasting memories</p></div>
                </div>

                <GlassmorphMenu />
                <RecommendationDestinations />
            </div>
        </>

    )
}

export default RecommendationSection;