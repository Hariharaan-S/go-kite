const HolidayHeroBGStyles = `
        .bg-div {
            height: 90%;
            width: 100%;
            position: absolute;
            margin-top: 91px; 
            background-image: url("img/holidays/holidayHeroBG.jpg");
            background-size: 100% auto; 
            background-position: top center;  
            background-repeat: no-repeat;
        }
`

const HolidayHeroBG = () => {
    return (
        <>
            <style>{HolidayHeroBGStyles}</style>
            <div className="bg-div">
            </div>
        </>

    )
}


export default HolidayHeroBG;