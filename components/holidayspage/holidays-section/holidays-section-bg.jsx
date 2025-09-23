
const HolidayHeroBGStyles = `
        .recom-bg-div {
            height: 65%;
            width: 100%;
            position: relative;
            background: url("img/holidays/recom-sect.jpg") center/cover no-repeat;
        }

        @media screen  and (max-width: 1500px) {
            .recom-bg-div {
                top: 7rem;
                height: 60%;
            }
        }

        @media screen and (max-width: 400px) {
            .recom-bg-div {
                top: 2rem;
            }
        }
`

const HolidaysHeroBG = () => {
    return (
        <>
            <style>{HolidayHeroBGStyles}</style>
            <div className="recom-bg-div">
            </div>
        </>

    )
}


export default HolidaysHeroBG;