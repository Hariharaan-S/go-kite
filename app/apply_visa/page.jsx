import Navbar from "@/components/header/NewNav";
import Banner from "@/components/applyvisa/banner"
import VisaTypesComponent from "@/components/applyvisa/visa-enquiry"
import VisaStepsAndFaq from "@/components/applyvisa/steps"
const Holidays = () => {
    return (
        <>
            <Navbar />
            <Banner/>
            <VisaTypesComponent/>
           <VisaStepsAndFaq/>
        </>

    )
}

export default Holidays;