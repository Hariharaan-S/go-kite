import Header1 from "@/components/header/IconNav";
import HolidaysHero from "@/components/holidayspage/hero";
import HolidaysSection1 from "@/components/holidayspage/holidays-section/HolidaysSection1";
import HolidaysSectionCards from "@/components/holidayspage/holidays-section/holidays-section-cards";
import Footer from "@/components/footer/footer-gokite"
import HoneymoonFreebiesCards from "@/components/holidayspage/holidays-section/honeymoon-freebies-cards";


export const metadata = {
    title: "GoKite - Travel & Tour ",
    description: "GoKite - Travel & Tour ",
};

const Holidays = () => {
    return (
        <>
            <Header1 />
            <HolidaysHero />
            <HolidaysSection1 />
            <HolidaysSectionCards />
            <HoneymoonFreebiesCards />
            <Footer />
        </>

    )
}

export default Holidays;