const { default: RecommendationDestinations2 } = require("./recommendation-dest-2")
const { default: RecommendationDestinations3 } = require("./recommendation-dest-3")
import './recommendation-section-2.styles.css'
const RecommendationSection2 = () => {

    return (
        <>
            <div className="recom-sec-2">
                <RecommendationDestinations2 />
                <RecommendationDestinations3 />
            </div>

        </>

    )
}

export default RecommendationSection2;