
const HolidayHeroBGStyles = `
        .recom-bg-div {
            height: 65%;
            width: 100%;
            position: absolute;
            background: url("img/holidays/recom-sect.jpg") center/cover no-repeat;
        }
`

const RecommendationHeroBG = () => {
    return (
        <>
            <style>{HolidayHeroBGStyles}</style>
            <div className="recom-bg-div">
            </div>
        </>

    )
}


export default RecommendationHeroBG;