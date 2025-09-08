const { default: RecommendationDestinations2 } = require("./recommendation-dest-2")
const { default: RecommendationDestinations3 } = require("./recommendation-dest-3")

const RecommendationSection2 = () => {

    return (
        <>
            <RecommendationDestinations2 />
            <RecommendationDestinations3 />
        </>

    )
}

export default RecommendationSection2;