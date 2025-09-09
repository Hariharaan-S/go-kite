const Faq = () => {
  const faqContent = [
    {
      id: 1,
      collapseTarget: "One",
      title: "Common Reasons for UK Visa Rejection and How to Avoid Them",
      content: `At the meeting point that has been determined, the participants who have gathered will prepare to leave Malang to go to Bromo using a
Jeep including a driver and guide who will accompany them in exploring, guiding and documenting moments in Bromo.`,
    },
    {
      id: 2,
      collapseTarget: "Two",
      title: "Why Choose to Go Kite Tours for Your UK Visa Application?",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco.`,
    },
    {
      id: 3,
      collapseTarget: "Three",
      title: " UK Family Visa",
      content: `This visa category enables Indian citizens to join eligible family members already living in the UK, such as a spouse, civil partner, fiancé, child, or, in certain exceptional circumstances, an adult-dependent relative. It facilitates family reunification and establishes a shared life in the UK.

Duration: The initial partner visa is typically granted for 2 years and 9 months. An extension is usually required for another 2 years and 9 months. Once you have finished 5 years on this route, you may be permitted to apply for Indefinite Leave to Remain (ILR). Some family routes are shorter, and some are longer.

Requirement: You must have an Indian passport, strong evidence of a real and continuing family relationship with your UK-based family member (for example, marriage certificates, proof of sharing funds and evidence of living together), meet certain financial standards (the UK family member needs to prove their income or savings) and show English language skills (normally CEFR A1 level for the first application). Requirements differ depending on the kind of family relationship.`,
    },
    {
      id: 4,
      collapseTarget: "Four",
      title: "Essential UK Visa Requirements from India",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco.`,
    }
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

export default Faq;
