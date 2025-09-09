import '../styles/accordion.css'

const IncludedAccordion = () => {
    const faqContent = [
        {
            id: 1,
            collapseTarget: "One",
            title: "Transport",
            content: `At the meeting point that has been determined, the participants who have gathered will prepare to leave Malang to go to Bromo using a
Jeep including a driver and guide who will accompany them in exploring, guiding and documenting moments in Bromo.`,
        },
        {
            id: 2,
            collapseTarget: "Two",
            title: "Guide",
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco.`,
        },
        {
            id: 3,
            collapseTarget: "Three",
            title: "Accommodation",
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco.`,
        },
        {
            id: 4,
            collapseTarget: "Four",
            title: "Documentation",
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco.`,
        },
        {
            id: 5,
            collapseTarget: "Five",
            title: "Ticketing",
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco.`,
        },
    ];
    return (
        <>
            {faqContent.map((item) => (
                <div className="col-12" key={item.id}>
                    <div className="accordion__item px-20 py-20 rounded-4 accordion-box">
                        <div
                            className="accordion__button d-flex items-center accordion-sub-box"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${item.collapseTarget}`}
                        >
                            <div className="accordion__icon size-40 flex-center bg-light-2 rounded-full mr-20">
                                <img src="img/trip-package/tick.png" alt="" />
                            </div>
                            <div className="button text-dark-1 text-start">{item.title}</div>
                            <div className="down-arrow-div ms-auto">
                                <img src="img/trip-package/down-arrow.png" width='30px' height='10px' alt="" />
                            </div>
                        </div>
                        {/* End accordion button */}

                        <div
                            className="accordion-collapse collapse"
                            id={item.collapseTarget}
                            data-bs-parent="#Faq1"
                        >
                            <div className="pt-15 pl-60">
                                <p className="text-15">{item.content}</p>
                            </div>
                        </div>
                        {/* End accordion conent */}
                    </div>
                </div>
            ))}
        </>
    );
};

export default IncludedAccordion;
