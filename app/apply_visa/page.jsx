"use client"

import Navbar from "@/components/header/NewNav";
import Banner from "@/components/applyvisa/banner"
import VisaTypesComponent from "@/components/applyvisa/visa-enquiry"
import VisaStepsAndFaq from "@/components/applyvisa/steps"
import './styles/apply-visa.styles.css'
import { useEffect, useState } from "react";
import CustomHeader from "@/components/apply-visa-custom-header/custom-header";
const Holidays = () => {
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const mobileMediaQuery = window.matchMedia("(max-width: 400px)");

        const handleChange = (e) => {
            setIsMobileView(e.matches);
        };

        // Initial check
        setIsMobileView(mobileMediaQuery.matches);

        // Add listener
        mobileMediaQuery.addEventListener("change", handleChange);

        // Cleanup
        return () => {
            mobileMediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    return (
        <>
            <Navbar />
            {isMobileView && <CustomHeader />}
            <Banner />
            <VisaTypesComponent />
            <VisaStepsAndFaq />
        </>

    )
}

export default Holidays;