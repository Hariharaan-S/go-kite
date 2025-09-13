import Header1 from "@/components/header/IconNav";
import HolidaysHero from "@/components/holidayspage/hero";
import RecommendationSection from "@/components/holidayspage/recommendation-section/recommendation";
import RecommendationSection2 from "@/components/holidayspage/recommendation-section/recommendation-section-2";
import Footer from "@/components/footer/footer-gokite"

export const metadata = {
    title: "GoKite - Travel & Tour ",
    description: "GoKite - Travel & Tour ",
};

const Holidays = () => {
    return (
        <>
            <Header1 />
            <HolidaysHero />
            <RecommendationSection />
            <RecommendationSection2 />
            <Footer/>
        </>

    )
}

export default Holidays;