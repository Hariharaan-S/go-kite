"use client";
import Header1 from "@/components/header/IconNav";
import HolidaysHero from "@/components/holidayspage/hero";
import HolidaysSection1 from "@/components/holidayspage/holidays-section/HolidaysSection1";
import GlassmorphMenu from "@/components/holidayspage/holidays-section/menu/menu";
import Footer from "@/components/footer/footer-gokite"
import HoneymoonFreebiesCards from "@/components/holidayspage/holidays-section/honeymoon-freebies-cards";
import { usePageContext } from "@/components/common/PageContext";


// export const metadata = {
//     title: "GoKite - Travel & Tour ",
//     description: "GoKite - Travel & Tour ",
// };

const Holidays = () => {
    const { loading } = usePageContext();
    if (loading) {
        return (
            <>
                <Header1 />
                <div style={{ padding: "60px 0", textAlign: "center" }}>Loading...</div>
                <Footer />
            </>
        )
    }
    return (
        <>
            <Header1 />
            <HolidaysHero />
            <HolidaysSection1 />
            <GlassmorphMenu />
            <HoneymoonFreebiesCards />
            <Footer />
        </>

    )
}

export default Holidays;